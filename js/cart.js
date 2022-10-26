const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const contCarrito = document.getElementById("carritoCont")
const contEnvio = document.getElementById("envioCont")
const contCostos = document.getElementById("costosCont")
const USD = 40

fetch(urlCart)
    .then(response => response.json())
    .then(data =>{
        mostrarCarrito(data);
    }).catch(error => {
        console.log(error)
    })

let mostrarCarrito = (cart) => {
    contCostos.innerHTML += `<table id="tableCart" class="demo">
                                                            <h4>Costos</h4>
                                                            <tbody id="tbodyCostos">
                                                                <tr class="costosTr">
                                                                    <td class="costosTd"><h6 class="titulosPrecios">Subtotal</h6><p class="titulosPrecios">Costo unitario del producto por cantidad</p></td>
                                                                    <td id="subTotalTotal">USD 0</td>
                                                                <tr>
                                                                <tr class="costosTr">
                                                                    <td class="costosTd"><h6 class="titulosPrecios">Costo de envio</h6><p class="titulosPrecios">Segun el tipo de envio</p></td>
                                                                    <td id="envio">USD 0</td>
                                                                <tr>
                                                                <tr class="costosTr">
                                                                    <td class="costosTd"><h6 class="titulosPrecios">Total ($)</h6></td>
                                                                    <td id="total">USD 0</td>
                                                                <tr>
                                                            </tbody>
                                                        </table>`

    let productosCartLG = localStorage.getItem('productosCarrito')
    productosCartLG = JSON.parse(productosCartLG)
    if(productosCartLG !== null){
        for(let producto of productosCartLG){
            cart.articles.push(producto)
        }
    }

    console.log(cart.articles)
    contCarrito.innerHTML += `<div id="titulo"><h1>Carrito de compras</h1></div>`
    contCarrito.innerHTML += `<div class="subTitulo"><h4>articulos a comprar</h4></div>`

    contCarrito.innerHTML += `<table id="tableCart" class="demo">
                                <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Costo</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <tbody id="tbodyCart">
                                </tbody>`

    let total = 0
    let costoUnitario = 0
    let currency = "USD"
    for(let articulo of cart.articles){
        if(articulo.currency === 'UYU'){
            costoUnitario = articulo.unitCost/USD
        }else{
            costoUnitario = articulo.unitCost
        }
        let subTotal = Math.round(costoUnitario) * articulo.count
        let tr = document.createElement('tr')
        tr.innerHTML = `<td><img src="${articulo.image}"></td>
                        <td>${articulo.name}</td>
                        <td>${currency + ' ' + Math.round(costoUnitario)}</td>
                        <td><input class="cantidad" id="cantidad${articulo.id}" type="number" min="1" value="${articulo.count}"></td>
                        <td class="subTotal" id="subTotal${articulo.id}">${currency + ' ' + subTotal}</td>`   

        document.getElementById(`tbodyCart`).appendChild(tr)

        //Se calcula la suma del sub total de todos los productos
        let inputEvent = document.getElementById(`cantidad${articulo.id}`)
        total += subTotal

        //Eventos al cambiar la cantidad de un articulo
        inputEvent.addEventListener("click", function(){
            total=0
            if(articulo.currency === 'UYU'){
                costoUnitario = articulo.unitCost/USD
            }else{
                costoUnitario = articulo.unitCost
            }
            subTotal = Math.round(costoUnitario) * document.getElementById(`cantidad${articulo.id}`).value
            document.getElementById(`subTotal${articulo.id}`).innerHTML = `${currency + ' ' + subTotal}`
            //Al cambiar la cantidad se recalcula el subtotal
            for(let i=0;i<cart.articles.length;i++){
                total += parseInt(document.getElementsByClassName("subTotal")[i].innerHTML.split(' ')[1], 10)
            }
            document.getElementById("subTotalTotal").innerHTML = `USD ${total}`
            //Al cambiar la cantidad tambien se recalcula el costo de envio
            radios = document.getElementsByClassName("radio")
            for(let i=0; i<3; i++){
                if(radios[i].checked)
                document.getElementById("envio").innerHTML = `USD ${total*parseInt(radios[i].value)/100}`
            }
            //Al cambiar la cantidad se ajusta el total a pagar
            document.getElementById("total").innerHTML = `USD ${parseInt(document.getElementById("subTotalTotal").textContent.split(' ')[1], 10) + parseInt(document.getElementById("envio").textContent.split(' ')[1], 10)}`
        })
    }
    //Se inserta el subtotal al terminar de iterar en el carrito
    document.getElementById("subTotalTotal").innerHTML = `USD ${total}`

    let div = document.createElement('div')
    div.innerHTML +=   `<div class="subTitulo"><h4>Tipo de envio</h4></div>
                                <div class="tipoEnvio">
                                    <div>
                                        <input class="radio" type="radio" id="premium" name="tipo" value="15">
                                        <label for="premium">Premium 2 a 5 dias(15%)</label>
                                    </div>
                                    <div>
                                        <input class="radio" type="radio" id="express" name="tipo" value="7">
                                        <label for="express">Express 5 a 8 dias(7%)</label>
                                    </div>
                                    <div>
                                        <input class="radio" type="radio" id="standard" name="tipo" value="5" checked>
                                        <label for="standard">Standard 12 a 15 dias(5%)</label>
                                    </div>
                                </div>
                                <div class="subTitulo"><h4>Direccion de envio</h4></div>
                                <div class="dirEnvio">
                                    <input type="text" id="calle" placeHolder="Calle">
                                    <input type="text" id="numero" placeHolder="Numero">
                                    <input type="text" id="esquina" placeHolder="Esquina">
                                    <div id="errorDireccion"></div>
                                </div>`
    contEnvio.appendChild(div)

     //Calcula el precio del envio con el envio standard checkeado por default
     let radios = document.getElementsByClassName("radio")
     for(let i=0; i<3; i++){
         if(radios[i].checked)
         document.getElementById("envio").innerHTML = `USD ${total*parseInt(radios[i].value)/100}`
     }
     document.getElementById("total").innerHTML = `USD ${parseInt(document.getElementById("subTotalTotal").textContent.split(' ')[1], 10) + parseInt(document.getElementById("envio").textContent.split(' ')[1], 10)}`
     document.getElementById("pagoCont").innerHTML = `<h4 id="formaPago">Forma de pago</h4>
                                                        <div class="formaPago">
                                                            <p id="seleccionMetodo" class="noSeleccionado">No ha seleccionado</p>
                                                            <button id="seleccionMetodo" type="button" class="btnPago" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                                Seleccionar
                                                            </button>   
                                                        </div>
                                                        <div id="errorVerificacion"></div>
                                                        <button class="btn btn-primary finCompra" type="button" onclick="finalizarCompra()">Finalizar compra</button>
                                                        <!-- Modal -->
                                                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                <h5 class="modal-title" id="staticBackdropLabel">Pago</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <div class="row g-5">
                                                                        <div class="col-md-12 col-lg-12">
                                                                            <h4 class="mb-3">Forma de pago</h4>
                                                                            <form class="needs-validation was-validated" novalidate="">
                                                                    
                                                                                <hr class="my-4">
                                                                    
                                                                                <h4 class="mb-3">Payment</h4>
                                                                    
                                                                                <div class="my-3">
                                                                                <div class="form-check">
                                                                                    <input id="transfer" name="paymentMethod" type="radio" class="form-check-input" checked="" required="">
                                                                                    <label class="form-check-label" for="transfer">Transferencia bancaria</label>
                                                                                </div>
                                                                                </div>
                                                                                <div class="row gy-3">
                                                                                    <div class="col-md-12">
                                                                                    <label for="cuenta-number" class="form-label">Numero de cuenta</label>
                                                                                    <input type="text" class="form-control" id="cuenta-number" placeholder="" required="">
                                                                                    <div class="invalid-feedback">
                                                                                        El numero de cuenta es necesario
                                                                                    </div>
                                                                                    </div>
                                                                                </div>
                                                                    
                                                                    
                                                                                <div class="my-3">
                                                                                <div class="form-check">
                                                                                    <input id="credit" name="paymentMethod" type="radio" class="form-check-input" required="">
                                                                                    <label class="form-check-label" for="credit">Tarjeta de credito</label>
                                                                                </div>
                                                                                </div>
                                                                    
                                                                                <div class="row gy-3">
                                                                                <div class="col-md-8">
                                                                                    <label for="cc-number" class="form-label">Numero tarjeta</label>
                                                                                    <input type="text" class="form-control" id="cc-number" placeholder="" required="" disabled>
                                                                                    <div class="invalid-feedback">
                                                                                    El numero de tarjeta es necesario
                                                                                    </div>
                                                                                </div>
                                                                    
                                                                                <div class="col-md-4">
                                                                                    <label for="cc-expiration" class="form-label">Vencimiento</label>
                                                                                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required="" disabled>
                                                                                    <div class="invalid-feedback">
                                                                                    Fecha de vencimiento es necesaria
                                                                                    </div>
                                                                                </div>
                                                                    
                                                                                <div class="col-md-4">
                                                                                    <label for="cc-cvv" class="form-label">CVV</label>
                                                                                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required="" disabled>
                                                                                    <div class="invalid-feedback">
                                                                                    Codigo de seguridad es requerido
                                                                                    </div>
                                                                                </div>
                                                                                </div>
                                                                    
                                                                                <hr class="my-4">
                                                                                <div id="errorModal"></div>
                                                                                <button id="verificarDatosPago" class="w-50 btn btn-secondary btn-md" >Verificar</button>
                                                                                <button id="guardarDatosPago" class="w-100 btn btn-primary btn-lg" type="submit" data-bs-dismiss="modal">Cargar datos</button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-primary">Understood</button>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>`

     //Se le da el evento al boton de verificar metodo de pago
    document.getElementById("guardarDatosPago").addEventListener("click", (ev)=>{
        ev.preventDefault()
    })
    document.getElementById("verificarDatosPago").addEventListener("click", (ev)=>{
        ev.preventDefault()
        if(document.getElementById("transfer").checked){
            if(document.getElementById("cuenta-number").value === ""){
                document.getElementById("errorModal").innerHTML = '<p class="error">Llenar el campo con numero de cuenta</p>'
            }else{
                document.getElementById("errorModal").innerHTML = '<p class="perfecto">Informacion correcta, puede proceder</p>'
                document.getElementById("seleccionMetodo").innerText = 'Transferencia bancaria'
            }
        }else{
            if(document.getElementById("cc-number").value === "" && document.getElementById("cc-expiration").value === "" &&
            document.getElementById("cc-cvv").value === ""){
                document.getElementById("errorModal").innerHTML = '<p class="error">Llenar los campos de la tarjeta</p>'
            }else{
                document.getElementById("errorModal").innerHTML = '<p class="perfecto">Informacion correcta, puede proceder</p>'
                document.getElementById("seleccionMetodo").innerText = 'Tarjeta de credito'
            }
        }
    })                                                

    //Se deshabilitan los campos del metodo de pago no seleccionado
    document.getElementById("credit").addEventListener("click", ()=>{
        document.getElementById("cuenta-number").disabled = true
        document.getElementById("cc-number").disabled = false
        document.getElementById("cc-expiration").disabled = false
        document.getElementById("cc-cvv").disabled = false
        document.getElementById("errorModal").innerHTML = ''
    })

    document.getElementById("transfer").addEventListener("click", ()=>{
        document.getElementById("cc-number").disabled = true
        document.getElementById("cc-expiration").disabled = true
        document.getElementById("cc-cvv").disabled = true
        document.getElementById("cuenta-number").disabled = false
        document.getElementById("errorModal").innerHTML = ''
    })
}

//Se verifica que todos los campos esten completos para finalizar la compra
function finalizarCompra(){
    if(document.getElementById("calle").value === "" || document.getElementById("numero").value === "" || document.getElementById("esquina").value === ""){
        document.getElementById("errorDireccion").innerHTML = `<p class="error">Porfavor llenar los campos de direccion para el envio</p>`
    }else if(document.getElementById("credit").checked){
        if(document.getElementById("cc-number").value === "" || document.getElementById("cc-expiration").value === "" || document.getElementById("cc-cvv").value === "")
            document.getElementById("errorVerificacion").innerHTML = `<p class="error">Porfavor llenar los datos de la tarjeta</p>`
    }else if(document.getElementById("transfer").checked){
        if(document.getElementById("cuenta-number").value === "")
            document.getElementById("errorVerificacion").innerHTML = `<p class="error">Porfavor llenar el campo numero de cuenta</p>`
    }
    if(document.getElementById("transfer").checked && document.getElementById("cuenta-number").value !== "" || document.getElementById("credit").checked && document.getElementById("cc-number").value !== "" && document.getElementById("cc-expiration").value !== "" && document.getElementById("cc-cvv").value !== ""){
        document.getElementById("errorVerificacion").innerHTML = `<p class="perfecto">¡Compra realizada correctamente!</p>`
    }
    
}