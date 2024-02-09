import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    minHeight: 0,
    left: 0,
    backgroundColor: 'transparent',
    top: 0,
    zIndex: 200,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  containerIos: {
    left: 'auto',
    right: 'auto',
    top: 50,
  },
  containerAndroid: {
    left: 'auto',
    right: 'auto',
    top: 30,
  },
  boxWrapper: {
    width: '100%',
  },
})
