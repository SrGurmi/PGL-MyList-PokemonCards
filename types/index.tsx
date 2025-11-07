
export interface PokemonCard {
    id: string;
    name: string;
    price: number;
    category: string;
    marked: boolean;
}


export interface Stats {
    totalCount: number;
    markedCount: number;
    markedTotalPrice: string; // Es string por el .toFixed(2)
}