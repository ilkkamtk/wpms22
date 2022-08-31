import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {isLoggedIn, setIsLoggedIn, user, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token', userToken);
      // TODO: call getUserByToken(userToken), if you get successful result,
      // set isLoggedIn to true and navigate to Tabs
      const userData = await getUserByToken(userToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login - checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    const loginCredentials = {
      username: 'jamesb',
      password: 'examplepass',
    };
    try {
      console.log('Button pressed', isLoggedIn);
      const userData = await postLogin(loginCredentials);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login - logIn', error);
      // TODO: nofify user about wrong username/password/net error?
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
