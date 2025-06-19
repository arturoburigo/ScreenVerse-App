import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { styles } from './styles';

export type CardType = 'vertical' | 'horizontal';

interface CardProps {
  image: any;
  title: string;
  type?: CardType;
  onPress?: () => void;
}

export default function Card({ image, title, type = 'horizontal', onPress }: CardProps) {
  return (
    <TouchableOpacity style={[styles.container, styles[type]]} onPress={onPress} activeOpacity={0.8}>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );
} 