# 🖼️ Ejercicio 1 – Diseño de pantallas

El diseño se realizó con **Excalidraw**, mostrando las siguientes pantallas:

- **Pantalla principal** con listado de cartas Pokémon.
- **Modal de formulario** para añadir nuevas cartas.
- **Sección de estadísticas** (total, marcadas y precio total).

### 📸 Elementos mostrados
- Lista de objetos con nombre, precio, categoría e icono.
- Indicador visual (checkbox verde ✓) para cartas marcadas.
- Botón flotante ➕ para abrir el modal.
- Botón 🗑️ global para eliminar todas las cartas.

### 🧩 Categorías fijas

```tsx
export const CATEGORIES: Record<string, string> = {

    FIRE: 'Fuego',
    WATER: 'Agua',
    GRASS: 'Planta',
    ELECTRIC: 'Eléctrico',
    PSYCHIC: 'Psíquico',
    FAIRY: 'Hada',
    FIGHTING: 'Lucha',
    NORMAL: 'Normal',
    DARKNESS: 'Oscuro',
    DRAGON: 'Dragón',

};

```
### 📸 Boceto creado previamente usando ExcaliDraw
![Dibujo de Excalidraw](/imgs/prueba-excalidraw.png)

