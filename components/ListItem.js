import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/variables';
import {
  ListItem as RNEListItem,
  Avatar,
  Button,
  ButtonGroup,
} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
  // console.log('ListItem: ', singleMedia);
  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}
    >
      <Avatar
        size="large"
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
        {/* {//TODO: display button only when user is the file owner */}
        <ButtonGroup
          buttons={['Modify', 'Delete']}
          onPress={(index) => {
            // console.log('button pressed:', index);
            if (index === 0) {
              // TODO: open modify file view
            } else {
              // TODO: delete the file
            }
          }}
        />
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
