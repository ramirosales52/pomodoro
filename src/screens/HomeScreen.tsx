import { useEffect, useRef, useState } from 'react';
import { View, Text, Easing, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import AnimatedNumbers from 'react-native-animated-numbers';
import Button from '~/components/Button';
import { Play, Pause, RotateCcw, Settings, Sun } from 'lucide-react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants
const TIMER_DURATION = 25 * 60; // 25 minutes in seconds
const ANIMATION_DURATION = 100;
const RESET_ANIMATION_DURATION = 400;
const NUMBER_ANIMATION_DURATION = 1000;
const FONT_SIZE_RATIO = 2.8;
const DEFAULT_FONT_SIZE = 60;
const COLON_VERTICAL_OFFSET = -3;

const HomeScreen = () => {
  // State management
  const [secondsLeft, setSecondsLeft] = useState(TIMER_DURATION);
  const [running, setRunning] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // Refs and animated values
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animValue = useSharedValue(0);
  const resetRotation = useSharedValue(0);

  // Computed values
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const maxFontSize = containerWidth > 0 ? containerWidth / FONT_SIZE_RATIO : DEFAULT_FONT_SIZE;

  // Timer control handlers
  const handleStartPause = () => {
    if (running) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    setRunning(true);
    animValue.value = withTiming(1, { duration: ANIMATION_DURATION });

    // Immediately decrement first second
    setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      const ref = intervalRef.current;
      intervalRef.current = null;

      setTimeout(() => {
        clearInterval(ref);
        setRunning(false);
        animValue.value = withTiming(0, { duration: ANIMATION_DURATION });
      }, 280);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
    animValue.value = withTiming(0, { duration: ANIMATION_DURATION });
  };

  const handleReset = () => {
    stopTimer();
    setSecondsLeft(TIMER_DURATION);

    // Reset rotation animation
    resetRotation.value = 0;
    resetRotation.value = withTiming(360, { duration: RESET_ANIMATION_DURATION }, () => {
      resetRotation.value = 0;
    });
  };

  // Layout handler
  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Animated styles
  const playIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animValue.value === 0 ? 1 : 0, { duration: ANIMATION_DURATION }),
    transform: [
      { scale: withTiming(animValue.value === 0 ? 1 : 0.8, { duration: ANIMATION_DURATION }) },
    ],
  }));

  const pauseIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animValue.value === 1 ? 1 : 0, { duration: ANIMATION_DURATION }),
    transform: [
      { scale: withTiming(animValue.value === 1 ? 1 : 0.8, { duration: ANIMATION_DURATION }) },
    ],
  }));

  const resetIconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `-${resetRotation.value}deg` },
      { scale: withTiming(1, { duration: ANIMATION_DURATION }) },
    ],
  }));

  // Render individual animated number
  const renderAnimatedNumber = (value: number) => (
    <AnimatedNumbers
      animateToNumber={value}
      animationDuration={NUMBER_ANIMATION_DURATION}
      fontStyle={{ fontSize: maxFontSize, fontWeight: 800, color: '#1f2937' }}
      easing={Easing.elastic(0.8)}
    />
  );

  return (
    <SafeAreaView className="py-2 h-full w-full flex flex-col">
      {/* Header with settings and theme toggle */}
      <View className="mx-4 flex flex-row justify-between">
        <TouchableOpacity accessibilityLabel="Settings" accessibilityRole="button">
          <Settings size={28} />
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="Toggle theme" accessibilityRole="button">
          <Sun size={28} />
        </TouchableOpacity>
      </View>

      {/* Timer display and controls */}
      <View
        onLayout={handleLayout}
        className="mt-48 px-2 w-full flex-col items-center justify-center"
      >
        {/* Timer display */}
        <View className="flex flex-row">
          {/* Minutes */}
          {renderAnimatedNumber(Math.floor(minutes / 10))}
          {renderAnimatedNumber(minutes % 10)}

          {/* Colon separator */}
          <Text
            allowFontScaling={false}
            style={{
              fontSize: maxFontSize,
              fontWeight: 'bold',
              color: '#1f2937',
              marginHorizontal: 10,
              top: COLON_VERTICAL_OFFSET,
            }}
          >
            :
          </Text>

          {/* Seconds */}
          {renderAnimatedNumber(Math.floor(seconds / 10))}
          {renderAnimatedNumber(seconds % 10)}
        </View>

        {/* Control buttons */}
        <View className="flex flex-row justify-center mt-6 gap-4 w-full">
          <Button
            icons={[Play, Pause]}
            animStyles={[playIconStyle, pauseIconStyle]}
            onPress={handleStartPause}
          />
          <Button
            icons={[RotateCcw, RotateCcw]}
            animStyles={[resetIconStyle, resetIconStyle]}
            onPress={handleReset}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
