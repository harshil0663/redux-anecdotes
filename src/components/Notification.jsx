import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: notification.type === 'error' ? '#ffb3b3' : '#ccffcc',
    color: notification.type === 'error' ? 'red' : 'green'
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
