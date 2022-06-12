import { pokemonIngresado, form } from "./app.js";

//LOCAL STORAGE
const listaRecientes = document.querySelector('#historialBusqueda');

// Añadir busqueda del formulario
  function agregarBusqueda(e) {

    // Leer el valor del textarea
    const busqueda = pokemonIngresado.value;
    // Crear boton de elimina
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-reciente'; // agregar una clases
    botonBorrar.innerText = 'X'; 

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerHTML = `<span class='item'>${busqueda}</span>`;
    // añade el botón de borrar por item de la busqueda
    li.appendChild(botonBorrar);
    // añade la busqueda a la lista
    listaRecientes.appendChild(li);

    //console.log(busqueda);

    // Añadir a local Storage
    agregarBusquedaLocalStorage(busqueda);
}

   // Borrar busqueda del DOM
   function borrarReciente(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-reciente') {
        
        e.target.parentElement.remove();
        borrarRecienteLocalStorage(e.target.parentElement.innerText);
    }
}

 // Agrega busqueda a local storage
 function agregarBusquedaLocalStorage(busqueda) {
    let busquedas;
    busquedas = obtenerBusquedasLocalStorage(); // para obtener busquedas guardadas
    
    // Añadir busqueda
    busquedas.unshift(busqueda); //añade la busqueda en la ultima posicíon del arreglo
    // Convertir de string a arreglo para local storage
    localStorage.setItem('busquedas', JSON.stringify(busquedas));

    form.reset();
    document.querySelector("#buscarPokemon").disabled = false;
}

function obtenerBusquedasLocalStorage() {
    let busquedas;
    // Revisamos los valores de local storage
    if(localStorage.getItem('busquedas') === null ) {
        busquedas = [];
    } else {
        busquedas = JSON.parse(localStorage.getItem('busquedas'));
    }
    return busquedas;
}

// Mostrar datos de localStorage en el historial de busqueda
function localStorageListo() {
    let busquedas;

    busquedas = obtenerBusquedasLocalStorage();

    //console.log(busquedas); // muestra en consola las busquedas guardadas en el local storage
    busquedas.forEach(function(busqueda) {
        // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-reciente'; // agregar una clases
        botonBorrar.innerText = 'X'; 

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerHTML = `<span class=item>${busqueda}</span>`;
        // añade el botón de borrar
        li.appendChild(botonBorrar);
        // añade la busqueda a la lista
        listaRecientes.appendChild(li);
    });
}


function borrarRecienteLocalStorage(busqueda) {

    let busquedas, busquedaBorrar;
    // Elimina la X
    busquedaBorrar = busqueda.substring(0, busqueda.length - 1);

    busquedas = obtenerBusquedasLocalStorage();
    busquedas.forEach(function(busqueda, index) {
        if(busquedaBorrar === busqueda) {
            busquedas.splice(index, 1);
        }
    });
    localStorage.setItem('busquedas', JSON.stringify(busquedas));
}

function busquedaReciente(e) {
    e.preventDefault();

    if(e.target.className === 'item') {
        pokemonIngresado.value = e.target.textContent;
    }
}


export {
        listaRecientes,  
        agregarBusqueda,
        borrarReciente, 
        busquedaReciente, 
        localStorageListo 
        }