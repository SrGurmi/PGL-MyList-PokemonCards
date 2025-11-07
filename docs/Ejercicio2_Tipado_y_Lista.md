# 💾 Ejercicio 2 – Tipado del objeto y componente de lista

El tipado principal se define en `types/index.tsx`:

```tsx
export interface PokemonCard {
  id: string;
  name: string;
  price: number;
  category: string;
  marked: boolean;
}
```

### 🧱 Estado y renderizado

```tsx
const [cards, setCards] = useState<PokemonCard[]>([]);
```

```tsx
<FlatList
  data={cards}
  keyExtractor={item => item.id}
  renderItem={({ item }) => (
    <CardItem item={item} onToggleMark={toggleMark} onDelete={deleteCard} />
  )}
/>
```
