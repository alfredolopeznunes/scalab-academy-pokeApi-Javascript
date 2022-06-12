import FetchWrapper from "./fetch-wrapper.js";
import { eventListeners, agregarBusqueda } from "./local-storage.js";

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
            console.error('error1: ' + error);
            errorApi();
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

export function errorApi() {
    let msjErr = document.querySelector(".error");
    msjErr.classList.add('show');
    msjErr.innerHTML = `Pokemon no encontrado. <br>Revisa que el nombre este bien escrito. <br>Búsquedas por ID hasta el 898`;
    setTimeout(() => {
        msjErr.classList.remove('show');
        document.querySelector("#buscarPokemon").disabled = false;
        form.reset();
    }, 3000);
}

const pintarPokemon = (propiedades) => {
    const cardPokemon = document.querySelector(".pantalla-pokedex");

    document.querySelector(".pantalla-pokedex").className = "pantalla-pokedex active";

    cardPokemon.querySelector(".card-body-img").setAttribute("src", propiedades.imagen);
    cardPokemon.querySelector(".card-body-title").textContent = propiedades.nombre;
    cardPokemon.querySelector(".altua").innerHTML = "<strong>Altura: </strong>" + propiedades.altura;
    cardPokemon.querySelector(".peso").innerHTML = "<strong>Peso: </strong>" + propiedades.peso;

    const listaTipo = propiedades.tipo.map((pokeTipo) => pokeTipo.type.name).join(", ");
    cardPokemon.querySelector(".tipo").innerHTML = "<strong>Tipo: </strong>" + listaTipo;

    // pasamos el endpoint al metodo para obtener la categoria
    API.get(propiedades.categoria).then((categoria) => {
        const catEs = categoria.genera.findIndex((e) => e.language.name == "es");
        cardPokemon.querySelector(".categoria").innerHTML = "<strong>Categoria: </strong>" + categoria.genera[catEs].genus;

        const desEs = categoria.flavor_text_entries.findIndex((e) => e.language.name == "es");
        cardPokemon.querySelector(".descripcion").innerHTML = "<strong>Descripión: </strong>" + categoria.flavor_text_entries[desEs].flavor_text;
        //console.log(categoria.flavor_text_entries);
    });
};

export const form = document.querySelector("#formulario");
export const pokemonIngresado = document.querySelector("#buscarPokemon");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log(pokemonIngresado.value + '-');
    getPokemon(pokemonIngresado.value.toLowerCase());
    document.querySelector("#buscarPokemon").disabled = true;
});

//Ejecuta los eventos del LocalStorage
eventListeners();
