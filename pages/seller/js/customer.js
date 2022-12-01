let customerProducts = JSON.parse(localStorage.getItem('products'));
const dom_products_container = document.querySelector('.dom_product_container')


let userData = [];
//store user data in local storage--------------------------
let saveData = () => {
  localStorage.setItem('userData', JSON.stringify(userData));
}
//To load product
let loadProductUser = () => {
  let loadData = JSON.parse(localStorage.getItem('userData'));
  if (loadData != null){
    userData = loadData;
  }
};

//To create product card----------------------------------------
let customerProduct = () => {
  let customer_product = document.querySelector('.productCard');
  customer_product.remove();
  customer_product = document.createElement("div");
  customer_product.className = "productCard";
  for (let index = 0 ; index < customerProducts.length; index++) {
    let product = customerProducts[index];

    //Create a new div (class card_show)
    let card = document.createElement("div");
    card.className = "card_show";
    card.dataset.index = index;
    customer_product.appendChild(card);
    
    let productInfo = document.createElement("div");
    productInfo.className = 'product_info';
    card.appendChild(productInfo);

    let product_img = document.createElement("div");
    product_img.className = 'product';
    productInfo.appendChild(product_img);

    let laptop_img = document.createElement('img');
    laptop_img.src = '../../images/macBook.png';
    product_img.appendChild(laptop_img);

    let product_detail = document.createElement('div');
    product_detail.className = 'product_detail';
    productInfo.appendChild(product_detail);

    let product_name = document.createElement('p');
    product_name.className = 'name';
    product_name.textContent = product.name;
    product_detail.appendChild(product_name);

    let product_type = document.createElement('p');
    product_type.className = 'type';
    product_type.textContent = product.type;
    product_detail.appendChild(product_type);

    let description_link = document.createElement('a');
    description_link.href = 'pages/detail/detail_product.html';
    product_detail.appendChild(description_link);

    let product_description = document.createElement('p');
    product_description.className = 'description';
    product_description.textContent = product.description;
    description_link.appendChild(product_description);

    let product_price = document.createElement('p');
    product_price.className = 'price';
    product_price.textContent = product.price + product.currency;
    product_detail.appendChild(product_price);

    let rate = document.createElement('div');
    rate.className = 'rate';
    card.appendChild(rate);

    for (let i =0 ; i < 3 ; i++) {
      let star_full = document.createElement('img');
      star_full.src = "images/star1.png";
      rate.appendChild(star_full);
    }
    for (let n = 0 ;  n < 2; n++){
      let star = document.createElement('img');
      star.src = "images/star-n.png"
      rate.appendChild(star);
    };
    let addToCard = document.createElement('div');
    addToCard.className = 'addToCart';
    card.appendChild(addToCard);
    
    let btn_addToCart = document.createElement('button');
    btn_addToCart.id = 'addToCart';
    btn_addToCart.textContent = 'Add to Cart';
    btn_addToCart.addEventListener('click',onClickAddToCart)
    addToCard.appendChild(btn_addToCart);
  }
  dom_products_container.appendChild(customer_product)
  console.log(customer_product);
};

//TO SEARCH PRODUCT FOR CUSTOMERS----------------------------
let onSearchProduct = (event) => {
  let inputText = searchProduct.value;
  let inputLower = inputText.toLowerCase();
  //loop all spans
  let productList = document.querySelectorAll('.card_show');
  for (let spanItem of productList) {
    // console.log(spanItem.firstChild.lastChild.firstChild.textContent);
    let productTitle = spanItem.firstChild.lastChild.firstChild.textContent.toLocaleLowerCase();

    //update the style of the span 
    let productDisplay = "";
    if (productTitle.indexOf(inputLower) === -1) {
      productDisplay = "none";
    }else {
      productDisplay = "block";
    }
    spanItem.style.display = productDisplay;
  };
};
//ON CLICK ADD TO CART ----------------------------------------
let onClickAddToCart = (event) => {
  index = event.target.parentElement.parentElement.dataset.index;
  let product = customerProducts[index];
  //To get data from user click
  userData.push(product);
  console.log(userData);
}
let userDataClick = () => {
  let userCart = userData.length;
  console.log(userCart);
  document.querySelector('article').innerHTML = userCart;
  saveData();
  loadProductUser();
};

customerProduct()

let userClicked = document.querySelector('#addToCart');
userClicked.addEventListener('click', onClickAddToCart);

//On search bar
let searchProduct = document
.querySelector('#search_bar input');
searchProduct.addEventListener('keyup', onSearchProduct)