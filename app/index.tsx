import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';

export default function Index() {
  const { userType, hydrated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  // AsyncStorage 복원 전 대기
  if (!hydrated) return null;

  // 입주사: 기존 메인으로 바로 진입
  if (userType === 'tenant') return <Redirect href="/(tabs)" />;

  // 방문객: 방문객 메인으로 바로 진입
  if (userType === 'visitor') return <Redirect href="/(visitor)" />;

  // 처음 방문 또는 초기화 상태: 게이트웨이 화면
  return <Redirect href="/gateway" />;
}
