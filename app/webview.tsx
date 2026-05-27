import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MD3 } from '../constants/colors';

export default function WebViewScreen() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  let webViewRef: WebView | null = null;

  if (!url) {
    return (
      <View style={styles.errorWrap}>
        <Ionicons name="alert-circle-outline" size={40} color={MD3.error} />
        <Text style={styles.errorText}>URL을 불러올 수 없습니다.</Text>
        <TouchableOpacity style={styles.errorBtn} onPress={() => router.back()}>
          <Text style={styles.errorBtnText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 상단 네비게이션 바 */}
      <SafeAreaView style={styles.navBar}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => {
            if (canGoBack && webViewRef) {
              webViewRef.goBack();
            } else {
              router.back();
            }
          }}
        >
          <Ionicons name="chevron-back" size={22} color={MD3.onSurface} />
        </TouchableOpacity>

        <Text style={styles.navTitle} numberOfLines={1}>{title || 'Web'}</Text>

        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={22} color={MD3.onSurface} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* 로딩 프로그레스 바 */}
      {loading && (
        <View style={styles.loadingBar}>
          <View style={styles.loadingBarFill} />
        </View>
      )}

      {/* 웹뷰 */}
      <WebView
        ref={(ref) => { webViewRef = ref; }}
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(state) => setCanGoBack(state.canGoBack)}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={MD3.primary} />
            <Text style={styles.loadingText}>페이지를 불러오는 중...</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: MD3.outlineVariant,
    minHeight: Platform.OS === 'ios' ? 50 : 56,
  },
  navBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  navTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: MD3.onSurface,
    textAlign: 'center',
    marginHorizontal: 8,
  },

  loadingBar: {
    height: 3,
    backgroundColor: MD3.primaryContainer,
    overflow: 'hidden',
  },
  loadingBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: MD3.primary,
  },

  webview: { flex: 1 },

  loadingWrap: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    gap: 12,
  },
  loadingText: { fontSize: 14, color: MD3.onSurfaceVariant },

  errorWrap: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32,
  },
  errorText: { fontSize: 16, color: MD3.onSurface, fontWeight: '600' },
  errorBtn: {
    backgroundColor: MD3.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  errorBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
});
