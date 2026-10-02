/*==============================
        BOTÓN ABRIR
==============================*/

const boton = document.getElementById("abrir");
const botonMapa = document.getElementById("abrir-mapa");
const audio = document.getElementById("audio");
const btn = document.getElementById("btnPlay");
const reproductor = document.querySelector(".player");
let invitacionAbierta = false;
let audioReanudable = false;


/*==============================
        ABRIR INVITACIÓN
==============================*/

boton.addEventListener("click", function(){

    invitacionAbierta = true;

    // Comenzar música
    audio.play();
    audioReanudable = true;

    // Mostrar reproductor
    reproductor.classList.add("mostrar");

    // Activar animaciones del reproductor
    reproductor.classList.add("reproduciendo");

    // Cambiar botón
    btn.innerHTML = "❚❚";

    // Bajar hasta la cuenta regresiva
    document.querySelector(".contador").scrollIntoView({
        behavior: "smooth"
    });

});


/*==============================
        BOTÓN MAPA
==============================*/

botonMapa.addEventListener("click", function(event){

    event.preventDefault();

    const urlMapa = "https://maps.app.goo.gl/5kSbPhgeX4y5h4HVA";

    window.open(urlMapa, "_blank", "noopener,noreferrer");

});


/*==============================
      CUENTA REGRESIVA
==============================*/

const fechaEvento = new Date("November 7, 2026 21:00:00").getTime();

function actualizarContador(){

    const hoy = new Date().getTime();

    const diferencia = fechaEvento - hoy;

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia % (1000 * 60))
        / 1000
    );


    document.getElementById("dias").innerHTML = dias;

    document.getElementById("horas").innerHTML = horas;

    document.getElementById("minutos").innerHTML = minutos;

    document.getElementById("segundos").innerHTML = segundos;

}

setInterval(actualizarContador, 1000);

actualizarContador();


/*==============================
      EFECTO AL HACER SCROLL
==============================*/

const secciones = document.querySelectorAll("section");

function mostrarSecciones(){

    secciones.forEach(function(seccion){

        const posicion =
            seccion.getBoundingClientRect().top;

        if(posicion < window.innerHeight - 120){

            seccion.classList.add("visible");

        }

    });

}

window.addEventListener("scroll", mostrarSecciones);

mostrarSecciones();


/*==============================
        REPRODUCTOR
==============================*/

btn.addEventListener("click", function(){

    if(audio.paused){

        // Reproducir
        audio.play();
        audioReanudable = true;

        // Cambiar icono
        btn.innerHTML = "❚❚";

        // Activar animaciones
        reproductor.classList.add("reproduciendo");

    }else{

        // Pausar
        audio.pause();

        // Cambiar icono
        btn.innerHTML = "▶";

        // Detener animaciones
        reproductor.classList.remove("reproduciendo");

    }

});

function pausarAudioPorBackground() {
    if (!audioReanudable) return;

    if (!audio.paused) {
        audio.pause();
        btn.innerHTML = "▶";
        reproductor.classList.remove("reproduciendo");
    }
}

function reanudarAudioSiCorresponde() {
    if (!audioReanudable) return;

    if (document.visibilityState === "visible" && audio.paused && invitacionAbierta) {
        audio.play();
        btn.innerHTML = "❚❚";
        reproductor.classList.add("reproduciendo");
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
/* ===========================
        COPIAR ALIAS
=========================== */

const copiarAlias = document.getElementById("copiarAlias");
const alias = document.getElementById("alias");
const mensajeCopia = document.getElementById("mensajeCopia");

copiarAlias.addEventListener("click", function(){

    navigator.clipboard.writeText(alias.innerText);

    mensajeCopia.innerHTML = "Alias copiado ✓";

});
/* ===========================
        DESTELLOS
=========================== */

const contenedorDestellos = document.querySelector(".destellos");

function crearDestello() {

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
/*================================
   OCULTAR REPRODUCTOR EN CELULAR
================================*/

const seccionRegalo = document.getElementById("seccionRegalo");

function controlarReproductorMovil() {

    if (!invitacionAbierta) {
        reproductor.classList.remove("mostrar");
        return;
    }

    // Solo funciona en celulares
    if (window.innerWidth < 768) {

        const posicion = seccionRegalo.getBoundingClientRect().top;

        // Cuando llega a la sección del alias
        if (posicion <= window.innerHeight * 0.7) {

            reproductor.classList.remove("mostrar");

        } else {

            reproductor.classList.add("mostrar");

        }
    } else {
        reproductor.classList.add("mostrar");
    }
}

window.addEventListener("scroll", controlarReproductorMovil);
window.addEventListener("resize", controlarReproductorMovil);

controlarReproductorMovil();
