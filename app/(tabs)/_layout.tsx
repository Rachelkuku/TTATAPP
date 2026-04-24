import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../../constants/colors';
import { View, Text, StyleSheet, Platform } from 'react-native';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  name: IoniconsName;
  outlineName: IoniconsName;
  label: string;
  focused: boolean;
}

// M3 Navigation Bar Icon — with indicator pill
function NavItem({ name, outlineName, label, focused }: TabIconProps) {
  return (
    <View style={navStyles.item}>
      <View style={[navStyles.indicator, focused && navStyles.indicatorActive]}>
        <Ionicons
          name={focused ? name : outlineName}
          size={24}
          color={focused ? MD3.onPrimaryContainer : MD3.onSurfaceVariant}
        />
      </View>
      <Text style={[navStyles.label, focused && navStyles.labelActive]}>{label}</Text>
    </View>
  );
}

const navStyles = StyleSheet.create({
  item: { alignItems: 'center', justifyContent: 'center', paddingTop: 12 },
  indicator: {
    width: 64,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  indicatorActive: { backgroundColor: MD3.primaryContainer },
  label: { fontSize: 12, fontWeight: '500', color: MD3.onSurfaceVariant, letterSpacing: 0.5 },
  labelActive: { color: MD3.onSurface, fontWeight: '700' },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: MD3.surface,
          borderTopColor: MD3.outlineVariant,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 80 : 64,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          elevation: 4,
          shadowColor: MD3.scrim,
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavItem name="home" outlineName="home-outline" label="홈" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="apply/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavItem name="document-text" outlineName="document-text-outline" label="신청" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="membership/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavItem name="gift" outlineName="gift-outline" label="멤버십" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="community/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavItem name="people" outlineName="people-outline" label="커뮤니티" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="my/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavItem name="person" outlineName="person-outline" label="마이" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
