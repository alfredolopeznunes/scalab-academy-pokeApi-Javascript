import { form } from "./app.js";

function errorApi(error) {
    let msjErr = document.querySelector(".error");
    msjErr.classList.add('show');
    msjErr.innerHTML = `Pokemon no encontrado. <br>Revisa que el nombre este bien escrito. <br>Búsquedas por ID hasta el 898`;
    console.error(error);
    setTimeout(() => {
        msjErr.classList.remove('show');
        document.querySelector("#buscarPokemon").disabled = false;
        form.reset();
    }, 3000);
}


export { errorApi }