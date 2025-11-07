import React from 'react';
import { Svg, Path, Circle, G } from 'react-native-svg';


export const TrashIcon: React.FC = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 6h18" />
        <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <Path d="M10 11v6" />
        <Path d="M14 11v6" />
    </Svg>
);