---
sidebar_position: 2
---

# ✏️ Order of settings overwriting

In the React Native Notifications library, we can pass some settings on a different levels. <br/>
When we go deeper and the rage of the settings is narrower, the importance of the setting is higher. <br/>
For example, we can set the title `color` of the notification in the: <br/>

- global range (for all notifications)
- notification type range (for example for all errors)
- instance range (for the single notification)

Instance range overwrites notification type range and global range. Notification type range overwrites global range.<br/>

Let's consider the case where we set all the possible settings on all depth levels:


