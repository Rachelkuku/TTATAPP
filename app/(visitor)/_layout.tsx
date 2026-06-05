import { Stack } from 'expo-router';

export default function VisitorLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="attraction" />
    </Stack>
  );
}
