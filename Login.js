import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { login, get_courses } from './actions';

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFromServer = async () => {
    const result = await dispatch(login({ email, password }));
    return result;
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
    return (cleanUp = () => {
      setError(null);
      setIsLoading(false);
    });
  }, [error]);

  const loginHandler = async () => {
    setIsLoading(true);
    setError(null);
    let valid = validationHandler();
    if (valid) {
      let res = await fetchFromServer();
      if (!res.token) {
        setError(res);
      } else {
        setIsLoading(false);
        props.navigation.navigate('courses');
      }
    } else {
      setIsLoading(false);
    }
  };

  const validationHandler = () => {
    if (password.trim() === '' || email.trim() === '') {
      setError('Email and password must be given');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 chars');
      return false;
    }
    let pattern = new RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );
    if (!pattern.test(String(email).toLowerCase())) {
      setError('Email must be valid address');
      return false;
    }
    return true;
  };

  let form = (
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
        keyboardType='numeric'
        style={styles.input}
        placeholderTextColor='white'
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
    </View>
  );
  if (isLoading) {
    form = <ActivityIndicator size='large' color='red' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>LOGIN</Text>
      </View>
      {form}
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
