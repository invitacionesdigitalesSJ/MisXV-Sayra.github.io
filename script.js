
/* ==============================
        ELEMENTOS PRINCIPALES
============================== */

const boton = document.getElementById("abrir");
const botonMapa = document.getElementById("abrir-mapa");
const audio = document.getElementById("audio");
const btn = document.getElementById("btnPlay");
const reproductor = document.querySelector(".player");

let invitacionAbierta = false;
let audioReanudable = false;


/* ==============================
        ABRIR INVITACIÓN
============================== */

boton.addEventListener("click", async function() {

    invitacionAbierta = true;

    try {
        await audio.play();
        audioReanudable = true;
        btn.innerHTML = "❚❚";
        reproductor.classList.add("reproduciendo");
    } catch (error) {
        btn.innerHTML = "▶";
        reproductor.classList.remove("reproduciendo");
        console.log("No se pudo iniciar la música:", error);
    }

    reproductor.classList.add("mostrar");

    document.querySelector(".contador").scrollIntoView({
        behavior: "smooth"
    });

    controlarReproductorMovil();
});


/* ==============================
        BOTÓN MAPA
============================== */

botonMapa.addEventListener("click", function(event) {

    event.preventDefault();

    const urlMapa =
        "https://maps.app.goo.gl/5kSbPhgeX4y5h4HVA";

    window.open(
        urlMapa,
        "_blank",
        "noopener,noreferrer"
    );
});


/* ==============================
        CUENTA REGRESIVA
============================== */

const fechaEvento =
    new Date("2026-11-07T21:00:00-03:00").getTime();

function actualizarContador() {

    const hoy = Date.now();

    const diferencia = Math.max(
        0,
        fechaEvento - hoy
    );

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia % (1000 * 60)) / 1000
    );

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

actualizarContador();

setInterval(actualizarContador, 1000);


/* ==============================
        ANIMACIÓN AL SCROLL
============================== */

const secciones = document.querySelectorAll("section");

function mostrarSecciones() {

    secciones.forEach(function(seccion) {

        const posicion =
            seccion.getBoundingClientRect().top;

        if (posicion < window.innerHeight - 120) {
            seccion.classList.add("visible");
        }

    });
}

window.addEventListener("scroll", mostrarSecciones);

mostrarSecciones();


/* ==============================
        REPRODUCTOR DE MÚSICA
============================== */

btn.addEventListener("click", async function() {

    if (audio.paused) {

        try {
            await audio.play();

            audioReanudable = true;

            btn.innerHTML = "❚❚";

            reproductor.classList.add("reproduciendo");

        } catch (error) {
            console.log("Error al reproducir música:", error);
        }

    } else {

        audio.pause();

        audioReanudable = false;

        btn.innerHTML = "▶";

        reproductor.classList.remove("reproduciendo");
    }
});


/* ==============================
    PAUSAR MÚSICA EN SEGUNDO PLANO
============================== */

function pausarAudioPorBackground() {

    if (!audioReanudable) return;

    if (!audio.paused) {

        audio.pause();

        btn.innerHTML = "▶";

        reproductor.classList.remove("reproduciendo");
    }
}

async function reanudarAudioSiCorresponde() {

    if (!audioReanudable) return;

    if (
        document.visibilityState === "visible" &&
        audio.paused &&
        invitacionAbierta
    ) {

        try {
            await audio.play();

            btn.innerHTML = "❚❚";

            reproductor.classList.add("reproduciendo");

        } catch (error) {
            console.log(
                "El navegador no permitió reanudar la música.",
                error
            );
        }
    }
}

document.addEventListener("visibilitychange", function() {

    if (document.visibilityState === "hidden") {
        pausarAudioPorBackground();
    } else {
        reanudarAudioSiCorresponde();
    }
});

window.addEventListener("blur", pausarAudioPorBackground);
window.addEventListener("focus", reanudarAudioSiCorresponde);


/* ==============================
        COPIAR ALIAS
============================== */

const copiarAlias = document.getElementById("copiarAlias");
const alias = document.getElementById("alias");
const mensajeCopia = document.getElementById("mensajeCopia");

copiarAlias.addEventListener("click", async function() {

    try {

        await navigator.clipboard.writeText(
            alias.innerText
        );

        mensajeCopia.textContent = "Alias copiado ✓";

    } catch (error) {

        mensajeCopia.textContent =
            "No se pudo copiar. Podés seleccionar el alias.";

        console.log(error);
    }
});


/* ==============================
        DESTELLOS
============================== */

const contenedorDestellos =
    document.querySelector(".destellos");

function crearDestello() {

    if (!contenedorDestellos) return;

    const destello = document.createElement("span");

    destello.classList.add("destello");

    destello.style.left = Math.random() * 100 + "%";
    destello.style.top = Math.random() * 100 + "%";

    const tamaño = Math.random() * 4 + 3;

    destello.style.width = tamaño + "px";
    destello.style.height = tamaño + "px";

    contenedorDestellos.appendChild(destello);

    setTimeout(function() {
        destello.remove();
    }, 2500);
}

setInterval(crearDestello, 600);


/* ==============================
   OCULTAR REPRODUCTOR EN CELULAR
============================== */

const seccionRegalo =
    document.getElementById("seccionRegalo");

function controlarReproductorMovil() {

    if (!invitacionAbierta) {

        reproductor.classList.remove("mostrar");
        return;
    }

    if (window.innerWidth < 768) {

        const posicion =
            seccionRegalo.getBoundingClientRect().top;

        if (posicion <= window.innerHeight * 0.7) {

            reproductor.classList.remove("mostrar");

        } else {

            reproductor.classList.add("mostrar");
        }

    } else {

        reproductor.classList.add("mostrar");
    }
}

window.addEventListener(
    "scroll",
    controlarReproductorMovil
);

window.addEventListener(
    "resize",
    controlarReproductorMovil
);


/* ======================================
   ALTURA AUTOMÁTICA DEL FORMULARIO SAYRA
====================================== */

window.addEventListener("message", function(event) {

    const iframe =
        document.getElementById("iframeRecuerdos");

    if (!iframe) return;

    if (
        !event.data ||
        event.data.tipo !== "sayra-formulario-altura"
    ) {
        return;
    }

    console.log(
        "Mensaje de altura recibido:",
        event.origin,
        event.data
    );

    const origenValido =
        event.origin === "https://script.google.com" ||
        (
            event.origin.startsWith("https://") &&
            event.origin.endsWith(".googleusercontent.com")
        );

    if (!origenValido) {
        console.log("Origen no permitido");
        return;
    }

    if (event.source !== iframe.contentWindow) {
        console.log(
            "El mensaje proviene de un marco diferente."
        );
        return;
    }

    const altura = Number(event.data.alto);

    if (
        Number.isFinite(altura) &&
        altura >= 200 &&
        altura <= 2000
    ) {

        iframe.style.height = altura + "px";

        console.log(
            "Nueva altura aplicada:",
            altura
        );
    }
});


/* ==============================
        INICIALIZACIÓN
============================== */

controlarReproductorMovil();
