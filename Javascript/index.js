// Luxon
const DateTime = luxon.DateTime
const dia = DateTime.now()
let fecha = document.getElementById("diaFecha")
let fechaDelDia = dia.toLocaleString(DateTime.DATE_FULL)
fecha.innerHTML= `<h6>Fecha y Hora: </h6> ${fechaDelDia}`
//HORA
setInterval(()=>{
    let hora = DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS)
    let horaDelDia = document.getElementById("hora")
    horaDelDia.innerHTML= `${hora}`
}, 1000)

//DOM
class masVotados {
    constructor (id, jugador, votos, equipo, imagen){
        this.id = id,
        this.jugador = jugador,
        this.votos = votos,
        this.equipo = equipo,
        this.imagen = imagen
    }
    losPreferidosSon() {
        console.log(this.id, 'Los jugadores mas votados son: ' + this.jugador + 'con ' + this.votos + ' de votos y juega en: ' + this.equipo)
    }
}
const jugador1 = new masVotados(1, 'LeBron James', '6.5mill', 'Los Angeles LAkers', 'lebron-mvp.jpg')
const jugador2 = new masVotados(2, 'Giannis Antetokounmpo', '5.9mill', 'Milweake Bucks', 'giannis-mvp.jpeg')
const jugador3 = new masVotados(3, 'Kevin Durant', '5.8mill', 'Brooklyn Nets', 'kevin-mvp.jpg')
const jugador4 = new masVotados(4, 'Stephen Curry', '5.1mill', 'Golden State Warriors', 'steph-mvp.jpg')
const jugador5 = new masVotados(5, 'Luka Doncic', '4.9mill', 'Dallas Mavericks', 'luka-mvp.jpg')
const losMejores = [jugador1, jugador2, jugador3, jugador4, jugador5]

let botonElegirJugador = document.getElementById('elegirJugadorBtn')
botonElegirJugador.addEventListener("click", () =>{
    (elegirJugador(losMejores))
} 
)

// Funcion sobre jugador favorito
function elegirJugador (array) {
    let formJugadorFavorito = document.getElementById("formJugadorFavorito")
    let inputJugador = document.getElementById('inputJugador')
    let inputEquipo = document.getElementById('inputEquipo')

    let losMejores = new masVotados(6, inputJugador.value, '5.4mill', inputEquipo.value, 'jugadorNuevo.png')
    console.log(losMejores)
    array.push(losMejores)
    console.log(array)
    //storage
    localStorage.setItem("masVotados", JSON.stringify(array))
    mostrarLosMejores(array)

    formJugadorFavorito.reset()

    Toastify({
        text: `incorporaste un nuevo jugador ${losMejores.jugador}`,
        duration: 3000,
        gravity: "top", 
        position: "right", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #3e92cc, #fffaff, #d8315b)",
          color: "black"
        },
      }).showToast();
}

//Funcion sobre jugadores, cards y mostrar los mejores
let mejoresMvp = document.getElementById('losMejores')
function mostrarLosMejores (array) {
    mejoresMvp.innerHTML = 
    ''
    for (let jugador of array){
        let losMejoresDiv = document.createElement('div')
        losMejoresDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-3')
        losMejoresDiv.innerHTML = `
        <div id="${jugador.jugador}" class="card" style="width: 18rem;">
                <img class="card-img-top" style="height: 200px;" src="images/${jugador.imagen}" alt="${jugador.jugador} de ${jugador.conferencia}">
                <div class="card-body">
                    <h5 class="card-text modoOscuro text-center">${jugador.jugador}</h5>
                    <p classs="card-text modoOscuro text-center">Equipo: ${jugador.equipo}</p>
                    <button id="btnVotar ${jugador.id}" class="btn btn-outline-info text-center">Votalo</button>
                </div>
            </div>
        </div>
        `
        mejoresMvp.appendChild(losMejoresDiv)

        let botonVotar = document.getElementById(`btnVotar ${jugador.id}`)
        botonVotar.addEventListener("click", ()=> {
            votosFavoritos(jugador)
        })
    }   
}

let tusVotos
    if(localStorage.getItem("votaciones")){
    tusVotos = JSON.parse(localStorage.getItem("votaciones"))
    }else{
    tusVotos = []
    localStorage.setItem("votaciones", tusVotos)
    }

function votosJugadores(array){
    modalVotos.innerHTML = ""
    array.forEach((tusVotos) => {
        modalVotos.innerHTML +=
        `
            <div id="${tusVotos.id}" class="card" style="width: 18rem;">
                <p>Has sumado un voto para:<p>
                <img class="card-img-top" style="height: 200px;" src="images/${tusVotos.imagen}" alt="${tusVotos.jugador} de ${tusVotos.conferencia}">
                <div class="card-body">
                    <h5 class="card-text modoOscuro text-center">${tusVotos.jugador}</h5>
                    <p classs="card-text modoOscuro text-center">Equipo: ${tusVotos.equipo}</p>
                    <button class="btn btn-danger" id="btnEliminar${tusVotos.id}"><i class="bi bi-trash3"></i></button>
                </div>
            </div>
            `
        })
        array.forEach((tusVotos)=>
        document.getElementById(`btnEliminar${tusVotos.id}`).addEventListener("click", ()=> {
            console.log(`Voto eliminado: ${tusVotos.jugador}`)

            let cardJugador = document.getElementById(`${tusVotos.id}`)
            cardJugador.remove()

            let eliminarVoto = array.find((jugador) => jugador.id == tusVotos.id)

            let indiceJugador = array.indexOf(eliminarVoto)
            array.splice(indiceJugador, 1)

            localStorage.setItem("votaciones", JSON.stringify(array))
        })
        )
    }

function votosFavoritos(jugador){
let jugadorIncorporado = tusVotos.find((el)=>el.id == jugador.id)
if(jugadorIncorporado == undefined){
    // Votaciones del cliente
    console.log(`Has sumado un voto para: ${jugador.jugador}`)
    tusVotos.push(jugador)
    localStorage.setItem("votaciones", JSON.stringify(tusVotos))

    Swal.fire({
        title: `Sumaste un voto para ${jugador.jugador}`,
        text: 'Gracias por votar',
        icon: 'success',
        confirmButtonText: 'Ok',
        imageUrl: `images/${jugador.imagen}`,
        imageHeight: 200,
        timer: 2000
      })
} else{
    Swal.fire({
        title: `Ya has sumado para tu jugador: ${jugadorIncorporado.jugador}`,
        text: 'Vota otro jugador',
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2000
      })
}
}

//Loader
let loaderTitulo = document.getElementById("loaderTitulo")
let botonLoader = document.getElementById("loaderBtn")

setTimeout(()=>{
    loaderTitulo.remove()
    botonLoader.remove()
    mostrarLosMejores(losMejores)
}, 1000)

// Modal Votos 
let modalVotos = document.getElementById("modalVotos")
let tuVotacion = document.getElementById("tusVotosBtn")

tuVotacion.addEventListener("click", ()=>{
    modalVotos.innerText=""
    votosJugadores(tusVotos)
})

//Funcion Guardar votos
let votosGuardados = document.getElementById("guardarVotos")
function guardarVotos(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
                })
                tusVotos = []
                localStorage.removeItem("votaciones")
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    }

    )
}
votosGuardados.addEventListener("click", ()=>{
    guardarVotos()
})


//Camino al MVP
class caminoMvp {
    constructor (id, nombre, club, img){
        this.id = id,
        this.jugador = nombre,
        this.club = club
        this.img = img
    } 
}
let mvps = []

const caminoAlMvp = async () => {
    const respuesta = await fetch("caminoAlMvp.json")
    const data = await respuesta.json()
    
    for (let jugador of data){
        let nuevoJugador = new caminoMvp(jugador.id, jugador.nombre, jugador.club, jugador.img) 
        mvps.push(nuevoJugador)
    }
    localStorage.setItem("mejoresJugadores", JSON.stringify(mvps))
}
caminoAlMvp()
fetch("../caminoAlMvp.json")
.then(response => response.json())
.then((data) => {
    for (let jugador of data){
        let jugadoresIncorporados = document.createElement("div")
        jugadoresIncorporados.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-3')
        jugadoresIncorporados.innerHTML = `
        <div id="" class="card" style="width: 18rem;">
        <img class="card-img-top" style="height: 200px;" src="../images/${jugador.img}">
        <div class="card-body">
            <h5 class="card-title">${jugador.id} - ${jugador.nombre}</h5>
            <p class="">${jugador.club}</p>
        </div>
    </div> `
    jugadores.appendChild(jugadoresIncorporados)
    }
   })

//DOM mostrar mvps
let jugadores = document.getElementById('jugadores')
