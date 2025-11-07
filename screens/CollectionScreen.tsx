import React, { useState, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    TextInput,
    TouchableOpacity,
    Pressable,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import { PokemonCard, Stats } from '../types';
import { CardItem } from '../components/CardItem';
import { CATEGORIES } from '../constants/categories';
import { categoryIcons } from '../constants/iconMap';

export default function CollectionScreen() {
    // --- Estados ---
    const [cards, setCards] = useState<PokemonCard[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    // --- Estados del Formulario ---
    const [cardName, setCardName] = useState<string>('');
    const [cardPrice, setCardPrice] = useState<string>('');
    const [cardCategory, setCardCategory] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // --- Lógica de Negocio ---
    const stats: Stats = useMemo(() => {
        const totalCount = cards.length;
        const markedCount = cards.filter(card => card.marked).length;
        const markedTotalPrice = cards
            .filter(card => card.marked)
            .reduce((sum, card) => sum + card.price, 0);

        return {
            totalCount,
            markedCount,
            markedTotalPrice: markedTotalPrice.toFixed(2),
        };
    }, [cards]);

    const handleAddCard = () => {

        Keyboard.dismiss();

        if (!cardName.trim() || !cardPrice.trim() || !cardCategory) {
            setErrorMessage('Por favor, rellena todos los campos.');
            return;
        }
        const price = parseFloat(cardPrice);
        if (isNaN(price) || price < 0) {
            setErrorMessage('Por favor, introduce un precio válido.');
            return;
        }

        const newCard: PokemonCard = {
            id: uuid.v4() as string,
            name: cardName.trim(),
            price: price,
            category: cardCategory,
            marked: false,
        };

        setCards([newCard, ...cards]);
        resetFormAndCloseModal();
    };

    const handleToggleMark = (id: string) => {
        setCards(currentCards =>
            currentCards.map(card =>
                card.id === id ? { ...card, marked: !card.marked } : card
            )
        );
    };

    const handleDeleteCard = (id: string) => {
        setCards(currentCards =>
            currentCards.filter(card => card.id !== id)
        );
    };

    const handleClearAll = () => {
        setCards([]);
    };

    const resetFormAndCloseModal = () => {
        // Forzar cierre de teclado también al cancelar
        Keyboard.dismiss();
        setCardName('');
        setCardPrice('');
        setCardCategory(null);
        setErrorMessage('');
        setModalVisible(false);
    };

    const renderCardItem = ({ item }: { item: PokemonCard }) => (
        <CardItem
            item={item}
            onToggleMark={handleToggleMark}
            onDelete={handleDeleteCard}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* --- Cabecera --- */}
            <View style={styles.header}>
                <Text style={styles.title}>Mi Colección Pokémon</Text>
                <View style={styles.statsContainer}>
                    <Text style={styles.statText}>Total: {stats.totalCount}</Text>
                    <Text style={styles.statText}>Obtenidas: {stats.markedCount}</Text>
                    <Text style={styles.statText}>Valor: {stats.markedTotalPrice} €</Text>
                </View>
            </View>

            {/* --- Botón Borrar Todo --- */}
            <TouchableOpacity
                style={[
                    styles.clearAllButton,
                    stats.totalCount === 0 && styles.clearAllButtonDisabled
                ]}
                onPress={handleClearAll}
                disabled={stats.totalCount === 0}
            >
                <Text style={styles.clearAllButtonText}>Borrar Todo</Text>
            </TouchableOpacity>

            {/* --- Lista --- */}
            <FlatList
                data={cards}
                renderItem={renderCardItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Text style={styles.emptyListText}>No tienes cartas.</Text>
                        <Text style={styles.emptyListText}>¡Pulsa "+" para añadir!</Text>
                    </View>
                }
            />

            {/* --- Botón FAB --- */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* --- Modal --- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={resetFormAndCloseModal}
            >

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >

                    <Pressable style={styles.modalBackdrop} onPress={Keyboard.dismiss} />

                    <View style={styles.modalContent}>

                        <ScrollView contentContainerStyle={styles.modalScrollView}>
                            <Text style={styles.modalTitle}>Añadir Nueva Carta</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Nombre (Ej: Charizard VMAX)"
                                placeholderTextColor="#999"
                                value={cardName}
                                onChangeText={setCardName}
                                returnKeyType="next"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Precio (Ej: 120.50)"
                                placeholderTextColor="#999"
                                value={cardPrice}
                                onChangeText={setCardPrice}
                                keyboardType="numeric"
                                returnKeyType="done"
                            />

                            <Text style={styles.categoryLabel}>Categoría:</Text>
                            <View style={styles.categorySelector}>
                                {Object.values(CATEGORIES).map(category => (
                                    <Pressable
                                        key={category}
                                        style={[
                                            styles.categoryChip,
                                            cardCategory === category && styles.categoryChipSelected
                                        ]}
                                        onPress={() => setCardCategory(category)}
                                    >
                                        {categoryIcons[category]}
                                        <Text
                                            style={[
                                                styles.categoryChipText,
                                                cardCategory === category && styles.categoryChipTextSelected
                                            ]}
                                        >
                                            {category}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>

                            {errorMessage ? (
                                <Text style={styles.errorMessage}>{errorMessage}</Text>
                            ) : null}

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonCancel]}
                                    onPress={resetFormAndCloseModal}
                                >
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonSave]}
                                    onPress={handleAddCard}
                                >
                                    <Text style={styles.modalButtonText}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    header: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A237E',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 16,
    },
    statText: {
        fontSize: 16,
        color: '#444',
    },
    clearAllButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 16,
        alignItems: 'center',
    },
    clearAllButtonDisabled: {
        backgroundColor: '#d1d1d1',
        opacity: 0.7,
    },
    clearAllButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    emptyListContainer: {
        marginTop: 60,
        alignItems: 'center',
    },
    emptyListText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        fontSize: 30,
        color: '#1A237E',
        lineHeight: 30,
        paddingBottom: 2,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%', // Limitar la altura máxima del modal
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    // Estilo para el contenido del ScrollView
    modalScrollView: {
        paddingBottom: 16, // Padding extra al final del scroll
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A237E',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#f9f9f8',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
    },
    categoryLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    categorySelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 16,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        margin: 4,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    categoryChipSelected: {
        borderColor: '#1E90FF',
        backgroundColor: '#e6f0ff',
    },
    categoryChipText: {
        fontSize: 14,
        marginLeft: 6,
        color: '#333',
    },
    categoryChipTextSelected: {
        fontWeight: 'bold',
        color: '#1E90FF',
    },
    errorMessage: {
        color: '#FF6347',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 6,
    },
    modalButtonCancel: {
        backgroundColor: '#999',
    },
    modalButtonSave: {
        backgroundColor: '#1E90FF',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
