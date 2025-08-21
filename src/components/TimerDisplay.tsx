import { Text, View } from "react-native";
import { formatTime } from "../utils/formatTime";

type Props = {
  seconds: number;
};

export const TimerDisplay = ({ seconds }: Props) => {
  return (
    <View className="items-center justify-center">
      <Text className="text-6xl font-bold">{formatTime(seconds)}</Text>
    </View>
  );
};

