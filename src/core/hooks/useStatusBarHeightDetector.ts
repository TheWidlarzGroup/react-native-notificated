import { useEffect, useState } from 'react'
import { NativeModules, Platform, StatusBar } from 'react-native'

type Props = {
  isPortaitMode: boolean
}

export const useStatusBarHeightDetector = ({ isPortaitMode }: Props) => {
  const { StatusBarManager } = NativeModules
  const [barHeight, setBarHeight] = useState(0)

  useEffect(() => {
    if (Platform.OS !== 'ios') return setBarHeight(StatusBar.currentHeight ?? 0)
    // handling edge case when app is opened in landscape mode and barHeight = 0
    StatusBarManager.getHeight(({ height }: { height: number }) =>
      setBarHeight(isPortaitMode && height !== 0 ? height : 50)
    )
  }, [StatusBarManager, isPortaitMode])

  return {
    statusBarHeight: barHeight,
  }
}
