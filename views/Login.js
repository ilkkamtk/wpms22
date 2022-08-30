import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const Login = ({navigation}) => {
  // props is needed for navigation
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  const logIn = () => {
    console.log('Button pressed', isLoggedIn);
    setIsLoggedIn(true);
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
