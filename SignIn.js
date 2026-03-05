import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AppState,
} from 'react-native';

const ErrorText = memo(function ErrorText({ text }) {
  if (!text) return null;
  return <Text style={styles.errorText}>{text}</Text>;
});

// Format 3-3-2-2: 093 454 43 44
function formatPhone(digits) {
  const s = (digits || '').slice(0, 10);
  const p1 = s.slice(0, 3);
  const p2 = s.slice(3, 6);
  const p3 = s.slice(6, 8);
  const p4 = s.slice(8, 10);
  return [p1, p2, p3, p4].filter(Boolean).join(' ');
}

export default function SignIn({ navigation }) {
  const [digits, setDigits] = useState(''); // chỉ lưu số
  const [error, setError] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);

  // useMemo: chỉ format lại khi digits đổi
  const phoneDisplay = useMemo(() => formatPhone(digits), [digits]);

  // useEffect: hiển thị thông báo 1 lần duy nhất khi vào màn hình
  useEffect(() => {
    Alert.alert(
      'Welcome',
      'Chào mừng đến với khóa học lập trình React Native!'
    );
  }, []);

  // useEffect: lắng nghe AppState + cleanup
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      setAppState(nextState);
      console.log('AppState:', nextState);
    });

    return () => {
      sub.remove();
    };
  }, []);

  // useCallback: tránh tạo lại hàm mỗi lần render
  const handleChange = useCallback((text) => {
    const onlyDigits = text.replace(/\D/g, '').slice(0, 10); // chỉ số, tối đa 10
    setDigits(onlyDigits);
    setError('');
  }, []);

  const validateAndGo = useCallback(() => {
    // Rule: 10 số và bắt đầu bằng 0
    const ok = /^0\d{9}$/.test(digits);

    if (!ok) {
      const msg = 'Số điện thoại không đúng định dạng. Vui lòng nhập lại';
      setError(msg);
      Alert.alert('Lỗi', msg);
      return;
    }

    setError('');
    // replace: không quay lại SignIn khi bấm back
    navigation.replace('Home', { phone: digits });
  }, [digits, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.subText}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
      </Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phoneDisplay}
        onChangeText={handleChange}
        maxLength={13} // 10 số + 3 khoảng trắng
      />

      <ErrorText text={error} />


      <TouchableOpacity style={styles.button} onPress={validateAndGo}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  label: { fontSize: 16, marginBottom: 6 },
  subText: { color: 'gray', marginBottom: 16 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  inputError: { borderBottomColor: 'red' },
  errorText: { color: 'red', marginTop: 6 },
  appStateText: { marginTop: 10, color: '#666' },
  button: {
    backgroundColor: 'blue',
    padding: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});