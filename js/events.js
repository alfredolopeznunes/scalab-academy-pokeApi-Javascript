import { API } from "./app.js";

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

export { pintarPokemon }