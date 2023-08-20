import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingAnimation = () => {
  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(dots => dots.length < 3 ? dots + '.' : '');
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View >
      <Text style={styles.loadingText}>{loadingDots}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  loadingText: {
 
    color: '#3498db',
    fontSize: 60,
    lineHeight: 30 * 1.4,
    fontWeight: 'bold',
  },
});

export default LoadingAnimation;
