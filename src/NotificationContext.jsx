import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, type: action.payload.type }
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const setNotification = (message, type = 'info', duration = 5) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, duration * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}
