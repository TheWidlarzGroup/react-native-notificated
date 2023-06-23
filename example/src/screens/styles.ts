import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginVertical: 50,
    alignSelf: 'center',
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  modal: {
    backgroundColor: 'white',
    flex: 0.5,
    alignItems: 'center',
    top: '15%',
    borderRadius: 12,
  },
})
