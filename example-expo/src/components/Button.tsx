import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface ButtonProps {
  variant: 'error' | 'success' | 'info' | 'warning' | 'primary'
  onPress: () => void
  title?: string
}

export const Button = (p: ButtonProps) => {
  return (
    <Text style={[s[p.variant], s.label]} onPress={p.onPress}>
      {p.title ?? `Emit ${p.variant}`}
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
    color: 'black',
    fontWeight: '600',
  },
  primary: {
    borderColor: 'black',
  },
  error: {
    borderColor: 'red',
  },
  warning: {
    borderColor: 'orange',
    color: 'orange',
  },
  info: {
    borderColor: 'blue',
  },
  success: {
    borderColor: 'green',
  },
})
