import { StatusBar } from 'expo-status-bar';
import './global.css';
import HomeScreen from '~/screens/HomeScreen';
import { View } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <View className="w-full h-full bg-white">
        <HomeScreen />
      </View>
    </>
  );
}
