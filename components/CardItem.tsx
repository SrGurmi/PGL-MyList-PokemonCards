import React from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { PokemonCard } from '../types';
import { categoryIcons } from '../constants/iconMap';
import { TrashIcon } from './icons';


interface CardItemProps {
    item: PokemonCard;
    onToggleMark: (id: string) => void;
    onDelete: (id: string) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ item, onToggleMark, onDelete }) => (
    <View style={styles.cardItemContainer}>
    <Pressable
        onPress={() => onToggleMark(item.id)}
style={styles.cardInfo}
>
<View style={[styles.checkbox, item.marked && styles.checkboxMarked]}>
{item.marked && <Text style={styles.checkboxCheck}>✓</Text>}
</View>
<View style={styles.cardIcon}>
    {categoryIcons[item.category] || null}
    </View>
    <View style={styles.cardText}>
<Text
    style={[styles.cardName, item.marked && styles.cardNameMarked]}
    numberOfLines={1}
        >
        {item.name}
        </Text>
        <Text style={styles.cardPrice}>
    {item.price.toFixed(2)} €
</Text>
</View>
</Pressable>
<TouchableOpacity
    onPress={() => onDelete(item.id)}
    style={styles.deleteButton}
        >
        <TrashIcon />
        </TouchableOpacity>
        </View>
);

// Estilos específicos de CardItem
    const styles = StyleSheet.create({
        cardItemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            marginVertical: 8,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        cardInfo: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkbox: {
            width: 24,
            height: 24,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: '#1E90FF',
            marginRight: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkboxMarked: {
            backgroundColor: '#1E90FF',
        },
        checkboxCheck: {
            color: '#fff',
            fontWeight: 'bold',
        },
        cardIcon: {
            marginRight: 12,
        },
        cardText: {
            flex: 1,
        },
        cardName: {
            fontSize: 18,
            fontWeight: '600',
            color: '#333',
        },
        cardNameMarked: {
            textDecorationLine: 'line-through',
            color: '#999',
        },
        cardPrice: {
            fontSize: 15,
            color: '#006400',
            marginTop: 4,
        },
        deleteButton: {
            padding: 8,
        },
    });