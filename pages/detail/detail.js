let product_detail = JSON.parse(localStorage.getItem('myProductDetail')); 
const dom_product_detail = document.querySelector('#productCart');
let renderProductDetail = () => {
  let dom_product_container = document.querySelector('.cart_container');
  dom_product_container.remove();
  dom_product_container = document.createElement('div');
  dom_product_container.className = 'cart_container';
  //loop to create card for detail product
  for (let index = 0; index < product_detail.length; index++) {
    
    let product = product_detail[index];
    let cartDetail = document.createElement('div');
    cartDetail.className = 'cartDetail';
    dom_product_container.appendChild(cartDetail);

    let product_image = document.createElement('div');
    product_image.className = 'product_image';
    cartDetail.appendChild(product_image);

    let my_product = document.createElement('img');
    my_product.src = product.image;
    product_image.appendChild(my_product);

    let detail = document.createElement('div');
    detail.className = 'detail';
    cartDetail.appendChild(detail);

    let detail_more = document.createElement('div');
    detail_more.className = 'detail_more';
    detail.appendChild(detail_more);

    let name = document.createElement('p');
    name.textContent = `Brand: ${product.name}`;
    detail_more.appendChild(name);

    let type = document.createElement('p')
    type.textContent = product.type;
    detail_more.appendChild(type);

    let description = document.createElement('p')
    description.textContent = product.description;
    detail_more.appendChild(description);

    let price = document.createElement('p')
    price.textContent = `Price: ${product.price} ${product.currency}`
    detail_more.appendChild(price);

    let btn = document.createElement('div');
    btn.className = 'btn';
    detail.appendChild(btn);

    let cancel = document.createElement('div');
    cancel.className = 'cancel';
    btn.appendChild(cancel);

    let a = document.createElement('a');
    a.href = "../../index.html";
    cancel.appendChild(a);

    let buttonCancel = document.createElement('button');
    buttonCancel.textContent = 'Cancel';

    let add = document.createElement('div');
    add.className = 'add';
    btn.appendChild(add);

    // let buttonAdd = document.createElement('button');
    // buttonAdd.textContent = 'Add To Cart';
    // buttonAdd.addEventListener('click', addToCard)
    // add.appendChild(buttonAdd);
  }
  dom_product_detail.appendChild(dom_product_container);
  console.log(dom_product_detail);
}
renderProductDetail()
