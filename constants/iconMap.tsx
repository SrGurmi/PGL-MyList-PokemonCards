import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { CATEGORIES } from './categories';


const iconPaths = {
    [CATEGORIES.FIRE]: require('../assets/types-tcg/Fire-attack.png'),
    [CATEGORIES.WATER]: require('../assets/types-tcg/Water-attack.png'),
    [CATEGORIES.GRASS]: require('../assets/types-tcg/Grass-attack.png'),
    [CATEGORIES.ELECTRIC]: require('../assets/types-tcg/Lightning-attack.png'),
    [CATEGORIES.PSYCHIC]: require('../assets/types-tcg/Psychic-attack.png'),
    [CATEGORIES.FAIRY]: require('../assets/types-tcg/Fairy-attack.png'),
    [CATEGORIES.FIGHTING]: require('../assets/types-tcg/Fighting-attack.png'),
    [CATEGORIES.NORMAL]: require('../assets/types-tcg/Colorless-attack.png'),
    [CATEGORIES.DARKNESS]: require('../assets/types-tcg/Darkness-attack.png'),
    [CATEGORIES.DRAGON]: require('../assets/types-tcg/Dragon-attack.png'),
};


const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


export const categoryIcons: Record<string, React.ReactElement> = {
    [CATEGORIES.FIRE]: <Image source={iconPaths[CATEGORIES.FIRE]} style={styles.icon} />,
    [CATEGORIES.WATER]: <Image source={iconPaths[CATEGORIES.WATER]} style={styles.icon} />,
    [CATEGORIES.GRASS]: <Image source={iconPaths[CATEGORIES.GRASS]} style={styles.icon} />,
    [CATEGORIES.ELECTRIC]: <Image source={iconPaths[CATEGORIES.ELECTRIC]} style={styles.icon} />,
    [CATEGORIES.PSYCHIC]: <Image source={iconPaths[CATEGORIES.PSYCHIC]} style={styles.icon} />,
    [CATEGORIES.FAIRY]: <Image source={iconPaths[CATEGORIES.FAIRY]} style={styles.icon} />,
    [CATEGORIES.FIGHTING]: <Image source={iconPaths[CATEGORIES.FIGHTING]} style={styles.icon} />,
    [CATEGORIES.NORMAL]: <Image source={iconPaths[CATEGORIES.NORMAL]} style={styles.icon} />,
    [CATEGORIES.DARKNESS]: <Image source={iconPaths[CATEGORIES.DARKNESS]} style={styles.icon} />,
    [CATEGORIES.DRAGON]: <Image source={iconPaths[CATEGORIES.DRAGON]} style={styles.icon} />,
};