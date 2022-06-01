import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  advertisement_container: {
    flex: 1,
    backgroundColor: '#f0fffe',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#DCAE96',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  advertisement_title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  advertisement_description: {
    fontSize: 15,
    textAlign: 'center',
  },
  advertisement_image: {
    resizeMode: 'center',
    height: 230,
  },
  info_container: {
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#FFFFFF',
    borderWidth: 10,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  info_title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info_image: {
    width: 150,
    height: 150,
  },
})
