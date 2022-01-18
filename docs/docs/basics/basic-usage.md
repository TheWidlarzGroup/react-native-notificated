---
sidebar_position: 1
---

# 🐣 Basic usage

### Create Notifications

```tsx
import { createNotifications } from 'react-native-notification'

const { NotificationsProvider, useNotifications, ...events } = createNotifications()
```

### 🛠 Add or Wrap your entry component with NotificationsProvider

```tsx
return (
  <>
    <App />
    <NotificationsProvider />
  </>
)
```

OR

```tsx
return (
  <NotificationsProvider>
    <App />
  </NotificationsProvider>
)
```

### 📢 Display notification

```tsx
const { notify } = useNotifications()

const notificationMetadata = notify('success', {
  title: 'Hello',
  description: 'Wow, that was easy',
})
```

### 🔨 Modify notification

```tsx
const { modify } = useNotifications()

modify({
  id: notificationMetadata.id,
  params: { title: 'New title', description: 'New description' },
})
```

### 🗑 Remove notification

```tsx
const { remove } = useNotifications()

remove(notificationMetadata.id)
```
