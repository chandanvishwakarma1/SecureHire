import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useAuthStore } from '../../../store/authStore';
import { Eye, EyeOff } from 'lucide-react-native'

const Index = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isUsernameFocused, setIsUsernameFocused] = useState(false)
  const [isPassFocused, setIsPassFocused] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const { isLoading, register } = useAuthStore();

  const handleRegister = async (username: string, email: string, password: string) => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Pleaase fill in all fields");
      return;
    }
    if (!email.trim().includes('@')){
      Alert.alert("Error", "Please enter valid email")
      return;
    }

    const result = await register(username.trim(), email.trim(), password.trim())
    if (!result.success) {
      Alert.alert("Login Failed", result.error || "Something went wrong")
      return;
    }
  }
  const isFilled = username.length > 0 && email.length > 0 && password.length > 0
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
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
                keyboardType='email-address'
                autoCapitalize='none'
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </View>
            <View className={`border-2  rounded-xl  px-3 justify-center h-14 ${isUsernameFocused ? 'border-black' : 'border-gray-300'}`}>
              <TextInput
                focusable
                className='w-full text-base'
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                onFocus={() => setIsUsernameFocused(true)}
                onBlur={() => setIsUsernameFocused(false)}
              />
            </View>
            <View className={`border-2  rounded-xl px-3 justify-center h-14 flex-row items-center ${isPassFocused ? 'border-black' : 'border-gray-300'}`}>
              <TextInput
                focusable
                className='flex-1 text-base '
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                keyboardType='default'
                autoCapitalize='none'
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => setIsPassFocused(false)}
              />
              <TouchableOpacity onPress={()=> setShowPass(!showPass)}>
                {
                  showPass ? <Eye color={'#4b5563'} /> : <EyeOff color={'#4b5563'}/>
                }
              </TouchableOpacity>

            </View>

            <TouchableOpacity disabled={isLoading} className={`items-center justify-center h-14 rounded-xl pr-3 ${isLoading ? 'bg-gray-300' : 'bg-blue-400'} ${isFilled ? 'bg-blue-400' : 'bg-gray-300'}`} onPress={() => handleRegister(username, email, password)}>
              {
                isLoading ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text className='text-lg font-bold text-white'>Sign Up</Text>
                )
              }
            </TouchableOpacity>
          </View></View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default Index

const styles = StyleSheet.create({})