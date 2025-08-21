import { View, Button } from "react-native";

type Props = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export const ControlButtons = ({ isRunning, onStart, onPause, onReset }: Props) => {
  return (
    <View className="flex-row justify-center space-x-4 mt-4">
      {isRunning ? (
        <Button title="Pause" onPress={onPause} />
      ) : (
        <Button title="Start" onPress={onStart} />
      )}
      <Button title="Reset" onPress={onReset} />
    </View>
  );
};

