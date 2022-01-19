import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 20,
    activeOpacity: 1,
  },
  success: {
    borderColor: '#32CD32',
  },
  error: {
    borderColor: '#FF0000',
  },
  warning: {
    borderColor: '#FFA500',
  },
  info: {
    borderColor: '#7B68EE',
  },
})
