import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppButton } from './AppButton';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { heightDiffPercentage, vMax, DEVICE_HEIGHT } from '../../utils/animation';
import { Keyframe } from 'react-native-reanimated';

export const keyframe = new Keyframe({
  from: {
    transform: [{ translateY: 0 }],
  },
  to: {
    transform: [{ translateY: 1000 }],
  },
});

export const WIPAppModal = () => {
  const [allMounted, setAllMounted] = React.useState(true);
  const inset = useSafeAreaInsets();
  const rHeightPercentageNumber = useSharedValue(30);
  const rStyle = useAnimatedStyle(() => {
    return {
      height: `${rHeightPercentageNumber.value}%`,
    };
  });
  const snapsPercentage = [30, 60, 80, 90];
  const unmountAll = () => {
    setAllMounted((e) => !e);
  };

  const panGestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startY: number }>({
    onStart: (_, ctx) => {
      ctx.startY = rHeightPercentageNumber.value;
    },
    onActive: (event, ctx) => {
      rHeightPercentageNumber.value = vMax(ctx.startY - heightDiffPercentage(event.translationY, DEVICE_HEIGHT), 100);
    },
    onEnd: () => {
      const snapTo = snapsPercentage.reduce((prev, curr) => {
        return Math.abs(curr - rHeightPercentageNumber.value) < Math.abs(prev - rHeightPercentageNumber.value)
          ? curr
          : prev;
      });
      rHeightPercentageNumber.value = withSpring(vMax(snapTo, 100));
    },
  });
  return (
    <>
      <AppButton
        xClassName="bg-black"
        onPress={() => {
          setAllMounted(true);
        }}
      >
        <Text className="text-white">oi</Text>
      </AppButton>
      {allMounted && (
        <Animated.View
          style={{
            position: 'absolute',
            top: -inset.top,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            paddingTop: inset.top,
            backgroundColor: 'rgba(0,0,0,0.5)',
            flexDirection: 'column-reverse',
          }}
        >
          <Pressable
            onPress={unmountAll}
            style={{
              position: 'absolute',
              top: -inset.top,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              paddingTop: inset.top,
              backgroundColor: 'rgba(0,0,0,0.5)',
              flexDirection: 'column-reverse',
            }}
          >
            <Animated.View
              exiting={keyframe.duration(500)}
              style={[rStyle]}
              className="bg-lime-50 rounded-t-3xl content-center px-4"
            >
              <PanGestureHandler onGestureEvent={panGestureEventHandler}>
                <Animated.View className="bg-blue-600 py-2">
                  <View className=" w-10 h-2 bg-gray-400 rounded-full self-center"></View>
                </Animated.View>
              </PanGestureHandler>
              <Text>oi</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
};
