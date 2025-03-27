import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => [...oldData, newAnecdote])
      setNotification(`Added new anecdote: "${newAnecdote.content}"`, 'success')
    },
    onError: (error) => {
      setNotification(error.message, 'error')
    }
  })

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (content) {
      newAnecdoteMutation.mutate(content)
      event.target.anecdote.value = ''
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
