"use strict"

let resultado = document.querySelector('#id-captcha');
let status = document.querySelector('#status');
let nombre = document.querySelector('#nombre');
let telefono = document.querySelector('#telefono');
let email = document.querySelector('#email');
let textarea = document.querySelector('#textarea');
let newsletter = document.querySelector('#newsletter');

let boton = document.querySelector('#btn-enviar');
boton.addEventListener("click", validar);

function validar() {
    let valor = resultado.value;

    if (valor != 6) {
        resultado.value = "";
        status.innerHTML = "Error en la suma";
    }
    else {
        resultado.value = "";
        nombre.value = "";
        telefono.value = "";
        email.value = "";
        textarea.value = "";
        newsletter.checked = "false";
        status.innerHTML = "Enviado";
    }
}
