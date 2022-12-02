const productCart = document.getElementById('productCart');

//Get data from local storage
  let userCartProduct = JSON.parse(localStorage.getItem('userData'));

console.log(userCartProduct);
// CREATE=========================================
let renderProductCart = () => {
  let cartContainer = document.querySelector('.cart_container');
  cartContainer.remove();
  cartContainer = document.createElement('div');
  cartContainer.className = 'cart_container';
  //Loop to create all element in card
  for (let index = 0 ; index < userCartProduct.length; index++) {
    let product = userCartProduct[index];

    let cartDetail = document.createElement('div');
    cartDetail.className = 'cartDetail';
    cartContainer.appendChild(cartDetail);

    let product_img = document.createElement('div');
    product_img.className = 'product_image';
    cartDetail.appendChild(product_img);

    let img_laptop = document.createElement('img');
    img_laptop.src = '../../images/macBook.png';
    product_img.appendChild(img_laptop);

    let detail = document.createElement('div');
    detail.className = 'detail';
    cartDetail.appendChild(detail);

    let detail_more = document.createElement('div');
    detail_more.className = 'detail_more';
    detail.appendChild(detail_more);

    let brand = document.createElement('p');
    brand.textContent = 'Brand: ' + product.name;
    detail_more.appendChild(brand);

    let typeModel = document.createElement('p');
    brand.textContent = 'Type Model: ' + product.type;
    detail_more.appendChild(typeModel);

    let description = document.createElement('p');
    description.textContent = product.description;
    detail_more.appendChild(description);

    let price = document.createElement('p');
    price.textContent = "Price: " + product.price + product.currency;
    detail_more.appendChild(price);

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
  productCart.appendChild(cartContainer);
  console.log(cartContainer);
};
let removeCart = (event) => {
  index = event.target.parentElement.parentElement.dataset.index;
 //Remove cart product from cart
 userCartProduct.splice(index, 1);

 //updat the view
   renderProductCart() 

}

renderProductCart()
let removeMyCart = document.querySelector('.delete_card');
removeMyCart.addEventListener('click', removeCart); 