import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Button, Text, Card} from '@rneui/themed';
import {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';

const LoginForm = () => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });

  const logIn = async (loginCredentials) => {
    try {
      console.log('Button pressed', isLoggedIn);
      const userData = await postLogin(loginCredentials);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      const type = error.message.includes('username') ? 'username' : 'password';
      setError(type, {
        type: 'server',
        message: error.message,
      });
    }
  };

  return (
    <Card>
      <Card.Title>Login</Card.Title>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
            autoCapitalize="none"
            errorMessage={
              (errors.username?.type === 'required' && (
                <Text>This is required.</Text>
              )) ||
              (errors.username?.type === 'minLength' && (
                <Text>Min 3 chars!</Text>
              )) ||
              (errors.username?.type === 'server' && (
                <Text>{errors.username?.message}</Text>
              ))
            }
          />
        )}
        name="username"
      />
      {errors.loginError && <Text>{errors.loginError.message}</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={
              (errors.password?.type === 'required' && (
                <Text>This is required.</Text>
              )) ||
              (errors.password?.type === 'server' && (
                <Text>{errors.password?.message}</Text>
              ))
            }
          />
        )}
        name="password"
      />

      <Button title="Sign in!" onPress={handleSubmit((data) => logIn(data))} />
    </Card>
  );
};

export default LoginForm;
