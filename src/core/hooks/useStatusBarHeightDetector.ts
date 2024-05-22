type Props = {
  isPortraitMode: boolean
}

export const useStatusBarHeightDetector = ({ isPortraitMode: _ }: Props) => {
  return {
    statusBarHeight: 0,
  }
}
