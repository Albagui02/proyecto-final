// Array de preguntas y respuestas
const preguntas = [
    { pregunta: "¿De qué color es el caballo blanco de Santiago?", respuesta: "blanco" },
    { pregunta: "¿Cuando el río suena...?", respuesta: "agua lleva" },
    { pregunta: "¿Qué tengo aquí colgado?", respuesta: "abogado" }   
];

// Índice de la pregunta actual en el array
let preguntaActualIndex = 0;

// Tiempo restante para responder cada pregunta
let tiempoRestante = 15;

// Variable para el temporizador
let temporizador;

// Función para iniciar el juego
function comenzarJuego() {
    // Obtener el nombre del jugador desde el formulario
    const nombre = document.getElementById('nombre').value;

    // Verificar si se ingresó un nombre
    if (nombre.trim() !== "") {
        // Mostrar un mensaje de buena suerte y comenzar el juego
        mostrarVentanaSuerte(nombre);
        document.getElementById('game-container').style.display = 'block';
        mostrarPregunta();
    } else {
        // Mostrar una alerta si no se ingresó un nombre
        alert('Por favor, ingresa tu nombre para comenzar el juego.');
    }
    return false; // Evitar que el formulario recargue la página
}

// Función para mostrar un mensaje de buena suerte al jugador
function mostrarVentanaSuerte(nombre) {
    alert(`¡Buena suerte, ${nombre}! ¡Que te diviertas y aciertes todas las preguntas!`);
}

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    // Obtener la pregunta actual del array
    const preguntaActual = preguntas[preguntaActualIndex];

    // Verificar si hay más preguntas
    if (preguntaActual) {
        // Mostrar la pregunta y configurar el temporizador
        document.getElementById('question').innerText = preguntaActual.pregunta;
        document.getElementById('answer-input').value = ''; // Limpiar el campo de respuesta
        iniciarTemporizador();
    } else {
        // Si no hay más preguntas, finalizar el juego
        finalizarJuego();
    }
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
    tiempoRestante = 15;
    actualizarTemporizador();
    
    // Configurar el temporizador para contar hacia abajo
    temporizador = setInterval(() => {
        tiempoRestante--;
        actualizarTemporizador();
        
        // Mostrar un mensaje si el tiempo se agota
        if (tiempoRestante <= 0) {
            alert('¡🚂Se te fue el tren🚂!');
            pasarAProximaPregunta();
        }
    }, 1000);
}

// Función para actualizar el temporizador en la interfaz
function actualizarTemporizador() {
    document.getElementById('timer').innerText = `Tiempo restante: ${tiempoRestante} segundos`;
}

// Función para verificar la respuesta del jugador
function submitAnswer() {
    // Obtener la respuesta del jugador y la respuesta correcta de la pregunta actual
    const respuestaUsuario = document.getElementById('answer-input').value.toLowerCase();
    const respuestaCorrecta = preguntas[preguntaActualIndex].respuesta.toLowerCase();

    // Mostrar mensajes según si la respuesta es correcta o incorrecta
    if (respuestaUsuario === respuestaCorrecta) {
        alert('¡OLEEEE!');
    } else {
        alert('😔😔Pal lobby, vuelve a probar😔😔!');
    }
    
    // Pasar a la próxima pregunta
    pasarAProximaPregunta();
}

// Función para pasar a la próxima pregunta
function pasarAProximaPregunta() {
    // Limpiar el temporizador y avanzar al siguiente índice de pregunta
    clearInterval(temporizador);
    preguntaActualIndex++;
    
    // Mostrar la siguiente pregunta
    mostrarPregunta();
}

// Función para finalizar el juego
function finalizarJuego() {
    // Mostrar un mensaje de felicitaciones y preguntar si el jugador quiere jugar de nuevo
    const reiniciar = confirm('¡Felicidades! Has completado todas las preguntas.\n¿Quieres jugar de nuevo?');
    if (reiniciar) {
        // Reiniciar el juego si el jugador lo desea
        reiniciarJuego();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciar el índice de pregunta y mostrar la primera pregunta
    preguntaActualIndex = 0;
    mostrarPregunta();
}