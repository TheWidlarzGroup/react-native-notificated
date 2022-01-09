import { StyleSheet } from 'react-native'
import { themeBase } from './components/theme'

export const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
  textWrapper: {
    flex: 1,
    paddingLeft: themeBase.spacing.s,
    paddingRight: themeBase.spacing.l,
  },
  content: {
    paddingVertical: themeBase.spacing.xl,
    paddingLeft: themeBase.spacing.s,
    paddingRight: themeBase.spacing.l,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  undo: {
    fontSize: themeBase.fontSize.messageFontSize,
    fontWeight: 'bold',
    color: themeBase.color.info,
    textDecorationLine: 'underline',
    paddingTop: themeBase.spacing.xs,
  },
})
