import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Button({ children, rounded, outlined, customStyle, ...restProps }) {
  let inlineStyle = []

  inlineStyle = inlineStyle.concat(styles.defaultStyle)

  if (rounded) {
    inlineStyle = inlineStyle.concat(styles.roundBorder)
  }

  if (outlined) {
    inlineStyle = inlineStyle.concat(styles.outlined)
  }

  if (customStyle) {
    inlineStyle = inlineStyle.concat(customStyle)
  }

  return (
    <TouchableOpacity {...restProps}>
      <View style={inlineStyle}>
        {children}
      </View>
    </TouchableOpacity>
  )
}


const height = 40
const padding = 10
const margin = 10
const minWidth = 150
const backgroundColor = 'lightgrey'

const styles = StyleSheet.create({
  defaultStyle: {
    height,
    padding,
    margin,
    minWidth,
    backgroundColor
  },
  roundBorder: {
    borderRadius: 30
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1
  }
})