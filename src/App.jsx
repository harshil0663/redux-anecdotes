import React from 'react'
import { NotificationProvider } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <NotificationProvider>
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </NotificationProvider>
  )
}

export default App
