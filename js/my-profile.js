let guardarPerfil = document.getElementById("guardarPerfil");
const form = document.getElementById('mi-formulario-perfil');
const primerNombre = document.getElementById("primerNombre");
const segundoNombre = document.getElementById("segundoNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoApellido = document.getElementById("segundoApellido");
const email = document.getElementById("e-mail");
const telefono = document.getElementById("telefono");
const fotoDePerfil = document.getElementById("fotoDePerfil")
let previewImg = document.getElementById("vistaPreviaImagenPerfil");

const errorPrimNombre = document.getElementById("errorPrimNombre")
const errorSegNombre = document.getElementById("errorSegNombre")
const errorPrimApellido = document.getElementById("errorPrimApellido");
const errorSegApellido = document.getElementById("errorSegApellido")
const errorEmail = document.getElementById("errorE-mail");
const errorTelefono = document.getElementById("errorTelefono");
const errorFotoDePerfil = document.getElementById("errorFotoDePerfil")

let user= []

function obtenerUsuario(){
    let array = localStorage.getItem('user');
    user = JSON.parse(array);
    email.value = user.email;
    primerNombre.value = user.pNombre;
    segundoNombre.value = user.sNombre;
    primerApellido.value = user.pApellido;
    segundoApellido.value = user.sApellido;
    telefono.value = user.tel;
    if(user.imagenPerfil == ""){
        previewImg.src = "img/img_perfil.png"
    }else{
        previewImg.src = user.imagenPerfil;
    }
}
obtenerUsuario()

function hacerValidacion(event) {
        event.preventDefault();
        event.stopPropagation();
    
    if (!verificacionDeNombre()) {
        primerNombre.setCustomValidity(false);
        errorPrimNombre.innerHTML = `Debe de ingresar su nombre.`
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
        errorPrimApellido.innerHTML = `Debe de ingresar su apellido.`
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
    } else {
        telefono.setCustomValidity("");
        user.tel = telefono.value;
    }

    if(!guardarFotoPerfil()){
        fotoDePerfil.setCustomValidity(false);
        errorFotoDePerfil.innerHTML = `Si quiere puede subir una foto para su perfil.`
    } else {
        fotoDePerfil.setCustomValidity("");
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
    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(telefono.value);
    return (telefono.value.length > 7 && onlyNumbers);
}

function guardarFotoPerfil(){
    let previewImg = document.getElementById("vistaPreviaImagenPerfil");
    var foto = document.getElementById('fotoDePerfil').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        // convierte la imagen a una cadena en base64
        previewImg.src = reader.result;
        user.imagenPerfil = reader.result
    }, false);
    if (foto) {
        reader.readAsDataURL(foto);
        return true;
    }
    let rutaSeparada = previewImg.src.split("/")
    let ruta = rutaSeparada[rutaSeparada.length-2] + "/" + rutaSeparada[rutaSeparada.length-1]
    if(ruta === "img/img_perfil.png"){
        return false;
    }
    if(ruta !== "img/img_perfil.png"){
        return true;
    }
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