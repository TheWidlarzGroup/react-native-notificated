import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 50,
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 15,
  },
  input: {
    width: '80%',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  button: {
    width: '60%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 15,
  },
})
