// Vision modo CLARO y OSCURO
let oscuro = JSON.parse(localStorage.getItem("pantallaOscura"))

if(oscuro == true){
    document.body.classList.add("modoOscuro")
}else{
    document.body.classList.remove("modoOscuro")
}

let botonOscuro = document.getElementById("btnOscuro")
let botonClaro = document.getElementById("bntClaro")

botonOscuro.addEventListener("click", ()=>{
    console.log('Modo Oscuro activado')
    document.body.classList.add("modoOscuro")
    localStorage.setItem("pantallaOscura", true)
})

botonClaro.addEventListener("click", ()=>{
    console.log('Modo Claro Activado')
    document.body.classList.remove("modoOscuro")
    localStorage.setItem("pantallaOscura", false)
})
