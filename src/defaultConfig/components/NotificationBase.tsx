import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import type { PropsConfig } from '../../types'
import { getContainerStyles, getDescriptionStyle, getTitleStyle } from '../stylesUtils'

// type F0<T = void> = () => T

export const NotificationBase = (props: PropsConfig) => {
  const containerStyles = getContainerStyles({ ...props })
  const titleStyle = getTitleStyle({ ...props })
  const descriptionStyle = getDescriptionStyle({ ...props })

  const renderLeftIcon = () => <Image source={props.leftIconSource!} style={styles.leftIcon} />
  const renderTitle = () => !!props.title && <Text style={titleStyle}>{props.title}</Text>
  const renderDescription = () => (
    <Text style={descriptionStyle} numberOfLines={props.multiline ?? 1}>
      {props.description}
    </Text>
  )
  // const renderRightIcon = () =>
  //   props.onClose && (
  //     <View style={styles.rightIcon}>
  //       <Text>Close</Text>
  //     </View>
  //   )

  return (
    <View style={containerStyles}>
      {props.defaultIconType !== 'no-icon' && renderLeftIcon()}
      <View style={styles.content}>
        {renderTitle()}
        {renderDescription()}
      </View>
      {/*{renderRightIcon()}*/}
    </View>
  )
}

const styles = StyleSheet.create({
  leftIcon: {
    height: 40,
    width: 40,
  },
  content: {
    paddingLeft: 6,
    paddingRight: 32,
  },
})
