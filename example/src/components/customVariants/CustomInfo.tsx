import { Image, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'

type Props = {
  customTitle: string
}

export const CustomInfo = (p: Props) => {
  return (
    <View style={styles.info_container}>
      <Text style={styles.info_title}>{p.customTitle}</Text>
      <Image source={require('../../../assets/in_progress.png')} style={styles.info_image} />
    </View>
  )
}
