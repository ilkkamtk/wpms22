import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';

import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
