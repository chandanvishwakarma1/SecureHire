import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '../../../../store/authStore';

const Username = () => {
    const [username, setUsername] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [loading, setLoading ] = useState(false);
    const isFilled = username.length > 0

    const fakeLoading = async() => {
        setLoading(true)
        await new  Promise(resolve=> setTimeout(resolve, 500))
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='flex-1 mx-6 '>
                    <View className='flex-row py-4 items-center gap-4'>
                        <ArrowLeft />
                        <Text className='font-semibold text-xl'>Username</Text>
                    </View>
                    <View className='flex-1 justify-center gap-3'>
                         <View className='mb-2 gap-2'>
                            <Text className='text-3xl font-bold text-gray-900'>Choose a username</Text>
                            <Text className='text-base text-gray-600'>This is how you will appear when flaggings fake listings or leaving employer reviews.</Text>
                        </View>
                        <View className={`border-2  rounded-xl  px-3 justify-center h-14 ${isUsernameFocused ? 'border-black' : 'border-gray-300'}`}>
                            <TextInput
                                placeholder='Username'
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize='none'
                                onFocus={() => setIsUsernameFocused(true)}
                                onBlur={() => setIsUsernameFocused(false)} />
                        </View>
                        <TouchableOpacity disabled={loading} className={`items-center justify-center h-14 rounded-xl pr-3 ${loading ? 'bg-gray-300' : 'bg-blue-400'} ${isFilled ? 'bg-blue-400' : 'bg-gray-300'}`} onPress={fakeLoading} >
                            {
                                loading ? (
                                    <ActivityIndicator size='small' color='white' />
                                ) : (
                                    <Text className='text-lg font-bold text-white'>Log In</Text>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default Username

const styles = StyleSheet.create({})