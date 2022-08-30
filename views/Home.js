import {Platform, SafeAreaView, StyleSheet} from 'react-native';

import List from '../components/List';

const Home = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default Home;
