import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const Login = (props) => {
  const address = 'https://courses.ses-education.com:5600/auth/student/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const fetchFromServer = async () => {
    try {
      let result = fetch(address, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: email,
          password: password,
        }),
      });
      let json = await (await result).json();
      return json;
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
    return (cleanUp = () => {
      setError(null);
    });
  }, [error]);

  const loginHandler = async () => {
    setError(null);
    let valid = validationHandler();
    if (valid) {
      let res = await fetchFromServer();
      if (!res.token) {
        setError('No answer from server');
      } else {
        props.navigation.navigate('courses', {
          token: res.token,
          user: res.user,
        });
      }
    }
  };

  const validationHandler = () => {
    if (email != 'test@test.cc' && email != 'test2@test.cc') {
      setError('Invalid email given.');
      return false;
    }
    if (password != '123456') {
      setError('Invalid password, try again.');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>LOGIN</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          placeholderTextColor='white'
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor='white'
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button title='Login' onPress={loginHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'pink',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 3,
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 45,
    width: '80%',
    backgroundColor: 'rgba(255,1,38,0.5)',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default Login;
