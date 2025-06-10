import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TextInputProps, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';

interface LabeledInputProps extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  error?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  error,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle, error ? styles.inputError : null]}
        placeholderTextColor="#666"
        {...textInputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'PressStart2P_400Regular',
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'red',
    fontSize: 10,
    marginTop: 5,
  },
});
