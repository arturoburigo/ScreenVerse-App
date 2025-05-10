import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import {styles} from './styles'

interface ButtonProps extends TouchableOpacityProps {
    title: string
    isLoading?: boolean
    icon: keyof typeof Ionicons.glyphMap
    textColor?: string
    iconColor?: string
    backgroundColor?: string
}

export default function Button({ 
    icon, 
    title, 
    isLoading = false, 
    textColor = '#000',
    iconColor = '#000',
    backgroundColor = '#fff',
    ...rest 
}: ButtonProps) {
    return (
        <TouchableOpacity 
            disabled={isLoading} 
            activeOpacity={0.8} 
            {...rest} 
            style={[styles.container, { backgroundColor }]}
        >
            {isLoading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <>
                    <Ionicons style={[styles.icon, { color: iconColor }]} name={icon} />
                    <Text style={[styles.text, { color: textColor }]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    )
}