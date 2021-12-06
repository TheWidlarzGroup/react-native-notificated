import * as React from 'react'
import { Text } from 'react-native'

import { multiply } from 'react-native-notification'

const randomUnderHundred = () => Math.floor(Math.random() * 100)
const Sleep = (delay: number) => new Promise((res) => setTimeout(res, delay))

type Maybe<T> = T | null

const App = () => {
  const [a] = React.useState(randomUnderHundred())
  const [b] = React.useState(randomUnderHundred())
  const [result, setResult] = React.useState<Maybe<number>>(null)

  React.useEffect(() => {
    const multiplyRandomAsync = async () => {
      const product = await multiply(a, b)
      await Sleep(1000)
      setResult(product)
    }
    multiplyRandomAsync()
  }, [a, b])

  console.log('rendereing')

  return <Text>Current result is {result}</Text>
}

export default App
