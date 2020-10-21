import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
} from 'react-native';
import fallBackImage from './assets/fallBack.jpg';

const Courses = (props) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const address =
    'https://courses.ses-education.com:5600/courses/student-courses';
  const token = props.navigation.getParam('token');
  const user = props.navigation.getParam('user');

  const coursesHandler = async () => {
    try {
      let result = fetch(address, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      let json = await (await result).json();
      setData(json);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseCard}>
      <Text>Title: {item.title}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Image:</Text>
      <Image
        source={item.image ? item.image : fallBackImage}
        style={styles.image}
      />
    </View>
  );

  const logoutHandler = () => {
    /* try {
      let result = fetch(address, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      let json = await (await result).json();
      setData(json);
    } catch (err) {
      console.log(err);
      setError(err);
    } */
    props.navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>You are now logged in as:</Text>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button title='Fetch courses' onPress={coursesHandler} />
        <Button title='Logout' onPress={logoutHandler} />
      </View>

      <View style={styles.contentContainer}>
        {data && (
          <FlatList
            data={data}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.course_id.toString()}
          />
        )}
        {!data && <Text>Press Fetch Courses</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  btnContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  contentContainer: {
    flex: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseCard: {
    backgroundColor: 'pink',
    width: '90%',
    height: 250,
    padding: 20,
    marginVertical: 5,
    marginLeft: 12,
    borderRadius: 10,
  },
  image: {
    width: 130,
    height: 130,
    marginVertical: 10,
  },
});
export default Courses;
