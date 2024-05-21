import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import PostItem from '../components/PostItem';
import Item from '../components/Item';
import axios from 'axios';

const HomeScreen = () => {
  const [data, setData] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        setData(res.data);
      });
    
      axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
        setPosts(res.data);
      });
  }, [])

  const renderUsers = ({item}) => {
    return <Item title={item.name} />
  }

  const renderPosts = ({item}) => {
    return <PostItem title={item.title} body={item.body} />
  }
  const styles = StyleSheet.create({
    navBar: {
      backgroundColor: 'teal',
      height: 50,
      marginBottom: 10,
      justifyContent: 'center',
      padding: 10,
    },
    sectionHeader: {
      fontWeight: 'bold',
      fontSize: 20,
      marginVertical: 5,
      color: 'black',
      padding: 10,
    },
    navBarText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
    },
  });

  return (
    <View style={{flex: 1}}>
      <View>
        <Text style={styles.sectionHeader}>Users</Text>
        <FlatList
          style={{padding: 10}}
          data={data}
          renderItem={renderUsers}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <Text style={styles.sectionHeader}>Posts</Text>
        <FlatList
          data={posts}
          renderItem={renderPosts}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
