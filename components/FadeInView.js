import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {PropTypes} from 'prop-types';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

FadeInView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default FadeInView;
