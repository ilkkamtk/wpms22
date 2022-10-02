import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

const List = ({navigation, myFilesOnly}) => {
  const {update, setUpdate} = useContext(MainContext);
  const {mediaArray, loading} = useMedia(update, myFilesOnly);

  const doRefresh = () => {
    setUpdate(update + 1);
  };

  // useFocusEffect when using navigation
  useFocusEffect(() => {
    const interval = setInterval(() => {
      try {
        doRefresh();
      } catch (error) {
        console.log('interval error');
      }
    }, 10000);

    return () => {
      clearInterval(interval); // this won't run with useEffect due navigation
    };
  });

  return (
    <FlatList
      data={mediaArray}
      onRefresh={doRefresh}
      refreshing={loading}
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
