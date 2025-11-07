# 🗑️ Ejercicio 3 – Borrado y Marcado

## 🗑️ 1️⃣ Borrado Individual – `deleteCard()`

Se utiliza `Array.prototype.filter()` para crear una nueva lista sin el elemento cuyo `id` coincida. De esta forma, no se modifica el estado original, sino que se devuelve un nuevo array.

📄 **Código:**
```tsx
const deleteCard = (id: string) => {
  setCards(prev => prev.filter(card => card.id !== id));
};
```

💡 **Concepto clave:**
Devuelve un nuevo array que incluye solo las cartas que no tienen el `id` indicado.

---

## ✅ 2️⃣ Marcado/Desmarcado – `toggleMark()`

Para marcar o desmarcar una carta, se usa `Array.prototype.map()`. El método devuelve una nueva lista, y si encuentra una carta con el `id` indicado, invierte su propiedad `marked`.

📄 **Código:**
```tsx
const toggleMark = (id: string) => {
  setCards(prev =>
    prev.map(card =>
      card.id === id ? { ...card, marked: !card.marked } : card
    )
  );
};
```

💡 **Concepto clave:**
Si el `id` coincide, se copia el objeto y se modifica únicamente la propiedad `marked` a su valor opuesto.

---

## 💡 3️⃣ Indicador Visual (JSX)

El estado lógico `item.marked` se traduce a una señal visual mediante renderizado condicional (`&&`). Esto permite mostrar o no un estilo o elemento dependiendo de si la carta está marcada.

📄 **Código (JSX / TypeScript):**
```tsx
<View style={[styles.checkbox, item.marked && styles.checkboxMarked]}>
  {item.marked && <Text style={styles.checkboxCheck}>✓</Text>}
</View>
```

🧠 **Mecanismo:**
El estilo `styles.checkboxMarked` y el símbolo `✓` solo se aplican/muestran si `item.marked` es `true`. Simple, declarativo y muy legible.

---

## 🧩 Resumen Final de Funcionalidades

| 🔧 Función | 📝 Propósito | ⚙️ Método Usado | 🎯 Resultado |
| :--- | :--- | :--- | :--- |
| `deleteCard` | Eliminar carta por ID | `filter()` | Devuelve una nueva lista sin la carta seleccionada. |
| `toggleMark` | Marcar/desmarcar carta | `map()` | Cambia el valor de `marked` en una nueva copia sin mutar el original. |
| JSX visual | Mostrar estado marcado | Render condicional (`&&`) | Aplica estilo y muestra `✓` cuando `marked` es `true`. |

## 🧠 Conclusión

Este ejercicio refuerza conceptos clave de **inmutabilidad** y **renderizado condicional**, pilares fundamentales en React. Al usar métodos como `filter()` y `map()`, evitamos mutar el estado original y mantenemos una estructura de datos limpia, predecible y fácil de depurar.