import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {Button, Image, Text} from '@rneui/themed';

const Profile = () => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/640');
  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatarFile = avatarArray.pop();
      setAvatar(mediaUrl + avatarFile.filename);
      console.log('avatarArray', mediaUrl + avatarFile.filename);
    } catch (error) {
      console.error('fetchAvatar', error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log('Profile', isLoggedIn);

  const logOut = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Profile - logOut', error);
    }
  };

  return (
    <>
      <Text>Profile</Text>
      <Text>
        User: {user.username} (id: {user.user_id})
      </Text>
      <Image source={{url: avatar}} style={{width: 200, height: 200}} />

      <Text>Email: {user.email}</Text>
      <Text>Full name: {user.full_name}</Text>
      <Text>User since: {user.time_created}</Text>
      <Button title="Logout" onPress={logOut} />
    </>
  );
};

export default Profile;
