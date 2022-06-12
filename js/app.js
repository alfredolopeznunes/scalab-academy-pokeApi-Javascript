import FetchWrapper from "./fetch-wrapper.js";
import { agregarBusqueda } from "./local-storage.js";
import { pintarPokemon, eventListeners } from "./events.js";
import { errorApi } from "./error.js";

//url API
const baseApi = "https://pokeapi.co/api/v2/";

//Instancia de la API
const API = new FetchWrapper(baseApi);

//metodo get de la instancia
const getPokemon = (pokemon) => {
    //Pasamos el endpoint
    API.get(`pokemon/${pokemon}`)
        .then((data) => {
            //console.log(data);

            //ejecutamos la función que lista los pokemones
            obtenerPokemon(data);
        })
        .catch((error) => {
            //console.error(error);
            errorApi(error);
        });
};

const obtenerPokemon = (dataPokemon) => {
    const datosPokemon = {
        nombre: dataPokemon.name,
        imagen: dataPokemon.sprites.other.home.front_default,
        altura: dataPokemon.height,
        peso: dataPokemon.weight,
        categoria: `pokemon-species/${dataPokemon.id}`,
        tipo: dataPokemon.types,
    };

    pintarPokemon(datosPokemon);

    //agrega al localStorage
    agregarBusqueda();
};


const form = document.querySelector("#formulario");
const pokemonIngresado = document.querySelector("#buscarPokemon");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log(pokemonIngresado.value + '-');
    getPokemon(pokemonIngresado.value.toLowerCase());
    document.querySelector("#buscarPokemon").disabled = true;
});

//Ejecuta los eventos del LocalStorage
eventListeners();

export {
    form,
    pokemonIngresado,
    API,
    getPokemon
}
