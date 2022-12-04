let customerProducts = JSON.parse(localStorage.getItem('products'));
const dom_products_container = document.querySelector('.dom_product_container')
let inputRadios = document.querySelectorAll('input[type=radio]')

let userData = [];
let valueFromstorage = () => {
  customerProducts = JSON.parse(localStorage.getItem('products'));
};
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
  if (customerProducts != null) {
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
      laptop_img.src = product.image;
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
      // description_link.href = 'pages/detail/detail_product.html';
      description_link.href = '#';
      description_link.addEventListener('click',onClickDetail);
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
  }
  valueFromstorage()
};

// Categories ----------------------------
function categories(value) {
  if (value === 'all') {
    customerProducts = customerProducts;
  }else {
    let getFilter = customerProducts.filter(item=>{return item.type === value})
    customerProducts = getFilter
  }
  customerProduct()
}

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
  let objDetails = {}
  let quantity = 0
  index = event.target.parentElement.parentElement.dataset.index;
  let product = customerProducts[index];
  if(userData.length===0){
    quantity += 1
    objDetails.quantity = quantity;
    objDetails.index = index
    objDetails.product = product
    userData.push(objDetails);
  }
  else{
    let checkExisting = userData.filter(item=>{return item.index === index})
    if(checkExisting.length ===1){
      checkExisting[0].quantity += 1
    }else {
      quantity += 1
    objDetails.quantity = quantity;
    objDetails.index = index
    objDetails.product = product
    userData.push(objDetails);
    }
  }
  //To get data from user click
  saveUserData()
  // userDataClick
  userDataClick()
}
//count the number of product==================================
//To count the number of products user clicked on
let userDataClick = () => {
  let userCart = userData.length;
  document.querySelector('#cart').textContent = userCart;
  // console.log(userCart);
  // onClickAddToCart();
  // loadProductUser();
};


let saveUserData = () => {
  localStorage.setItem('userData', JSON.stringify(userData));

}
//store product detail in local storage==============
let myProductDetail = [];
let saveDetail = () => {
  localStorage.setItem('myProductDetail', JSON.stringify(myProductDetail));
};
//To access data that user want to click on description detail==============
let onClickDetail = (event) => {
  myProductDetail =[]
  index = event.target.parentElement.parentElement.parentElement.parentElement.dataset.index;
  let detail = customerProducts[index];
  myProductDetail.push(detail);
  // myProductDetail = [];
  console.log(myProductDetail);
  saveDetail();
};

// let imgeUpload = ''
// let loadFile=(event)=>{
//   let file = event.target.files[0]
//   let reader = new FileReader()
//   reader.addEventListener("load", () => {
//     imgeUpload = reader.result;
//   });
//   reader.readAsDataURL(file);
// }

customerProduct()
let searchProduct = document
.querySelector('#search_bar input');
searchProduct.addEventListener('keyup', onSearchProduct)
inputRadios.forEach(element => {element.addEventListener('click',function () {categories(element.value)})});
// productImage.addEventListener('click',function(){uploadFile()})
valueFromstorage()
