import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from '../services/anecdotes'
import { useNotification } from '../NotificationContext'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const { data: anecdotes, error, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) =>
        oldData.map(anecdote =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      )
      setNotification(`You voted for "${updatedAnecdote.content}"`, 'success')
    }
  })

  if (isLoading) return <div>Loading anecdotes...</div>
  if (error) return <div>Anecdote service not available due to server issues.</div>

  const vote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
