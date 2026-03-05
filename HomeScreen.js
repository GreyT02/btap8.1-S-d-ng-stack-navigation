import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function formatPhone(digits) {
  const s = (digits || '').slice(0, 10);
  const p1 = s.slice(0, 3);
  const p2 = s.slice(3, 6);
  const p3 = s.slice(6, 8);
  const p4 = s.slice(8, 10);
  return [p1, p2, p3, p4].filter(Boolean).join(' ');
}

export default function HomeScreen({ route, navigation }) {
  const phone = route?.params?.phone || '';
  const phoneDisplay = useMemo(() => formatPhone(phone), [phone]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>

      <Text style={styles.text}>Bạn đã đăng nhập với số:</Text>
      <Text style={styles.phone}>{phoneDisplay || '(không có dữ liệu)'}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('SignIn')}
      >
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { color: '#444' },
  phone: { marginTop: 8, fontSize: 18, fontWeight: '600' },
  button: {
    marginTop: 24,
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});