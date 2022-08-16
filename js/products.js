const categID = localStorage.getItem('catID')
const CategoriasURL = `https://japceibal.github.io/emercado-api/cats_products/${categID}.json`;
console.log(CategoriasURL)

fetch(CategoriasURL)
    .then(response => response.json())
    .then(data => listarProductos(data))
    .catch(error => console.log(error))

let listarProductos = (categoria) => {
    document.getElementById("contProd").innerHTML = ""
    document.getElementById("contProd").innerHTML +=    `<div class="text-center p-4">
                                                            <h2>Productos</h2>
                                                            <p>Todos nuestros ${categoria.catName}<p>
                                                        </div>`
    const productos = categoria.products
    for(let i=0;  i < productos.length; i++){
        document.getElementById("contProd").innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
                                                                    <div class="row">
                                                                        <div class="col-3">
                                                                            <img src="${productos[i].image}" alt="${productos[i].description}" class="img-thumbnail">
                                                                        </div>
                                                                        <div class="col">
                                                                            <div class="d-flex w-100 justify-content-between">
                                                                                <h4 class="mb-1">${productos[i].name} - ${productos[i].currency}${productos[i].cost}</h4>
                                                                                <small class="text-muted">${productos[i].soldCount} artículos</small>
                                                                            </div>
                                                                            <p class="mb-1">${productos[i].description}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>`
    }
}