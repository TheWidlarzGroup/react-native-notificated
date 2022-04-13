import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from './styles'

type Props = {
  customTitle: string
  customDescription: string
}

export const Advertisement = (p: Props) => {
  return (
    <View style={styles.advertisement_container}>
      <Text style={styles.advertisement_title}>{p.customTitle}</Text>
      <Image source={require('../../../assets/doughnut.png')} style={styles.advertisement_image} />
      <Text style={styles.advertisement_description}>{p.customDescription}</Text>
    </View>
  )
}
