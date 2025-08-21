import { View } from "react-native";
import { TimerDisplay } from "../components/TimerDisplay";
import { ControlButtons } from "../components/ControlButtons";
import { useTimer } from "../hooks/useTimer";

export default function HomeScreen() {
  // 25 minutos = 1500 segundos
  const { secondsLeft, isRunning, start, pause, reset } = useTimer(25 * 60);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <TimerDisplay seconds={secondsLeft} />
      <ControlButtons isRunning={isRunning} onStart={start} onPause={pause} onReset={reset} />
    </View>
  );
};

