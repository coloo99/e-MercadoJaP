const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let array = localStorage.getItem('user');
let user = JSON.parse(array);
if(user === null){
  window.location = "login.html"
}else{
   console.log(user)
  document.getElementById('campoUsername').innerHTML = `<div class="dropdown show">
                                                          <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                            ${user.email}
                                                          </a>
                                                          <div class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuLink">
                                                            <a class="dropdown-item" href="./cart.html">Mi carrito</a>
                                                            <a class="dropdown-item" href="./my-profile.html">Mi perfil</a>
                                                            <a onclick="logOut()" class="dropdown-item" href="./login.html">Cerrar sesion</a>
                                                          </div>
                                                        </div>`
}

function logOut(){
  localStorage.removeItem('user');
}