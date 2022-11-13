const prodID = localStorage.getItem('prodID')
const ProductosURL = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
const ProductsCommentsURL = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
let productosCarrito = []

fetch(ProductosURL)
    .then(response => response.json())
    .then(data => {
        mostrarProducto(data) 
        hideSpinner()
    })
    .catch(error => {
        console.log(error)
        hideSpinner()
    })

let mostrarProducto = (producto) => {
    window.productoActual = producto
    document.getElementById('contProducto').innerHTML =`<div class="head"><h1 class="titulo">${producto.name}</h1><buttom id="addToCart">Comprar</buttom></div>
                                                        <div class="info-prod">
                                                            <p class="nombres">Precio:</p><p class="datos">${producto.currency + producto.cost}</p>
                                                            <p class="nombres">Categoria:</p><p class="datos">${producto.category}</p>
                                                            <p class="nombres">Descripcion:</p><p class="datos">${producto.description}</p>
                                                            <p class="nombres">Cantidad vendida:</p><p class="datos">${producto.soldCount}</p>
                                                        </div>
                                                        <div id="imagenes"></div>`

    let imgs = producto.images
    document.getElementById('imagenes').innerHTML += `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                                        <div class="carousel-indicators">
                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                                        </div>
                                                        <div class="carousel-inner">
                                                            <div class="carousel-item active">
                                                                <img src="${imgs[0]}" class="d-block w-100" alt="${imgs[0]}">
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img src="${imgs[1]}" class="d-block w-100" alt="${imgs[1]}">
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img src="${imgs[2]}" class="d-block w-100" alt="${imgs[2]}">
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img src="${imgs[3]}" class="d-block w-100" alt="${imgs[3]}">
                                                            </div>
                                                        </div>
                                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                            <span class="visually-hidden">Previous</span>
                                                        </button>
                                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                            <span class="visually-hidden">Next</span>
                                                        </button>
                                                    </div>`
    agregarAlCarrito(producto);
    listarSugeridos(producto.relatedProducts)
} 

function agregarAlCarrito(producto){
    document.getElementById('addToCart').addEventListener('click', function(e){
        let prod = {
            count: 1,
            currency: producto.currency,
            id: producto.id,
            image: imgs[0],
            name: producto.name,
            unitCost: producto.cost,
        }
        if(localStorage.getItem('productosCarrito') === null){
            productosCarrito.push(prod)
            productosCarrito = JSON.stringify(productosCarrito)
            localStorage.setItem('productosCarrito', productosCarrito)
            window.location = "cart.html"
        }else{
            productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'))
            productosCarrito.push(prod)
            productosCarrito = JSON.stringify(productosCarrito)
            localStorage.setItem('productosCarrito', productosCarrito)
            window.location = "cart.html"
        }
})
}

fetch(ProductsCommentsURL)
    .then(response => response.json())
    .then(data => {
        mostrarComentarios(data) 
        hideSpinner()
    })
    .catch(error => {
        console.log(error)
        hideSpinner()
    })

let mostrarComentarios = (comentarios) => {
    document.getElementById('contComentarios').innerHTML += `<h4 class="tituloComentarios">Comentarios</h4>`
    insertarComentarios(comentarios)
}

let insertarComentarios = (comentarios) =>{
    if(comentarios.length !== 0){
        for(let comentario of comentarios){
            document.getElementById('contComentarios').innerHTML += `<div class="comentarios-prod">
                                                                        <p class="user">${comentario.user}</p>
                                                                        <p class="fecha">${comentario.dateTime}</p>
                                                                        <div id="score${comentario.user}"></div>
                                                                        <p class="descripcion">${comentario.description}</p>
                                                                    </div>`

            for(let i = 0; i < comentario.score; i++){
                document.getElementById(`score${comentario.user}`).innerHTML += `<span class="fa fa-star checked"></span>`
            }
            for(let i = comentario.score; i< 5;i++){
                document.getElementById(`score${comentario.user}`).innerHTML += `<span class="fa fa-star"></span>`
            }
            
        }
    }else{
        document.getElementById('contComentarios').innerHTML += `<div class="comentarioVacio-prod">
                                                                    <p>No hay comentarios de este articulo</p>
                                                                </div>`
    }
}

function agregarUnComentario(){
    document.getElementById('envComentario').addEventListener('click', function(e){
        let comentario = document.getElementById('comentarioText').value
        let score = document.getElementById('score').value
        let user = JSON.parse(localStorage.getItem('user'));
        
        let hoy = new Date()
        let fecha = hoy.getFullYear() + '-' + String( hoy.getMonth() + 1 ).padStart(2, '0') + '-' + hoy.getDate();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var dateTimeCompleto = fecha + ' ' + hora;

        let comentarioNuevo = []
        comentarioNuevo[0] = {
            dateTime: dateTimeCompleto,
            description: comentario,
            product: productoActual.id,
            score: score,
            user: user[0]}

        insertarComentarios(comentarioNuevo)
    })
}
agregarUnComentario()

function listarSugeridos(productos){
    document.getElementById("productosSugeridos").innerHTML =  `<h3 class="tituloSugeridos">Nuestros productos similares</h3>`
    for(let producto of productos){
        document.getElementById("productosSugeridos").innerHTML += `<div onclick="setProdID(${producto.id})" class="sugeridosProds cursor-active">
                                                                        <div class="col">
                                                                            <div class="row">
                                                                                <img src="${producto.image}" alt="${producto.name}" class="img-thumbnail">
                                                                            </div>
                                                                            <div class="row">
                                                                                <h4 class="mb-1">${producto.name}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>`
    }
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}