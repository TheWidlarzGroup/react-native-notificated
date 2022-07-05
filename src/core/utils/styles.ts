import { StyleSheet } from 'react-native'
import { Constants } from '../config'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    maxWidth: 343,
    minHeight: 0,
    left: 0,
    backgroundColor: 'transparent',
    top: 0,
    zIndex: 200,
    justifyContent: 'flex-start',
  },
  containerIos: {
    left: `auto`,
    right: Constants.notificationSideMargin,
    top: 50,
  },
  containerAndroid: {
    left: `auto`,
    right: Constants.notificationSideMargin,
    top: 30,
  },
  boxWrapper: {
    width: '100%',
  },
})
