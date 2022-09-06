import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {Avatar, Button, Card, ListItem} from '@rneui/themed';
import FullSizeImage from '../components/FullSizeImage';

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
    <Card>
      <Card.Title>{user.full_name}</Card.Title>
      <FullSizeImage source={{uri: avatar}} />
      <ListItem>
        <Avatar
          icon={{name: 'contact-mail', type: 'material'}}
          containerStyle={{backgroundColor: '#aaa'}}
        />
        <ListItem.Title>{user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <Avatar
          icon={{name: 'person', type: 'material'}}
          containerStyle={{backgroundColor: '#aaa'}}
        />
        <ListItem.Title>
          {user.username} (id: {user.user_id})
        </ListItem.Title>
      </ListItem>
      <Button title="Logout" onPress={logOut} />
    </Card>
  );
};

export default Profile;
