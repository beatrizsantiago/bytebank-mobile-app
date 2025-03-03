import React, { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import FinancialAnalysis from './components/FinancialAnalysis';
import Jumbotron from './components/Jumbotron';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  const animateTo = (toValue: number) => {
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const getCurrentOffset = () => {
    // @ts-ignore
    const currentOffset = translateX.__getValue();
    if (currentOffset > -width / 2) {
      return 0;
    }
    return -width;
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > Math.abs(gesture.dy),

    onPanResponderMove: (_, gesture) => {
      translateX.setValue(gesture.dx + getCurrentOffset());
    },

    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > width * 0.25) {
        animateTo(0);
      } else if (gesture.dx < -width * 0.25) {
        animateTo(-width);
      } else {
        animateTo(getCurrentOffset());
      }
    },
  });

  return (
    <Container>
      <SwipeContainer
        style={[
          { transform: [{ translateX }] }
        ]}
        {...panResponder.panHandlers}
      >
        <Jumbotron />
        <FinancialAnalysis />
      </SwipeContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  overflow: hidden;
`;

const SwipeContainer = styled(Animated.View)`
  flex-direction: row;
  width: ${width * 2}px;
`;

export default Dashboard;
