const productCart = document.getElementById('productCart');
let totalH2 = document.querySelector('.total_price h2'); 
let card_number = document.querySelector('.card_number input');
let card_name = document.querySelector('.card_name input')
let card_expired = document.querySelector('.card_expired input')
let cardRequired = document.querySelectorAll('.cardRequired');
let card_checkout = document.querySelector(".check_out_content");
let submit = document.querySelector('input[type=submit]');

//Get data from local storage
let userCartProduct = JSON.parse(localStorage.getItem('userData'));;
let saveUserData = () => {
  userCartProduct = JSON.parse(localStorage.getItem('userData'));

}
console.log('userCartProduct',userCartProduct);
// CREATE=========================================
let totalPrice = 0;
//calculate total price===========================
let calculateTotal = (quantity, price) => {
  let calculate = quantity * price
  let result  = totalPrice - calculate
  totalPrice = result
};
let renderProductCart = () => {
  totalPrice = 0
  // saveUserData()
  let cartContainer = document.querySelector('.cart_container');
  cartContainer.remove();
  cartContainer = document.createElement('div');
  cartContainer.className = 'cart_container';
  //Loop to create all element in card
  for (let index = 0 ; index < userCartProduct.length; index++) {
    let product = userCartProduct[index];
    let cartDetail = document.createElement('div');
    cartDetail.className = 'cartDetail';
    cartDetail.dataset.index = product.index;
    cartContainer.appendChild(cartDetail);

    let product_img = document.createElement('div');
    product_img.className = 'product_image';
    cartDetail.appendChild(product_img);

    let img_laptop = document.createElement('img');
    img_laptop.src = product.product.image;
    product_img.appendChild(img_laptop);
    let detail = document.createElement('div');
    detail.className = 'detail';
    cartDetail.appendChild(detail);

    let detail_more = document.createElement('div');
    detail_more.className = 'detail_more';
    detail.appendChild(detail_more);

    let brand = document.createElement('P');
    brand.textContent = `Brand:${product.product.name}`;
    detail_more.appendChild(brand);

    let typeModel = document.createElement('p');
    typeModel.textContent = 'Type Model: ' + product.product.type;
    detail_more.appendChild(typeModel);

    let description = document.createElement('p');
    description.textContent = product.product.description;
    detail_more.appendChild(description);

    let price = document.createElement('p');
    totalPrice += product.product.price *  product.quantity; 
    price.textContent = `Price: ${product.product.price} ${product.product.currency}` ;
    detail_more.appendChild(price);

    let pQuantity = document.createElement('p')
    pQuantity.textContent =`Quantity: ${product.quantity}` 
    detail_more.appendChild(pQuantity)
   
    let btn = document.createElement('div');
    btn.className = 'btn';
    detail.appendChild(btn);

    let btn_buy = document.createElement('div');
    btn_buy.className = 'add';
    btn.appendChild(btn_buy);

    let button = document.createElement('button');
    button.textContent = 'BUY NOW';
    btn_buy.appendChild(button);

    let btn_delete = document.createElement('div');
    btn_delete.className = 'delete_card';
    btn_delete.addEventListener('click', removeCart);
    cartDetail.appendChild(btn_delete)
    let img_delete = document.createElement('img');
    img_delete.src = "../../images/delete.png";
    btn_delete.appendChild(img_delete)
  }
  totalH2.textContent = `Total:  ${totalPrice} $`
  productCart.appendChild(cartContainer);
  console.log(cartContainer);
};
let removeCart = (event) => {
// console.log(event.target.parentElement.parentElement.dataset.index);
  let index = event.target.parentElement.parentElement.dataset.index;
  userCartProduct.forEach((element,indexId) => {
    if(index === element.index){
      calculateTotal(element.quantity, element.product.price)
      userCartProduct.splice(indexId,1)
    }
  });
 //Remove cart product from cart
//  //updat the view
   renderProductCart() 
}
let manageInfo = (indexInfo, action) => {
  if (action === 'show') {
    cardRequired[indexInfo].lastChild.previousSibling.style.display = 'flex'
    cardRequired[indexInfo].firstChild.nextSibling.style.border = '3px solid red';
  }
  else {
    cardRequired[indexInfo].lastChild.previousSibling.style.display = 'none'
    cardRequired[indexInfo].firstChild.nextSibling.style.border = '3px solid #e3e1e1';
  }
}

let submitCheckOut=()=>{
  if(card_number.value.length != 9){
    card_number.style.border = '3px solid red'
    card_number.style.online = 'none'
  }
  if(card_name.value ===''){
    manageInfo(0, 'show')
  }
  else{
    manageInfo(0, 'hide')
  }
  if(card_expired.value ===''){
    manageInfo(2, 'show')
  }
  else{
    manageInfo(2, 'hide')
  }
  if(card_name.value !=='' && card_number.value.length ===9 && card_expired.value !==''){
    hide(card_checkout)  
    clearInputCard()
  }
  
}
let clearInputCard =()=>{
  card_name.value = ""
  card_expired.value = ""
  card_number.value = ""
}
let cardValidate =()=>{
  if(card_number.value.length >9){
    card_number.style.border = '3px solid red'
    card_number.style.online = 'none'
  }else{
    card_number.style.border = '3px solid #e3e1e1'
    card_number.style.online = 'none'

  }
}
let hide = (element) => {
  card_checkout.style.display = 'none'
  element.style.display = "none";
};
let show = (element) => {
  element.style.display = "block";
};
let showCard = () => {
  show(card_checkout);
};

renderProductCart()

let show_card = document.querySelector(".total_price button");
show_card.addEventListener('click', showCard)



let removeMyCart = document.querySelector('.delete_card');
removeMyCart.addEventListener('click', removeCart); 
card_number.addEventListener('keyup', cardValidate)