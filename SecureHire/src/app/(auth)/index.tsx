import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useAuthStore } from '../../../store/authStore';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';

const Index = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPassFocused, setIsPassFocused] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const { isLoading, logIn } = useAuthStore();

  const router = useRouter()

  const handleLogin = async (userText: string, password: string) => {
    if (!userText.trim() || !password.trim()) {
      Alert.alert("Error", "Pleaase fill in all fields");
      return;
    }
    const result = await logIn(userText.trim(), password.trim())
    if (!result.success) Alert.alert("Login Failed", result.error || "Something went wrong")
  }
  const isFilled = text.length > 0 && password.length > 0
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='flex-1 mx-6 items-center justify-center'>
          <View className='h-40 w-40 bg-red-400 rounded-full mb-10'></View>
          <Text className='text-3xl font-extrabold mb-6'>Welocome Back!</Text>

          <View className='w-full gap-3'>
            <View className={`border-2  rounded-xl  px-3 justify-center h-14 ${isEmailFocused ? 'border-black' : 'border-gray-300'}`}>
              <TextInput
                focusable
                className='w-full text-base'
                placeholder='Username or Email'
                value={text}
                onChangeText={setText}
                keyboardType='email-address'
                autoCapitalize='none'
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </View>
            <View className={`border-2  rounded-xl px-3 justify-center h-14 flex-row items-center ${isPassFocused ? 'border-black' : 'border-gray-300'}`}>
              <TextInput
                className='flex-1 text-base'
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                keyboardType='default'

                autoCapitalize='none'
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => setIsPassFocused(false)}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                {
                  showPass ? <Eye /> : <EyeOff />
                }
              </TouchableOpacity>
            </View>

            <TouchableOpacity disabled={isLoading} className={`items-center justify-center h-14 rounded-xl pr-3 ${isLoading ? 'bg-gray-300' : 'bg-blue-400'} ${isFilled ? 'bg-blue-400' : 'bg-gray-300'}`} onPress={() => handleLogin(text, password)}>
              {
                isLoading ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text className='text-lg font-bold text-white'>Login</Text>
                )
              }
            </TouchableOpacity>
          </View>
          <Text>dont have account? <Pressable onPress={() => router.navigate('/(auth)/register')}><Text>Register</Text></Pressable></Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default Index

const styles = StyleSheet.create({})