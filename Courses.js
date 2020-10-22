import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import fallBackImage from './assets/fallBack.jpg';
import { connect } from 'react-redux';

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.usr,
      courses: props.crs,
    };
  }

  renderCourseItem = ({ item }) => (
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

  logoutHandler = () => {
    this.props.navigation.navigate('login');
  };

  render() {
    let data = (
      <View style={styles.contentContainer}>
        {this.state.courses && (
          <FlatList
            data={this.state.courses}
            renderItem={this.renderCourseItem}
            keyExtractor={(item) => item.course_id.toString()}
          />
        )}
      </View>
    );

    if (!this.state.courses) {
      data = <ActivityIndicator size='large' color='red' />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>You are now logged in as:</Text>
          <Text>Name: {this.state.user.name}</Text>
          <Text>Email: {this.state.user.email}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button title='Logout' onPress={this.logoutHandler} />
        </View>

        {data}
      </View>
    );
  }
}

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
const mapStateToProps = (state) => {
  return {
    usr: state.user,
    crs: state.courses,
  };
};

export default connect(mapStateToProps)(Courses);
