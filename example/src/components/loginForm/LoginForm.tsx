import React from 'react'
import {
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native'
import { fetchUsers, updateLogin, updatePassword } from '../../redux/reducers'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { styles } from './styles'

export const LoginForm = () => {
  const login = useAppSelector((state) => state.form.login)
  const password = useAppSelector((state) => state.form.password)
  const dispatch = useAppDispatch()

  const handleLoginChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    dispatch(updateLogin(e.nativeEvent.text))
  }

  const handlePasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    dispatch(updatePassword(e.nativeEvent.text))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Sign In </Text>
      <View style={styles.form}>
        <Text style={styles.label}>E Mail</Text>
        <TextInput onChange={handleLoginChange} value={login} style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChange={handlePasswordChange}
          value={password}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchUsers(dispatch)}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
