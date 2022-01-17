"use strict"


url="https://60c28023917002001739d1aa.mockapi.io/api/web1/equipo"


let juego = document.getElementById("input_juego").value;
let mem_ram = document.getElementById("input_ram").value;
let cpu = document.getElementById("input_cpu").value;
let gpu = document.getElementById("input_gpu").value;

document.querySelector("#btn-agregar").addEventListener("click", agregarEquipos);

let tabla = document.getElementById("tabla");

let equipo=[];

document.getElementById('login').addEventListener("click", function (e) {
    document.getElementById('tabla_admin').classList.toggle('show');
})


async function agregarEquipos() {
  
    equipo = {
        "juego": juego,
        "memoria":mem_ram,
        "cpu":cpu,
        "gpu": gpu,
      
    }

    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(equipo)
        });

        if (res.ok) {    //(res.status == 201)
            console.log("Creado!");
                }
    }
    catch (error) {
        console.log(error);
    }
   

}