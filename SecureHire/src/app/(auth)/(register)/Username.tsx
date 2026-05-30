import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Check, X } from 'lucide-react-native';
import { useAuthStore } from '../../../../store/authStore';

const Username = () => {
    const [username, setUsername] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [loading, setLoading] = useState(false);
    const [isAvailable, setIsAvailble] = useState<boolean | null>(null);
    const [error, setError] = useState<[] | null>(null)
    const isFilled = username.length > 0

    useEffect(() => {
        if (!username.trim()) {
            setIsAvailble(null)
            setLoading(false)
            return;
        }

        setLoading(true)
        setIsAvailble(null)

        const debounce = setTimeout(() => {
            checkUsername(username)
        }, 600)

        return () => clearTimeout(debounce)
    }, [username])

    const checkUsername = async (currentUsername: string) => {
        // setLoading(true)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/checkUsername`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: currentUsername })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || "Something went wrong.")

            if (data.success) {
                setIsAvailble(true)
            }
            else { setIsAvailble(false) ; setError(data.message)}
        } catch (error) {
            console.log(error)
            setError(error.message)
            setIsAvailble(false)
        } finally {
            setLoading(false)
        }
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
                        {
                            error ? (
                                <Text>{error}</Text>
                            ):(
                                <Text>No</Text>
                            )
                        }
                        <View className={`border-2 flex-row items-center rounded-xl  px-3 justify-center h-14 ${isUsernameFocused ? 'border-black' : 'border-gray-300'}`}>
                            <TextInput
                                className='flex-1'
                                placeholder='Username'
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize='none'
                                onFocus={() => setIsUsernameFocused(true)}
                                onBlur={() => setIsUsernameFocused(false)} />
                            {
                                loading && (
                                    <ActivityIndicator />
                                )}
                            {
                                !loading && isAvailable === true && (
                                    <Check />
                                )
                            }
                            {
                                !loading && isAvailable === false && (
                                    <X />
                                )
                            }
                        </View>
                        <TouchableOpacity disabled={loading} className={`items-center justify-center h-14 rounded-xl pr-3 ${loading ? 'bg-gray-300' : 'bg-blue-400'} ${isFilled ? 'bg-blue-400' : 'bg-gray-300'}`}  >
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