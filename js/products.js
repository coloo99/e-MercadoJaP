document.getElementById('rangeFilterCount').addEventListener("click", function() {
    filtrarProductos()
})
document.getElementById('clearRangeFilter').addEventListener("click", function() {
    limpiarFiltros()
})
document.getElementById('sortDesc').addEventListener("click", function() {
    ordenarPorPrecioDecendente()
})
document.getElementById('sortAsc').addEventListener("click", function() {
    ordenarPorPrecioAscendente()
})

const categID = localStorage.getItem('catID')
const CategoriasURL = `https://japceibal.github.io/emercado-api/cats_products/${categID}.json`;

showSpinner()
fetch(CategoriasURL)
    .then(response => response.json())
    .then(data => {
        listarProductos(data) 
        hideSpinner()
    })
    .catch(error => {
        console.log(error)
        hideSpinner()
    })

let listarProductos = (categoria, min, max) => {
    window.cat = categoria;  // Se crea la variable global de productos
    document.getElementById("contProd").innerHTML = ""  //Se vacia el contenedor principal de los productos
    document.getElementById("tituloProducto").innerHTML = ""  //Se vacia el contenedor del titulo de los productos

    /*Se agrega el titulo al contenedor*/
    document.getElementById("tituloProducto").innerHTML =    `<h2>Productos</h2>
                                                              <p>Todos nuestros ${categoria.catName}<p>`

    if(max === '' && min === '' || max === undefined || min === undefined){                                      
        /*Se agregan los productos de la categoria obtenida del localStorage*/
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
    }else if(max === '' || max === undefined && min !== '' && min !== undefined){
        const productos = categoria.products
        document.getElementById("contProd").innerHTML = ""  //Se vacia el contenedor principal de los productos

        for(let i=0;  i < productos.length; i++){
            if(productos[i].cost > min){
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
    }else if(min === '' || min === undefined && max !== '' && max !== undefined){
        const productos = categoria.products
        document.getElementById("contProd").innerHTML = ""  //Se vacia el contenedor principal de los productos
        for(let i=0;  i < productos.length; i++){
            if(productos[i].cost < max){
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
    }else if(max !== '' && min !== '' || max !== undefined && min !== undefined){  
        const productos = categoria.products
        document.getElementById("contProd").innerHTML = ""  //Se vacia el contenedor principal de los productos

        for(let i=0;  i < productos.length; i++){
            if(productos[i].cost > min && productos[i].cost < max){
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
    }
}

let filtrarProductos = () => {
    let min = document.getElementById('rangeFilterCountMin').value
    let max = document.getElementById('rangeFilterCountMax').value
    listarProductos(window.cat, min, max)
}

let limpiarFiltros = () => {
    document.getElementById('rangeFilterCountMin').value = ''
    document.getElementById('rangeFilterCountMax').value = ''
    listarProductos(window.cat, document.getElementById('rangeFilterCountMin').value, document.getElementById('rangeFilterCountMax').value)
}

let ordenarPorPrecioDecendente = () => {  //Ordeno los productos de forma Descendente
    document.getElementById("contProd").innerHTML = "";
    let productos = window.cat.products
    result = productos.sort(function(a, b) {
        let aCost = a.cost;
        let bCost = b.cost;

        if ( aCost > bCost ){ return -1; }
        if ( aCost < bCost ){ return 1; }
        return 0;
    });
    listarProductosFiltrados(result)
}

let ordenarPorPrecioAscendente = () => {  //Ordeno los productos de forma Ascendente
    document.getElementById("contProd").innerHTML = "";
    let productos = window.cat.products
    result = productos.sort(function(a, b) {
        let aCost = a.cost;
        let bCost = b.cost;

        if ( aCost < bCost ){ return -1; }
        if ( aCost > bCost ){ return 1; }
        return 0;
    });
    listarProductosFiltrados(result)
}

let listarProductosFiltrados = (result) => {  //Listo los productos del array pasado por parametro
    for(let i=0;  i < result.length; i++){
        document.getElementById("contProd").innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
                                                                <div class="row">
                                                                    <div class="col-3">
                                                                        <img src="${result[i].image}" alt="${result[i].description}" class="img-thumbnail">
                                                                    </div>
                                                                    <div class="col">
                                                                        <div class="d-flex w-100 justify-content-between">
                                                                            <h4 class="mb-1">${result[i].name} - ${result[i].currency}${result[i].cost}</h4>
                                                                            <small class="text-muted">${result[i].soldCount} artículos</small>
                                                                        </div>
                                                                        <p class="mb-1">${result[i].description}</p>
                                                                    </div>
                                                                </div>
                                                        </div>`
    }
}