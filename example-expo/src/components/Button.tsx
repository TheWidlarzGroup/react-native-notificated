import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface ButtonProps {
  variant: 'error' | 'success' | 'info' | 'warning' | 'primary'
  onPress: () => void
}

export const Button = (p: ButtonProps) => {
  return (
    <Text style={[s[p.variant], s.label]} onPress={p.onPress}>
      Emit {p.variant !== 'primary' && `${p.variant} `}notification
    </Text>
  )
}

const s = StyleSheet.create({
  label: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 6,
  },
  primary: {
    color: 'black',
    borderColor: 'black',
  },
  error: {
    borderColor: 'red',
    color: 'red',
  },
  warning: {
    borderColor: 'orange',
    color: 'orange',
  },
  info: {
    borderColor: 'blue',
    color: 'blue',
  },
  success: {
    borderColor: 'green',
    color: 'green',
  },
})
