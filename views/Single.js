/* eslint-disable camelcase */
import {ScrollView, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/variables';
import {Card, ListItem, Text, Avatar} from '@rneui/themed';
import FullSizeImage from '../components/FullSizeImage';
import {Video} from 'expo-av';
import {useEffect} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useState} from 'react';
import {useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '@rneui/themed';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const Single = ({route}) => {
  // console.log('Single route', route);
  const {filename, title, description, user_id, media_type, file_id} =
    route.params;
  const [videoRef, setVideoRef] = useState(null);
  const [avatar, setAvatar] = useState(
    'https://via.placeholder.com/40x40?text=IMG'
  );
  const {getFilesByTag} = useTag();
  const {getUserById} = useUser();
  const {postFavourite, getFavouritesByFileId, deleteFavourite} =
    useFavourite();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const [owner, setOwner] = useState({username: 'fetching...'});
  const {user} = useContext(MainContext);

  // TODO: show owners username

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user_id);
      const avatarFile = avatarArray.pop();
      setAvatar(mediaUrl + avatarFile.filename);
      console.log('avatarArray', mediaUrl + avatarFile.filename);
    } catch (error) {
      console.log('fetchAvatar', error.message);
    }
  };

  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      // no error neccessary
    }
  };

  const lock = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      // no error neccessary
    }
  };

  const showFullscreenVideo = async () => {
    try {
      if (videoRef) await videoRef.presentFullscreenPlayer();
    } catch (error) {
      console.log('fs video', error);
    }
  };

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(user_id, token);
      setOwner(userData);
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetch owner error', error);
      setOwner({username: '[not available]'});
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file_id);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file_id, token);
      response && setUserLike(true);
    } catch (error) {
      // TODO: what to do if user has liked this image already?
      console.error('createFavourite error', error);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file_id, token);
      response && setUserLike(false);
    } catch (error) {
      // TODO: what to do if user has not liked this image already?
      console.error('removeFavourite error', error);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  useEffect(() => {
    unlock();
    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      // console.log('Orientaatio:', evt);
      if (evt.orientationInfo.orientation > 2) {
        // show fullscreen video
        showFullscreenVideo();
      }
    });

    return () => {
      lock();
      ScreenOrientation.removeOrientationChangeListener(orientSub);
    };
  }, [videoRef]);

  return (
    <ScrollView>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        {media_type === 'image' ? (
          <FullSizeImage
            source={{uri: mediaUrl + filename}}
            PlaceholderContent={<ActivityIndicator />}
            style={{marginBottom: 12}}
          />
        ) : (
          // use Card.Image as a hack to fix card not stretching
          <Card.Image
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
            }}
          >
            <Video
              ref={handleVideoRef}
              source={{uri: mediaUrl + filename}}
              style={{width: '100%', height: '100%'}}
              onError={(error) => {
                console.log('Video error:', error);
              }}
              shouldPlay
              useNativeControls
              isLooping
            />
          </Card.Image>
        )}
        <Card.Divider />
        <ListItem>
          <Text>{description}</Text>
        </ListItem>
        <ListItem>
          <Avatar source={{uri: avatar}} />
          <Text>{owner.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Likes count: {likes.length}</Text>
          <Button
            icon={{name: userLike ? 'thumb-down' : 'thumb-up', color: 'white'}}
            onPress={() => {
              userLike ? removeFavourite() : createFavourite();
            }}
          ></Button>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
