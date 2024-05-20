import {View, Text} from 'react-native';
import React from 'react';

const PostItem = ({title, body}) => {
  return (
    <View
      style={{
        marginVertical: 3,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        width: '95%',
        alignSelf: 'center',
      }}>
      <View style={{backgroundColor: 'orange', padding: 5}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>{title}</Text>
      </View>
      <View style={{padding: 7}}>
        <Text>{body}</Text>
      </View>
    </View>
  );
};

export default PostItem;
