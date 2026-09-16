document.addEventListener("DOMContentLoaded", function() {
    // Definir laberintos usando literales de plantilla

    const startButton = document.getElementById("start-button"); // Obtener el botón de inicio
    const startContainer = document.getElementById("start-container");
    


// Función para iniciar el juego al presionar el botón
startButton.addEventListener("click", function() {
    startButton.style.display = "none";  // Ocultar el botón
    drawMaze();                          // Dibujar el primer laberinto
    startTimer();                        // Iniciar el temporizador
    
});

    const mazes = [
          // Laberinto 1: Simple
    `#######
#S    #
### # #
#   #G#
#######`,

    // Laberinto 2: Más largo
    `#########
#S      #
### ### #
#     ###
# ###  G#
#########`,

    // Laberinto 3: Un poco más complicado
    `###########
#S        #
# ####### #
# #       #
# # #######
# #      G#
###########`,

    // Laberinto 4: Más obstáculos
    `###############
#S     #      #
# ### ##### # #
#   #     #   #
##### ### # ###
#   #   #     #
### ##### ### #
#         #G  #
###############`,

    // Laberinto 5: Camino largo y estrecho
    `#################
#S              #
##### ######### #
#   # #       # #
# # # ### ### ###
# # #     #   # #
# ### ### # ### #
#       # #     #
#  #  # # ##  #G#
#################`,

    // Laberinto 6: Más opciones falsas
    `###################
#S    #     #     #
# ### ### # ##### #
#   #     #   #   #
# # ### ##### ### #
# #   #     # #   #
##### # ##### ### #
#   # #   #       #
# ### ### ####### #
#   #     #       #
# #   # ### #G#   #
###################`,

    // Laberinto 7: Más largo y lleno de callejones sin salida
    `#####################
#S    #   #         #
### ##### ### ##### #
#     #   #   #   # #
# ### # ### ### # # #
# #   # # #     # # #
# # ### # # ##### ###
#   #     #         #
### ##### ### # ### #
#     #   #   #     #
# ### ### ### ### ###
#   #         #     #
############### #####
#G                  #
#####################`,

    // Laberinto 8: Más confuso, muchos giros
    `#######################
#S          #         #
####### ### ######### #
#     #   # #       # #
# ### ### # ### ### # #
# #   #   #   #   # # #
### ### ##### ### ### #
#     #   #     #     #
# ##### # ##### # ### #
#       # #     # #   #
####### ### ### ### ###
#     #     #   #     #
### ### ### ##### ### #
#   #   #         #   #
#      ## # ##  #####G#
#######################`,

    // Laberinto 9: Muy complicado, muchos caminos falsos
    `##########################
#S   #         #         #
### ### ####### ### ######
#     #   #   #     #    #
# ### ##### # ####### ## #
# #       # #   #   #    #
##### ##### ### # ### ## #
#     #   #     #     #  #
# ### # ### ### ### #### # 
#   # #     #            #
##### ##### ######### ####
#   # #       #   #      #
# ### ##### ##### ##### ##
#   #         #     #   G#
##########################`
];

    let currentLevel = 0;
    let playerPosition = { x: 1, y: 1 };  // Posición inicial del jugador (x:1, y:1)
    let timer = 60;
    let timerInterval;
    let gameOver = false;  // Variable para saber si el juego está detenido

    const mazeContainer = document.getElementById("maze-container");
    const timerDisplay = document.getElementById("time");
    const messageDisplay = document.getElementById("message");
    const levelDisplay = document.getElementById("level-display"); //dice en que nivel estas

    // Función para mostrar laberinto
    function drawMaze() {
        levelDisplay.textContent = `Nivel: ${currentLevel + 1}`;  // Actualizar la visualización del nivel

        const mazeArray = mazes[currentLevel].split("\n").map(row => row.split(""));

        // Colocar el jugador ("O") en el laberinto, pero manteniendo "S" visible
        mazeContainer.innerHTML = mazeArray.map((row, rowIndex) => 
            row.map((cell, colIndex) => {
                if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
                    // Mostrar el jugador encima de la celda actual
                    return `<span class="player">O</span>`;
                }
                return `<span class="${getCellClass(cell)}">${cell}</span>`;
            }).join("")
        ).join("<br>");  // Usar <br> para saltos de línea
    }

    function getCellClass(cell) {
        switch (cell) {
            case "S": return "start";
            case "G": return "goal";
            case "#": return "wall";
            case " ": return "path";
            default: return "";
        }
    }

    // Manejar movimiento del jugador
    document.addEventListener("keydown", (e) => {  // Corregido 'keydown'
        if (gameOver) return;  // Si el juego está detenido, no hacer nada
        
        let { x, y } = playerPosition;
        switch (e.key) {
            case "ArrowUp": y--; break;
            case "ArrowDown": y++; break;
            case "ArrowLeft": x--; break;
            case "ArrowRight": x++; break;
            default: return;
        }

        if (isValidMove(x, y)) {  // Pasar coordenadas correctas
            playerPosition = { x, y };
            drawMaze();
            checkWin();
        }
    });

    function isValidMove(x, y) {  // Corregido para recibir los parámetros x, y
        const mazeArray = mazes[currentLevel].split("\n").map(row => row.split(""));
        return mazeArray[y][x] !== "#";  // El jugador solo puede moverse por espacios que no sean muros ("#")
    }

    function checkWin() {
        const mazeArray = mazes[currentLevel].split("\n").map(row => row.split(""));
        if (mazeArray[playerPosition.y][playerPosition.x] === "G") {  // Si el jugador llega a la salida "G"
            clearInterval(timerInterval);
            currentLevel++;
            if (currentLevel < mazes.length) {
                playerPosition = { x: 1, y: 1 };  // Reiniciar la posición del jugador para el próximo nivel
                timer = 60;
                timerDisplay.textContent = timer;  // Actualizar el valor del contador en pantalla
                startTimer();
                drawMaze();
            } else {
                showModal("¡Felicidades! Has completado todos los niveles.");
                gameOver = true;
            }
        }
    }

    // Temporizador
    function startTimer() {
        timerInterval = setInterval(() => {
            timer--;
            timerDisplay.textContent = timer;
            if (timer === 0) {
                clearInterval(timerInterval);
                showModal("¡Tiempo agotado! Inténtalo de nuevo.");
                gameOver = true;  // Marcar el juego como detenido
            }
        }, 1000);
    }
    function showModal(message) {
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modal-message");
        modalMessage.textContent = message; // Cambiar el texto del modal
        modal.style.display = "flex"; // Mostrar el modal
    }
    // Botón para cerrar el modal y reiniciar el juego
document.getElementById("modal-close").addEventListener("click", function() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";  // Ocultar el modal

       // Reiniciar el juego
       gameOver = false;  // Hacer que el juego no esté detenido
       currentLevel = 0;  // Volver al primer nivel
       playerPosition = { x: 1, y: 1 };  // Colocar al jugador en la posición inicial
       timer = 60;  // Restablecer el temporizador
       timerDisplay.textContent = timer;  // Actualizar el temporizador en la pantalla
       drawMaze();  // Dibujar el primer laberinto
       startTimer();  // Reiniciar el temporizador
});

    // Iniciar Juego
    //drawMaze();
    //startTimer();
});
