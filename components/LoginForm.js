import {useForm} from 'react-hook-form';
import {View, Text, Button} from 'react-native';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });
  return (
    <View>
      <Text>LoginForm</Text>
      <Button title="Sign in!" />
    </View>
  );
};

export default LoginForm;
