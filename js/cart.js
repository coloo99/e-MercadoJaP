const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const contCarrito = document.getElementById("carritoCont")
const contEnvio = document.getElementById("envioCont")
const contCostos = document.getElementById("costosCont")

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
                                                            <tbody id="tbodyCart">
                                                                <tr>
                                                                    <td><h6>Subtotal</h6><p>Costo unitario del producto por cantidad</p></td>
                                                                    <td id="subTotalTotal">USD 0</td>
                                                                <tr>
                                                                <tr>
                                                                    <td><h6>Costo de envo</h6><p>Segun el tipo de envio</p></td>
                                                                    <td id="envio">USD 0</td>
                                                                <tr>
                                                                <tr>
                                                                    <td><h6>Total ($)</h6></td>
                                                                    <td id="total">USD 0</td>
                                                                <tr>
                                                            </tbody>
                                                        </table>`

    let productosCartLG = localStorage.getItem('productosCarrito')
    productosCartLG = JSON.parse(productosCartLG)
    if(productosCartLG !== null){
        for(let producto of productosCartLG){
            console.log(cart)
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
    for(let articulo of cart.articles){
        let subTotal = articulo.unitCost * articulo.count
        let tr = document.createElement('tr')
        tr.innerHTML = `<td><img src="${articulo.image}"></td>
                        <td>${articulo.name}</td>
                        <td>${articulo.currency + ' ' + articulo.unitCost}</td>
                        <td><input class="cantidad" id="cantidad${articulo.id}" type="number" min="1" value="${articulo.count}"></td>
                        <td class="subTotal" id="subTotal${articulo.id}">${articulo.currency + ' ' + subTotal}</td>`   

        document.getElementById(`tbodyCart`).appendChild(tr)

        //Se calcula la suma del sub total de todos los productos
        let inputEvent = document.getElementById(`cantidad${articulo.id}`)
        total += subTotal

        //Eventos al cambiar la cantidad de un articulo
        inputEvent.addEventListener("click", function(){
            total=0
            subTotal = articulo.unitCost * document.getElementById(`cantidad${articulo.id}`).value
            document.getElementById(`subTotal${articulo.id}`).innerHTML = `${articulo.currency + ' ' + subTotal}`
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
            document.getElementById("total").innerHTML = parseInt(document.getElementById("subTotalTotal").textContent.split(' ')[1], 10) + parseInt(document.getElementById("envio").textContent.split(' ')[1], 10)
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
                                </div>`
    contEnvio.appendChild(div)

     //Calcula el precio del envio con el envio standard checkeado por default
     let radios = document.getElementsByClassName("radio")
     for(let i=0; i<3; i++){
         if(radios[i].checked)
         document.getElementById("envio").innerHTML = `USD ${total*parseInt(radios[i].value)/100}`
     }
     document.getElementById("total").innerHTML = parseInt(document.getElementById("subTotalTotal").textContent.split(' ')[1], 10) + parseInt(document.getElementById("envio").textContent.split(' ')[1], 10)

}
