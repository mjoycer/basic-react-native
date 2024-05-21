import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import PostItem from '../components/PostItem';
import Item from '../components/Item';
import {useFetch} from '../helpers/api';
import { constants } from '../constants/url';

const HomeScreen = () => {
  const {data: usersData} = useFetch(constants.USERS_URL);
  const {data: postsData} = useFetch(constants.POSTS_URL);

  const renderUsers = ({item}) => {
    return <Item title={item.name} />;
  };

  const renderPosts = ({item}) => {
    return <PostItem title={item.title} body={item.body} />;
  };
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
          data={usersData}
          renderItem={renderUsers}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <Text style={styles.sectionHeader}>Posts</Text>
        <FlatList
          data={postsData}
          renderItem={renderPosts}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
