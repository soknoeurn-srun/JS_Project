const product_view = document.querySelector(".product_view");
const dom_product_dialog = document.querySelector('.product_dialog')
//DATA-----------------------------------------------------
let products = [
  {
    name:'MSI Pro 2022',
    type:'MSI',
    description:'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    price:999.99,
    currency:'$',
    image:'c/'
  },
  {
    name:'ASUS Gaming',
    type:'ASUS',
    description:'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    price:1100.99,
    currency:'$',
    image:'c/'
  },
  {
    name:'MSI 2020',
    type:'MSI',
    description:'Core i5,RAM 8GB,Core 4, Thread 6, SSD 512GB',
    price:499.99,
    currency:'$',
    image:'c/'
  }
];

//get index--------------------
let index = products.length;
//HIDE AND SHOW -------------------------------------------
let hide = (element) => {
  element.style.display = "none";
};
let show = (element) => {
  element.style.display = "block";
};

//Local Storage----------------------------------------------
let saveProducts = () => {
  localStorage.setItem('products',JSON.stringify(products));
};

let loadProducts = () => {
  let productStorage = JSON.parse(localStorage.getItem('products'));
  if (productStorage !== null) {
    products = productStorage;
  }
};

// EDIT ====================================================
let renderProducts = () =>{
  let dom_product_container = document.querySelector('#products_container');
  dom_product_container.remove();
  dom_product_container = document.createElement("div");
  dom_product_container.id = "products_container";
  for (let index = 0 ; index < products.length; index++) {
    let product = products[index];

    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    let productInfo = document.createElement('div');
    productInfo.className = 'product_info';
    
    // //Create image
    let product_img = document.createElement('img');
    product_img.src = '../../images/macBook.png';
    productInfo.appendChild(product_img);
    
    //create a new div to detail more about product--------------------
    let detail = document.createElement('div');
    detail.className = 'detail';  
    productInfo.appendChild(detail);

    let names = document.createElement('span');
    names.className = 'name';
    names.textContent = product.name + ' ' + product.type;
    detail.appendChild(names);

    // let type = document.createElement('span');
    // type.className = 'type';
    // type.textContent = product.type;
    // detail.appendChild(type);

    let description = document.createElement('span');
    description.className = 'description';
    description.textContent = product.description;
    detail.appendChild(description);

    let price = document.createElement('span');
    price.className = 'price';
    price.textContent = 'Price: ' + product.price + ' ' + product.currency;
    detail.appendChild(price);

    // create a new div for button update and delete-------------
    let action = document.createElement('div');
    action.className = 'actions';

    let btn_update = document.createElement('img');
    btn_update.src = '../../images/update.png';
    action.appendChild(btn_update);

    let btn_delete = document.createElement('img');
    btn_delete.src = '../../images/delete.png';
    btn_delete.addEventListener('click', removeProduct)
    action.appendChild(btn_delete)
    //append child
    card.appendChild(productInfo);
    card.appendChild(action)
    dom_product_container.appendChild(card);
    // console.log(action);
  }
  product_view.appendChild(dom_product_container);

}
// let updateProduct = (event) => {
//   //get product index
//   productToUpdate = event.target.parentElement.parentElement.dataset.index;

//   // update dialog with product information
//   let product = products[productToUpdate];
//   document.
  
// }
let removeProduct = (event) => {
  let index = event.target.parentElement.parentElement.dataset.index;
  // remove product
  products.splice(index, 1);

  //save to local storage 
  saveProducts()

  //update to the view
  renderProducts()
}
let onAddProduct = () => {
  show(dom_product_dialog)
  document.getElementById('createEditButton').textContent = 'Create';
};
//Cancel and Add -------------------------------------------
let onCancel = (e) =>{
  console.log('cancel');
  console.log(dom_product_dialog);
  hide(dom_product_dialog);
}
let onCreateProduct = () => {
  let product = document.querySelector('.product_info img');
  let product_name = document.getElementById('name').value;
  console.log(product_name);
  let product_type = document.getElementById('type').value;
  let product_description = document.getElementById('text').value;
  console.log(product_description);
  let product_price = document.getElementById('productPrice').value;
  console.log(product_price);
  let currency = document.getElementById('currency').value;
  console.log(currency);
  let choose_img = document.getElementById('productImage').value;
  console.log(choose_img);

  let product_input =  product_name && product_description && product_price && currency && choose_img;
  if (!(product_input)){
    // 
    console.log('false');
  }else {
    product_input = {
      name: product_name,
      type:product_type,
      description: product_description,
      price: product_price,
      currency: currency,
    }
    products.push(product_input);
    hide(dom_product_dialog);
  }
  //save to local storage
  saveProducts();
  // update to the view
  renderProducts()
}
saveProducts()
loadProducts();
renderProducts();

let btn_add = product_view.querySelector('#add_product');
btn_add.addEventListener('click', onAddProduct);