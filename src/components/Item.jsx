import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Item = ({title}) => {
    const styles = StyleSheet.create({
        listText: {
            color: 'black'
        }
    })
  return (
    <View>
      <Text style={styles.listText}>{title}</Text>
    </View>
  )
}

export default Item