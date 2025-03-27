import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.payload
      )
    }
  }
})

// Async Thunk Actions
export const fetchAnecdotes = () => async (dispatch) => {
  const response = await axios.get(baseUrl)
  dispatch(setAnecdotes(response.data))
}

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  dispatch(appendAnecdote(response.data))
}

export const voteForAnecdote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  dispatch(voteAnecdote(updatedAnecdote))
}

export const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
