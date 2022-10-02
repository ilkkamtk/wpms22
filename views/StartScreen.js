import Lottie from 'lottie-react-native';
import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const StartScreen = ({navigation}) => {
  const [progress, setProgress] = useState(false);
  const animation = useRef(null);
  useEffect(() => {
    animation.current?.play();
    if (progress) {
      console.log('animation redi');
      navigation.navigate('Login');
    }
  }, [progress]);

  return (
    <Lottie
      ref={animation}
      source={require('../assets/logo_animation.json')}
      loop={false}
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
      }}
      onAnimationFinish={() => setProgress(true)}
    />
  );
};

StartScreen.propTypes = {
  navigation: PropTypes.object,
};

export default StartScreen;
