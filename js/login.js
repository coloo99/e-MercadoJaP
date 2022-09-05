document.getElementById('contLogin').innerHTML = `<div class="wrapper fadeInDown">
                                                    <div id="formContent">
                                                    <!-- Tabs Titles -->
                                                        <!-- Icono -->
                                                        <div class="fadeIn first">
                                                            <img src="img/login.png" id="icon" alt="User Icon" />
                                                            <h2 class="titLogin">Inicio de sesion</h2>
                                                        </div>

                                                        <!-- Login Form -->
                                                        <form id="formulario">
                                                            <input type="text" id="usuario" class="fadeIn second" name="login" placeholder="Usuario">
                                                            <input type="password" id="contraseña" class="fadeIn third" name="login" placeholder="Contraseña">
                                                            <div id="errForm"></div>
                                                            <input type="submit" id="ingresar" class="fadeIn fourth" value="Ingresar">
                                                        </form>

                                                        <!-- Resetear mi contraseña -->
                                                        <div id="formFooter">
                                                            <a class="underlineHover" href="#">Olvidaste tu contraseña?</a>
                                                        </div>

                                                    </div>
                                                </div>`

function eventoLogear() {
    document.getElementById("ingresar").addEventListener("click", function(evento) {
        evento.preventDefault();
        logear()
    });
}
eventoLogear()

function logear(){
    let email = document.getElementById('usuario').value
    let contra = document.getElementById('contraseña').value
    if(email === "" && contra === "" || email === "" || contra === ""){
        document.getElementById('errForm').innerHTML = "<p class='errForm'>Ingrese sus datos para ingresar</p>"
        eventoLogear()
    }else if(contra.length < 8){
        document.getElementById('errForm').innerHTML = "<p class='errForm'>La contraseña debe tener minimo 8 caracteres</p>"
        eventoLogear()
    }else if(contra.length >= 8){
        let user = [email, contra]
        localStorage.setItem("user",JSON.stringify(user));
        window.location = "index.html"
    }
}