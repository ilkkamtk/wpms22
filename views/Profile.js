import {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);

  console.log('Profile', isLoggedIn);

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title="Logout" onPress={logOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
