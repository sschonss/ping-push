import React from 'react';
import { 
  Text as RNText, 
  View as RNView, 
  TouchableOpacity as RNTouchableOpacity, 
  TextInput as RNTextInput,
  ActivityIndicator,
  ScrollView as RNScrollView,
  SafeAreaView as RNSafeAreaView,
  StyleProp, 
  TextStyle, 
  ViewStyle,
  ImageBackground as RNImageBackground,
  Image as RNImage,
  ImageProps,
  ImageBackgroundProps,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps
} from 'react-native';

type StyleProps = {
  style?: StyleProp<ViewStyle | TextStyle>;
  className?: string;
};

export const Text = ({ style, className, ...props }: React.ComponentProps<typeof RNText> & StyleProps) => (
  <RNText style={style} {...props} />
);

export const View = ({ style, className, ...props }: React.ComponentProps<typeof RNView> & StyleProps) => (
  <RNView style={style} {...props} />
);

export const TouchableOpacity = ({ 
  style, 
  className, 
  ...props 
}: React.ComponentProps<typeof RNTouchableOpacity> & StyleProps) => (
  <RNTouchableOpacity style={style} {...props} />
);

export const TextInput = ({ 
  style, 
  className, 
  ...props 
}: React.ComponentProps<typeof RNTextInput> & StyleProps) => (
  <RNTextInput style={style} {...props} />
);

export const ScrollView = ({ 
  style, 
  className, 
  ...props 
}: React.ComponentProps<typeof RNScrollView> & StyleProps) => (
  <RNScrollView style={style} {...props} />
);

export const SafeAreaView = ({ 
  style, 
  className, 
  ...props 
}: React.ComponentProps<typeof RNSafeAreaView> & StyleProps) => (
  <RNSafeAreaView style={style} {...props} />
);

export const ImageBackground = ({ 
  style, 
  className, 
  ...props 
}: ImageBackgroundProps & StyleProps) => (
  <RNImageBackground style={style} {...props} />
);

export const Image = ({ 
  style, 
  className, 
  ...props 
}: ImageProps & StyleProps) => (
  <RNImage style={style} {...props} />
);

export const KeyboardAvoidingView = ({ 
  style, 
  className, 
  ...props 
}: KeyboardAvoidingViewProps & StyleProps) => (
  <RNKeyboardAvoidingView style={style} {...props} />
);

type LoaderProps = {
  size?: "small" | "large";
  color?: string;
};

export const Loader = ({ size = "large", color = "#ffffff" }: LoaderProps) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size={size} color={color} />
  </View>
);
