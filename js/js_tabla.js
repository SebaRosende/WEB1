"use strict"
let url = 'https://60c28023917002001739d1aa.mockapi.io/api/web1/equipo';

document.addEventListener("DOMContentLoaded", obtenerEquipoUsuario);

let tabla = document.getElementById("tabla");

document.querySelector("#btn-agregar").addEventListener("click", function (e) {
    agregar(1)
});
document.querySelector("#btn-agregarTres").addEventListener("click", function (e) {
    agregar(3)
});

document.querySelector("#btn-filtrar").addEventListener("click", filtrar);

document.querySelector("#btn-actualizar").addEventListener("click", actualizar);



async function filtrar() {
    try {
        let res = await fetch(url);
        let objetojson = await res.json();
        imprimirCabecera();
         let mem_temp = mem_ram.value

        for (let dato of objetojson) {
            if (parseInt(dato.memoria) <= mem_temp) {
               imprimirFila(dato);
             }

        }

    } catch (error) {
        console.log(error);
    }


}



document.getElementById('btn-login').addEventListener("click", function () {
    mostrar_login(1)
})
document.getElementById('btn-logout').addEventListener("click", function () {
    mostrar_login(0)
})

function mostrar_login(p) {
    document.querySelector(".tabla_admin").classList.toggle('show');
    if (p == 1) {
        document.querySelector(".logout").classList.add('show');
        document.querySelector(".login").classList.add('ocultar');
        obtenerEquipos();
    } else {
        document.querySelector(".login").classList.remove('ocultar');
        document.querySelector(".logout").classList.remove('show');
        obtenerEquipoUsuario();
    }
}



let juego = document.getElementById("input_juego");
let mem_ram = document.getElementById("input_ram");
let cpu = document.getElementById("input_cpu");
let gpu = document.getElementById("input_gpu");


async function obtenerEquipos() {
    juego.value = "";
    mem_ram.value = "0";
    cpu.value = "";
    gpu.value = "";
    tabla.innerHTML = "";
    try {
        let res = await fetch(url);
        let objetojson = await res.json();
        imprimirCabecera();
         for (let dato of objetojson) {
            imprimirFila(dato)
         }


    } catch (error) {
        console.log(error);
    }


}

function actualizar() {
    obtenerEquipos()
}

function activarBotonEliminar(clase) {
    let botones = document.querySelectorAll(clase)
    for (let boton of botones) {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            borrarItem(e.target.dataset.id);
        })

    }
}

function activarBotonEditar(clase) {
    let botones = document.querySelectorAll(clase)
    for (let boton of botones) {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            editarItem(e.target.dataset.id);
        })
    }
}



async function obtenerEquipoUsuario() {
    juego.value = "";
    mem_ram.value = "0";
    cpu.value = "";
    gpu.value = "";
    tabla.innerHTML = "";
    try {
        let res = await fetch(url);
        let objetojson = await res.json();
        tabla.innerHTML = "<tr><th> Juego  </th><th>  Memoria  </th><th> Procesador </th><th> Tarjeta Grafica</th></tr>";
        for (let dato of objetojson) {
            tabla.innerHTML += "<tr><td>" + dato.juego + "</td><td>" + dato.memoria + "</td><td>" + dato.cpu + "</td><td>" + dato.gpu + "</td></tr>";
        }


    } catch (error) {
        console.log(error);
    }
}



async function agregar(i) {
    let equipo = {
        "juego": juego.value,
        "memoria": mem_ram.value,
        "cpu": cpu.value,
        "gpu": gpu.value,
    }

    for (let j = 0; j < i; j++) {
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(equipo)
            });

            if (res.status == 201) {
                console.log("Creado!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    obtenerEquipos()

}

async function editarItem(id) {
   let equipo = {
        "juego": juego.value,
        "memoria": mem_ram.value,
        "cpu": cpu.value,
        "gpu": gpu.value,
    }
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(equipo)
        });

        if (res.status == 200) {
            console.log("Modificado!");
        }
    }
    catch (error) {
        console.log(error);
    }
    obtenerEquipos()

}


async function borrarItem(id) {
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE",
        });

        if (res.status == 201) {
            console.log("BORRADO");

        }
    }
    catch (error) {
        console.log(error);
    }
    obtenerEquipos();
}

let select = document.querySelector("#select-procesador")
select.addEventListener("change", filtrarProcesador);

async function filtrarProcesador() {
    let cpu = select.value;
    tabla.innerHTML = "";
    try {
        let res = await fetch(url);
        let objetojson = await res.json();
        imprimirCabecera();
        for (let dato of objetojson) {
            let cpu_temp = dato.cpu.toLowerCase()
            if (cpu_temp.includes(cpu)) {
                imprimirFila(dato);
                            }

        }


    } catch (error) {
        console.log(error);
    }


}

function imprimirFila(dato){
tabla.innerHTML += "<tr><td>" + dato.juego + "</td><td>" +    dato.memoria + "</td><td>" + dato.cpu + "</td><td>" + dato.gpu +
    `</td><td><button data-id=${dato.id} class='btn-editar'>Editar</button>
</td><td><button data-id=${dato.id} class='btn-eliminar'>Eliminar</button></td></tr>`;

activarBotonEditar('.btn-editar');
activarBotonEliminar('.btn-eliminar');

}

function  imprimirCabecera() {
    tabla.innerHTML = "<tr><th> Juego  </th><th>  Memoria  </th><th> Procesador </th><th> Tarjeta Grafica</th><th>Editar</th><th>Eliminar</th></tr>";

}