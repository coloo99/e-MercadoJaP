let guardarPerfil = document.getElementById("guardarPerfil");
const form = document.getElementById('mi-formulario-perfil');
const primerNombre = document.getElementById("primerNombre");
const segundoNombre = document.getElementById("segundoNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoApellido = document.getElementById("segundoApellido");
const email = document.getElementById("e-mail");
const telefono = document.getElementById("telefono");

const errorPrimNombre = document.getElementById("errorPrimNombre")
const errorSegNombre = document.getElementById("errorSegNombre")
const errorPrimApellido = document.getElementById("errorPrimApellido");
const errorSegApellido = document.getElementById("errorSegApellido")
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
        event.preventDefault();
        event.stopPropagation();
    
    if (!verificacionDeNombre()) {
        primerNombre.setCustomValidity(false);
        console.log(errorPrimNombre)
        errorPrimNombre.innerHTML = `Debe de ingresar un telefono valido.`
        user.pNombre = primerNombre.value;
    } else {
        primerNombre.setCustomValidity("");
        user.pNombre = primerNombre.value;
    }

    if (!verificacionDeSegNombre()) {
        segundoNombre.setCustomValidity("");
        errorSegNombre.innerHTML = `Si tiene segundo nombre se recomienda escribirlo`
        user.sNombre = segundoNombre.value;
    } else {
        segundoNombre.setCustomValidity("");
        user.sNombre = segundoNombre.value;
    }

    if (!verificacionDeApellido()) {
        primerApellido.setCustomValidity(false);
        errorPrimApellido.innerHTML = `Debe de ingresar un telefono valido.`
        user.pApellido = primerApellido.value;
    } else {
        primerApellido.setCustomValidity("");
        user.pApellido = primerApellido.value;
    }

    if (!verificacionDeSegApellido()) {
        segundoApellido.setCustomValidity("");
        errorSegApellido.innerHTML = `Se recomienda ingresar su segundo apellido.`
        user.sApellido = segundoApellido.value;
    } else {
        segundoApellido.setCustomValidity("");
        user.sApellido = segundoApellido.value;
    }

    if (!verificacionDeEmail()) {
        email.setCustomValidity(false);
        errorEmail.innerHTML = `Debe de ingresar un email valido.`
    } else {
        email.setCustomValidity("");
        user.email = email.value;
    }

    if (!verificacionDeTelefono()) {
        telefono.setCustomValidity(false);
        errorTelefono.innerHTML = `Debe de ingresar un telefono valido.`
        user.tel = telefono.value;
    } else {
        telefono.setCustomValidity("");
        user.tel = telefono.value;
    }

    if(verificacionDeNombre() && verificacionDeApellido() && verificacionDeEmail() && verificacionDeTelefono()){
        showAlertSucces()
    } else {
        showAlertError();
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
    return (primerNombre.value.length > 3);
}

function verificacionDeSegNombre() {
    return (primerNombre.value.length > 0);
}

function verificacionDeApellido() {
    return (primerApellido.value.length > 3);
}

function verificacionDeSegApellido() {
    return (primerApellido.value.length > 0);
}


function verificacionDeEmail() {
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(email.value);
    if (esValido) {
        return true;
    } else {
        return false;
    }
}

function verificacionDeTelefono() {
    return (telefono.value.length > 7);
}

document.getElementById("mi-formulario-perfil").addEventListener("submit", element => {
    hacerValidacion(element);
    validarFormulario();
    primerNombre.addEventListener("keydown", evento => {
        if (!verificacionDeNombre()) {
            primerNombre.setCustomValidity("");
            errorPrimNombre.innerHTML = `Si tiene segundo nombre se recomienda escribirlo`
        } else {
            primerNombre.setCustomValidity("");
        }
    })
    primerApellido.addEventListener("keydown", evento => {
        if (!verificacionDeApellido()) {
            primerApellido.setCustomValidity(false);
            errorPrimApellido.innerHTML = `Debe de ingresar un telefono valido.`
        } else {
            primerApellido.setCustomValidity("");
        }
    })
    telefono.addEventListener("keydown", evento => {
        if (!verificacionDeTelefono()) {
            telefono.setCustomValidity(false);
            errorTelefono.innerHTML = `Debe de ingresar un telefono valido.`
        } else {
            telefono.setCustomValidity("");
        }
    })
})