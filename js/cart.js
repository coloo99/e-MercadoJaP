const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const contCarrito = document.getElementById("container")

fetch(urlCart)
    .then(response => response.json())
    .then(data =>{
        mostrarCarrito(data);
    }).catch(error => {
        console.log(error)
    })

let mostrarCarrito = (cart) => {
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

    for(let articulo of cart.articles){
        let subTotal = articulo.unitCost * articulo.count
        let tr = document.createElement('tr')
        tr.innerHTML = `<td><img src="${articulo.image}"></td>
                        <td>${articulo.name}</td>
                        <td>${articulo.currency + ' ' + articulo.unitCost}</td>
                        <td><input class="cantidad" id="cantidad${articulo.id}" type="number" min="1" value="${articulo.count}"></td>
                        <td class="subTotal" id="subTotal${articulo.id}">${articulo.currency + ' ' + subTotal}</td>`   

        document.getElementById(`tbodyCart`).appendChild(tr)

        let inputEvent = document.getElementById(`cantidad${articulo.id}`)
        inputEvent.addEventListener("click", function(){
            subTotal = articulo.unitCost * document.getElementById(`cantidad${articulo.id}`).value
            document.getElementById(`subTotal${articulo.id}`).innerHTML = `${articulo.currency + ' ' + subTotal}`
        })
    }

    let div = document.createElement('div')
    div.innerHTML +=   `<div class="subTitulo"><h4>Tipo de envio</h4></div>
                                <div class="tipoEnvio">
                                    <div>
                                        <input type="radio" id="premium" name="tipo" value="premium">
                                        <label for="premium">Premium 2 a 5 dias(15%)</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="express" name="tipo" value="express">
                                        <label for="express">Express 5 a 8 dias(7%)</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="standard" name="tipo" value="standard">
                                        <label for="standard">Standard 12 a 15 dias(5%)</label>
                                    </div>
                                </div>
                                <div id="subTitulo"><h4>Direccion de envio</h4></div>
                                <div class="dirEnvio">
                                    <input type="text" id="calle" placeHolder="Calle">
                                    <input type="text" id="numero" placeHolder="Numero">
                                    <input type="text" id="esquina" placeHolder="Esquina">
                                </div>`
    document.getElementById(`container`).appendChild(div)
}