//Bienvenida
function bienvenidosAMiPag(){
    console.log ('Bienvenidos al draft de la NBA')
}
//Dar la bienvenida al usuario / Funcion
function bienvenidaCliente(nombre) {
    alert ('Bienvenido a nuestra pagina ' + nombre)
}
let bienvenida = document.getElementById('bienvenidaSemantica')
let inputUsuario = document.getElementById('nombreCliente')
bienvenida.onclick = (ev) => {
    bienvenidaCliente(inputUsuario.value)
}

//Funcion sobre jugador favorito 
function jugadorFavorito(){
         let jugadorElegido = prompt('Cual es tu jugador favorito?')
         let equipoElegido = prompt('En que equipo juega')
         const tuJugador = {
            jugador: jugadorElegido,
            equipo: equipoElegido
         }
         console.log(tuJugador)

         localStorage.setItem("tuPlayer", tuJugador)
         let jugadorPreferido = localStorage.getItem("tuPlayer")
         let jugadorPref = JSON.parse(localStorage.getItem(jugadorPreferido))
         console.log(jugadorPref)

         jugadorIngresado (jugadorElegido, equipoElegido)
}
function jugadorIngresado(jugador, equipo){
    console.log('El jugador seleccionado es' + ' ' + jugador + ' y juega en' + ' ' + equipo) 
}

//Funcion sobre equipo ideal
function quintetoIdeal(){
    let base = prompt ('Puesto base, cual es tu preferido?')
    let escolta = prompt('Puesto escolta, cual es tu preferido?')
    let alero = prompt('Puesto alero, cual es tu preferido?')
    let alapivot = prompt('Puesto alapivot, cual es tu preferido?')
    let pivot = prompt('Puesto pivot, cual es tu preferido?')
    const equipoFantasia ={
        base: base,
        escolta: escolta,
        alero: alero,
        alapivot: alapivot,
        pivot: pivot,
    }
    const tuQuinteto = [equipoFantasia]
    console.log(tuQuinteto)
    
    localStorage.setItem("quinteto", JSON.stringify(tuQuinteto))
    let quinteto = localStorage.getItem("equipoIdeal")
    let equipoideal = JSON.parse(localStorage.getItem(quinteto))
    console.log(equipoideal)

    armaTuQuinteto (base, escolta, alero, alapivot, pivot)
}

function armaTuQuinteto (baseEscogido, escoltaEscogido, aleroEscogido, alapivotEscogido, pivotEscogido){
    console.log('Tu quinteto fantasia es, de base:' + baseEscogido + ' de escolta: ' + escoltaEscogido + ' de alero:' + aleroEscogido + ' de alapivot:' + alapivotEscogido + ' y de pivot:' + pivotEscogido)
}

//JSON
localStorage.setItem("miFavorito", JSON.stringify(jugador1))
localStorage.setItem("misJugadores", JSON.stringify (losMejores))

let lideres = JSON.parse(localStorage.getItem("misJugadores"))


