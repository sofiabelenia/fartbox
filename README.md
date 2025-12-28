# 🎮 Game Central

Una colección de juegos interactivos y divertidos, todos accesibles desde un menú unificado.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5178](http://localhost:5178) en tu navegador.

## 🌐 Jugar Online

**Juega ahora en:** https://sofiabelenia.github.io/fartbox/

Los juegos están desplegados automáticamente en GitHub Pages.

## 🎯 Juegos Disponibles

### Juegos React (Interactivos)

#### 🐱 Gato Travieso
Controla un gato travieso que rasguña el sofá. ¡Cuidado con las luces!
- **Tecnología**: React + Canvas
- **Controles**: ESPACIO (teclado) o botón táctil
- **Objetivo**: Destruye el sofá sin ser atrapado por la luz

#### 🐶 La Cena del Perrito
Encuentra la comida correcta para alimentar al perrito hambriento.
- **Tecnología**: React + Tailwind CSS
- **Controles**: Click/Touch en las cajas
- **Objetivo**: Encuentra toda la comida sin tocar el veneno
- **Niveles**: 5 niveles con dificultad progresiva

#### 💎 Robo Perfecto
Memoriza los objetos robados y recupéralos sin ser atrapado.
- **Tecnología**: React + Tailwind CSS + Lucide Icons
- **Controles**: Click/Touch para memorizar y seleccionar
- **Objetivo**: Memoriza los objetos y recupéralos correctamente
- **Desafío**: Juego de memoria con presión de tiempo

### Juegos HTML5 (Clásicos)

#### 🚀 Propulsor de la Abuela
¡Ayuda a la abuela a despegar con su cohete navideño!
- **Tecnología**: HTML5 + Canvas
- **Controles**: Toca/click rápido
- **Objetivo**: Carga el propulsor antes de que se acabe el tiempo

#### 🚀 Cohete a Gas
Controla un cohete evitando peligrosos obstáculos gaseosos.
- **Tecnología**: HTML5 + Canvas
- **Controles**: Click/Touch
- **Objetivo**: Sobrevive el mayor tiempo posible

#### 🍪 Galletas Explosivas
Una niña debe atrapar galletas antes de que exploten.
- **Tecnología**: HTML5 + JavaScript
- **Controles**: Mouse/Touch para mover
- **Objetivo**: Atrapa todas las galletas sin que exploten

#### 🎅 Santa Claus Saltarín
Santa salta entre edificios navideños en la ciudad.
- **Tecnología**: HTML5 + Canvas
- **Controles**: Click/Touch para saltar
- **Objetivo**: Salta entre edificios sin caer

#### 💨 Fart Box 3x3
Soundboard interactivo con efectos de sonido divertidos.
- **Tecnología**: HTML5 + Tailwind CSS
- **Controles**: Click/Touch en los botones
- **Objetivo**: Crea combinaciones épicas de sonidos

#### 🎲 Navidad Battle
Santa vs Grinch en una batalla de dados 1v1.
- **Tecnología**: HTML5 + Tailwind CSS + Animate.css
- **Controles**: ESPACIO o Click para detener dados
- **Objetivo**: Reduce la "dignidad" del oponente a 0
- **Mecánica**: Tira dados alternadamente, el dado más alto gana la ronda

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos y diseño
- **HTML5 Canvas** - Renderizado de juegos
- **JavaScript ES6+** - Lógica de juegos

## 📁 Estructura del Proyecto

```
game-central/
├── src/
│   ├── App.jsx              # Componente principal
│   ├── components/
│   │   └── GameMenu.jsx     # Menú de selección
│   └── games/
│       └── GatoLuz.jsx      # Juego del gato (React)
├── public/
│   ├── *.html               # Juegos HTML standalone
│   ├── game-wrapper.js      # Script de navegación
│   └── assets/              # Imágenes, videos, sonidos
├── index.html               # HTML principal
├── main.jsx                 # Entry point de React
└── vite.config.js           # Configuración de Vite
```

## 🎨 Características

- ✨ Menú principal con diseño moderno
- 🎯 9 juegos únicos y divertidos (3 React + 6 HTML5)
- 📱 Diseño responsive (móvil y desktop)
- 🔄 Navegación fluida entre juegos
- 🎵 Efectos de sonido integrados
- 🌈 Animaciones y efectos visuales
- 🎮 Mezcla de juegos React interactivos y clásicos HTML5
- 🎲 Incluye juegos de acción, puzzle, memoria y más

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 📦 Despliegue

### GitHub Pages (Automático)

El proyecto se despliega automáticamente en GitHub Pages cuando haces push a la rama `main`. El workflow de GitHub Actions:
1. Instala las dependencias
2. Construye el proyecto
3. Despliega a GitHub Pages

**URL del sitio:** https://sofiabelenia.github.io/fartbox/

### Despliegue Manual

Para construir el proyecto localmente:

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `dist/`.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de:
- Reportar bugs
- Sugerir nuevos juegos
- Mejorar juegos existentes
- Optimizar código

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

🤖 Generado con [Claude Code](https://claude.com/claude-code)
