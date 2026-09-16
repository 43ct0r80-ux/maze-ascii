# maze-ascii
Juego de laberintos retro en JavaScript enfocado en lógica de matrices y manipulación del DOM.
# 🕹️ Maze ASCII — Retro Browser Game

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success)

Juego de laberintos de estilo retro desarrollado íntegramente en el navegador con **Vanilla JavaScript**. El proyecto implementa lógica de matrices bidimensionales, detección de colisiones en tiempo real y manipulación directa del DOM sin depender de librerías ni frameworks externos.

🎮 **[¡Jugar en vivo en itch.io!](https://43ct0r.itch.io/maze-ascii)**

---

## 🚀 Características Principales

- **9 niveles progresivos:** Tableros generados mediante matrices de caracteres ASCII.
- **Temporizador en tiempo real:** Desafío contrarreloj para completar cada laberinto.
- **Estética Terminal:** Diseño inspirado en las consolas retro y retro-gaming.
- **Sin dependencias:** Cero frameworks o librerías pesadas (100% nativo).

---

## 🛠️ Detalles Técnicos y Arquitectura

- **Representación del mapa:** Los niveles están estructurados mediante **matrices (arrays 2D)** donde cada carácter representa un elemento del juego:
  - `#` : Muro / Colisión
  - ` ` : Camino libre
  - `S` : Casilla de salida (Start)
  - `G` : Meta (Goal)
- **Manipulación del DOM:** Actualización dinámica del estado del juego mediante selección y modificación de elementos HTML al detectar eventos de teclado (`keydown`).
- **Control de estado:** Gestor simple de estado para controlar el tiempo restante, el nivel actual y las condiciones de victoria/derrota.

---

## 📦 Estructura del Proyecto

```text
maze-ascii/
├── index.html     # Estructura semántica de la aplicación
├── styles.css     # Estilos retro de la interfaz
├── script.js     # Lógica principal del juego y gestión de matrices
└── icono.svg      # Icono personalizado del proyecto

👤 Autor

Desarrollado por HÉCTOR GDF

    🎮 Itch.io: https://43ct0r.itch.io

    💼 LinkedIn: linkedin.com/in/héctor-gómez-de-figueroa-palomares-3034812a5
