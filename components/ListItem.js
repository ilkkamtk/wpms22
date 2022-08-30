import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia, navigation}) => {
  const mediaUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';
  console.log(singleMedia);
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('Single');
      }}
    >
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.listTitle}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
