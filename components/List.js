import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

const List = ({navigation, myFilesOnly}) => {
  const {update, setUpdate} = useContext(MainContext);
  // eslint-disable-next-line no-unused-vars
  const {mediaArray, loading} = useMedia(update, myFilesOnly);

  const doRefresh = () => {
    setUpdate(update + 1);
  };

  // automatic updates:
  // useFocusEffect when using navigation
  useFocusEffect(() => {
    const interval = setInterval(() => {
      doRefresh();
    }, 10000);

    return () => {
      clearInterval(interval); // this won't run with useEffect due navigation
    };
  });
  console.log('list rendered'); //
  return (
    <FlatList
      data={mediaArray}
      // manual refresh:
      // onRefresh={doRefresh}
      // refreshing={loading}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          myFilesOnly={myFilesOnly}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
