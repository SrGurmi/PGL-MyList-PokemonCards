# 🧮 Ejercicio 4 – Modal y formulario

```tsx
const [modalVisible, setModalVisible] = useState(false);
```

### 🧾 Validación de datos
```tsx
if (!cardName.trim() || !cardPrice.trim() || !cardCategory) {
  setErrorMessage('Por favor, rellena todos los campos.');
  return;
}
```

### 🆕 Añadir nueva carta
```tsx
const handleAddCard = () => {
  const newCard: PokemonCard = {
    id: uuid.v4().toString(),
    name: cardName,
    price: parseFloat(cardPrice),
    category: cardCategory!,
    marked: false,
  };
  setCards([...cards, newCard]);
  setModalVisible(false);
};
```
