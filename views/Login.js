import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Card} from '@rneui/themed';
import FadeInView from '../components/FadeInView';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [showRegForm, setShowRegForm] = useState(false);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token', userToken);
      // TODO: call getUserByToken(userToken), if you get successful result,
      // set isLoggedIn to true and navigate to Tabs
      if (userToken != null) {
        const userData = await getUserByToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      // token invalid on server side
      console.error('Login - checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flexGrow: 1}}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <FadeInView>
          {showRegForm ? <RegisterForm /> : <LoginForm />}
          <Card>
            <Button
              title={showRegForm ? 'or sign in' : 'Register a new account'}
              onPress={() => {
                setShowRegForm(!showRegForm);
              }}
            ></Button>
          </Card>
        </FadeInView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
