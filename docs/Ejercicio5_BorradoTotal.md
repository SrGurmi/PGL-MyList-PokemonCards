# 🚨 Ejercicio 5 – Botón de borrado total

### 💣 Lógica de borrado total
```tsx
const handleClearAll = () => {
  setCards([]);
};
```

### 🔘 Renderizado condicional
```tsx
<TouchableOpacity
  style={[styles.clearButton, cards.length === 0 && { opacity: 0.5 }]}
  onPress={handleClearAll}
  disabled={cards.length === 0}
>
  <Text style={styles.clearButtonText}>Borrar todo</Text>
</TouchableOpacity>
```
