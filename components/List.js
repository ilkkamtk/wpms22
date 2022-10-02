import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useContext, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

const List = ({navigation, myFilesOnly}) => {
  const {update, setUpdate} = useContext(MainContext);
  const {mediaArray} = useMedia(update, myFilesOnly);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = async () => {
    setIsFetching(true);
    setUpdate(update + 1);
    setIsFetching(false);
  };

  // useFocusEffect when using navigation
  useFocusEffect(() => {
    const interval = setInterval(async () => {
      try {
        await onRefresh();
        console.log(update);
        console.log('interval');
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
      onRefresh={onRefresh}
      refreshing={isFetching}
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
