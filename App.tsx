import React from 'react';
import CollectionScreen from './screens/CollectionScreen';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // 1. Importar

export default function App() {
    return (
        <SafeAreaProvider>
            <CollectionScreen />
            <StatusBar barStyle="dark-content" />
        </SafeAreaProvider>
    );
}