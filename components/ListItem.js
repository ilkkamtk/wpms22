import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/variables';
import {
  ListItem as RNEListItem,
  Avatar,
  Icon,
  Button,
  Text,
} from '@rneui/themed';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const ListItem = ({singleMedia, navigation, myFilesOnly}) => {
  // console.log('ListItem: ', singleMedia);
  const {user, update, setUpdate} = useContext(MainContext);
  const {deleteMedia} = useMedia();

  const doDelete = () => {
    Alert.alert('Deleting a file..', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const token = await AsyncStorage.getItem('userToken');
          await deleteMedia(token, singleMedia.file_id);
          setUpdate(!update);
        },
      },
    ]);
  };

  const swipeProps = {};

  if (singleMedia.user_id === user.user_id) {
    swipeProps.leftContent = (reset) => (
      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate('ModifyFile', singleMedia);
          reset();
        }}
        icon={{name: 'edit', color: 'white'}}
        buttonStyle={{minHeight: '100%'}}
      />
    );

    swipeProps.rightContent = (reset) => (
      <Button
        title="Delete"
        onPress={() => {
          doDelete();
          reset();
        }}
        icon={{name: 'delete', color: 'white'}}
        buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
      />
    );
  }

  return (
    <RNEListItem.Swipeable
      bottomDivider
      onPress={() => navigation.navigate('Single', singleMedia)}
      {...swipeProps}
    >
      <Avatar
        size="large"
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.media_type === 'image' ? (
            <Icon name="crop-original" />
          ) : (
            <Icon name="ondemand-video" />
          )}{' '}
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
        {singleMedia.user_id === user.user_id && (
          <RNEListItem.Subtitle numberOfLines={1}>
            <Text style={{color: '#ccc'}}>Swipe to edit/delete</Text>
          </RNEListItem.Subtitle>
        )}
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem.Swipeable>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
