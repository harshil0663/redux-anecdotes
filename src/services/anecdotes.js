import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (content) => {
  if (content.length < 5) {
    throw new Error('Anecdote must be at least 5 characters long')
  }
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

export const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}
