import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { MD3 } from '../../constants/colors';

interface M3TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  helperText?: string;
}

export const M3TextField: React.FC<M3TextFieldProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
          hasError && styles.containerError,
        ]}
      >
        <Text style={[styles.label, focused && styles.labelFocused, hasError && styles.labelError]}>
          {label}
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={MD3.outline}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </View>
      {(error || helperText) && (
        <Text style={[styles.helper, hasError && styles.helperError]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  container: {
    borderWidth: 1,
    borderColor: MD3.outline,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: MD3.surface,
  },
  containerFocused: { borderColor: MD3.primary, borderWidth: 2 },
  containerError: { borderColor: MD3.error, borderWidth: 2 },
  label: { fontSize: 12, color: MD3.onSurfaceVariant, marginBottom: 2, fontWeight: '500' },
  labelFocused: { color: MD3.primary },
  labelError: { color: MD3.error },
  input: { fontSize: 16, color: MD3.onSurface, paddingVertical: 2 },
  helper: { fontSize: 12, color: MD3.onSurfaceVariant, marginTop: 4, paddingHorizontal: 16 },
  helperError: { color: MD3.error },
});
