let guardarPerfil = document.getElementById("guardarPerfil");
const form = document.getElementById('mi-formulario-perfil');
const primerNombre = document.getElementById("primerNombre");
const segundoNombre = document.getElementById("segundoNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoApellido = document.getElementById("segundoApellido");
const email = document.getElementById("e-mail");
const telefono = document.getElementById("telefono");

const errorEmail = document.getElementById("errorE-mail");
const errorTelefono = document.getElementById("errorTelefono");

function obtenerUsuario(){
    let array = localStorage.getItem('user');
    let user = JSON.parse(array);
    email.value = user.email;
    primerNombre.value = user.pNombre;
    segundoNombre.value = user.sNombre;
    primerApellido.value = user.pApellido;
    segundoApellido.value = user.sApellido;
    telefono.value = user.tel;
}
obtenerUsuario()

function hacerValidacion(event) {
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        showAlertError();
    }

    if (!emailValidation()) {
        email.setCustomValidity(false);
        errorEmail.innerHTML = `Debe de ingresar un email valido.`
    } else {
        email.setCustomValidity("");
        user.email = email.value;
    }

    if (!verificacionDeTelefono()) {
        telefono.setCustomValidity(false);
        errorTelefono.innerHTML = `Debe de ingresar un telefono valido.`
    } else {
        telefono.setCustomValidity("");
        user.tel = telefono.value;
    }

    form.classList.add('was-validated')
    localStorage.setItem("user",JSON.stringify(user));

}

function validarFormulario() {
    guardarPerfil.addEventListener('click', hacerValidacion, false)
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function showAlertSucces() {
    document.getElementById("alert-succes").classList.add("show");
}

function verificacionDeNombre() {
    return (primerNombre.value.length > 0);
}

function verificacionDeApellido() {
    return (primerApellido.value.length > 0);
}

function verificacionDeEmail() {
    return (email.value.length > 0);
}

function verificacionDeTelefono() {
    return (telefono.value.length > 8);
}

function verificacionDeMinimosDeCampos() {
    return (verificacionDeNombre() || verificacionDeApellido() || verificacionDeEmail() || verificacionDeContraseña1() || verificacionDeContraseña2())
}

function verificacionLargoContraseña() {
    return (contraseña1.value.length > 5);
}

function validacionDeIgualdadDeContraseñas() {
    return (contraseña1.value === contraseña2.value);
}

function emailValidation() {
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(email.value);
    if (esValido) {
        console.log("true");
        return true;
    } else {
        console.log("false");
        return false;
    }
}


//validarFormulario();
document.getElementById("mi-formulario-perfil").addEventListener("submit", element => {
    hacerValidacion(element);
    validarFormulario();
    contraseña1.addEventListener("input", evento => {
        if (!verificacionLargoContraseña()) {
            contraseña1.setCustomValidity(false);
            divContraseña.innerHTML = `Debe de ingresar una contraseña con al menos 6 caracteres.`
        } else {
            contraseña1.setCustomValidity("");
        }
    })
    contraseña2.addEventListener("input", evento => {
        if (!validacionDeIgualdadDeContraseñas()) {
            contraseña2.setCustomValidity(false);
            divContraseñaRepetida.innerHTML = `Debe ser igual a "contraseña".`
        } else {
            contraseña2.setCustomValidity("");
        }
    })
})