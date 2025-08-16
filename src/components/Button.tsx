import { LucideIcon } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

interface IconButtonProps {
  icons: [LucideIcon, LucideIcon]; // [icono cuando está en false, icono cuando está en true]
  animStyles: [any, any]; // estilos animados para cada icono
  onPress?: () => void;
}

const Button = ({ icons, animStyles, onPress }: IconButtonProps) => {
  const [IconOff, IconOn] = icons;
  const [styleOff, styleOn] = animStyles;

  return (
    <TouchableOpacity
      className="flex items-center justify-center p-6 rounded-full bg-slate-100"
      onPress={onPress}
    >
      <Animated.View style={[{ position: 'absolute' }, styleOff]}>
        <IconOff color="black" />
      </Animated.View>
      <Animated.View style={styleOn}>
        <IconOn color="black" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Button;

