const product_view = document.querySelector(".product_view");
const dom_product_dialog = document.querySelector('.product_dialog')
let info = document.querySelectorAll('.infoRequired');
//DATA-----------------------------------------------------
let products = [
  {
    name: 'MAC BOOK Pro 2022',
    type: 'MSI',
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    price: 999.99,
    currency: '$',
    image: 'https://o.remove.bg/downloads/2ebea5ba-9ec7-471d-8afb-41c1f70ac5f8/51dafnlz6wL._AC_SX450_-removebg-preview.png'
  },
  {
    name: 'ASUS Gaming',
    type: 'ASUS',
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    price: 1100.99,
    currency: '$',
    image: 'https://dlcdnwebimgs.asus.com/gain/3BF8E8FB-3ABB-4DE1-92C6-210B28AC331A'
  },
  {
    name: 'ASUS Gaming 2020',
    type: 'ASUS',
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    price: 1100.99,
    currency: '$',
    image: 'https://o.remove.bg/downloads/86432458-8709-441c-a5d3-927b21f94539/663-6636742_asus-rog-zephyrus-s-gx502gw-xb76-class-asus-removebg-preview.png'
  },
  {
    name: 'Microsoft Surface',
    type: 'Microsofe Surface',
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    price: 1999.99,
    currency: '$',
    image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQX?ver=1f00'
  },
  {
    name: 'MSI 2020',
    type: 'MSI',
    description: 'Core i5,RAM 8GB,Core 4, Thread 6, SSD 512GB',
    price: 499.99,
    currency: '$',
    image: 'https://storage-asset.msi.com/event/2020/nb/2020-Q3-amd-raise-the-game-nb/images/MSI_NB_Bravo_17_RGB.png'
  }
];


//get index--------------------
let productLength = products.length;
// let productToUpdate = null;
//HIDE AND SHOW -------------------------------------------
let hide = (element) => {
  element.style.display = "none";
};
let show = (element) => {
  element.style.display = "block";
};

//Local Storage----------------------------------------------
let saveProducts = () => {
  localStorage.setItem('products', JSON.stringify(products));
};

let loadProducts = () => {
  let productStorage = JSON.parse(localStorage.getItem('products'));
  if (productStorage !== null) {
    products = productStorage;
  }
};

// EDIT ====================================================
let renderProducts = () => {
  let dom_product_container = document.querySelector('#products_container');
  dom_product_container.remove();
  dom_product_container = document.createElement("div");
  dom_product_container.id = "products_container";
  for (let index = 0; index < products.length; index++) {
    let product = products[index];

    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    let productInfo = document.createElement('div');
    productInfo.className = 'product_info';

    // //Create image
    let image_container = document.createElement('div');
    image_container.className = 'img_show';
    productInfo.appendChild(image_container);
    let product_img = document.createElement('img');
    product_img.src = product.image;
    image_container.appendChild(product_img);

    //create a new div to detail more about product--------------------
    let detail = document.createElement('div');
    detail.className = 'detail';
    productInfo.appendChild(detail);

    let names = document.createElement('p');
    names.className = 'name';
    names.textContent = product.name + ' ' + product.type;
    detail.appendChild(names);
    //for detailing more information
    let description = document.createElement('p');
    description.className = 'description';
    description.textContent = product.description;
    detail.appendChild(description);

    let price = document.createElement('p');
    price.className = 'price';
    price.textContent = 'Price: ' + product.price + ' ' + product.currency;
    detail.appendChild(price);

    // create a new div for button update and delete-------------
    let action = document.createElement('div');
    action.className = 'actions';
    // create a new img for button update and delete
    let btn_update = document.createElement('img');
    btn_update.dataset.index = index;
    btn_update.src = '../../images/update.png';
    btn_update.addEventListener('click', updateProduct)
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


let canCreate = true;
let showDataInputUpdate = (data) => {
  let product_name = document.getElementById('name');
  product_name.value = data.name
  let product = document.querySelector('.product_info img');
  product.value = data.image
  let product_type = document.getElementById('type');
  product_type.value = data.type
  let product_description = document.getElementById('text');
  product_description.value = data.description
  let product_price = document.getElementById('productPrice');
  product_price.value = data.price
  let currency = document.getElementById('currency');
  currency.value = data.currency
  // let choose_img = document.getElementById('productImage');
  return { "data": data }
}

let clearInput = () => {
  let product_name = document.getElementById('name');
  product_name.value = ''
  let product = document.querySelector('.product_info img');
  product.value = ''
  let product_type = document.getElementById('type');
  product_type.value = ''
  let product_description = document.getElementById('text');
  product_description.value = ''
  let product_price = document.getElementById('productPrice');
  product_price.value = ''
  let currency = document.getElementById('currency');
  currency.value = 'no'

}
let updateProduct = (event) => {
  //get product index
  canCreate = false
  index = event.target.parentElement.parentElement.dataset.index;
  let product = products[index];
  showDataInputUpdate(product)
  document.querySelector('#createEditButton').textContent = 'Update';
  info.forEach((element,index) => {
    manageInfo(index, 'hide')    
  });
  show(dom_product_dialog);
}
let removeProduct = (event) => {
  index = event.target.parentElement.parentElement.dataset.index;
  // remove product
  products.splice(index, 1);

  //save to local storage 
  saveProducts()

  //update to the view
  renderProducts();
}
let onAddProduct = () => {
  info.forEach((element,index) => {
    manageInfo(index, 'hide')
  });
  clearInput()
  show(dom_product_dialog)
  document.getElementById('createEditButton').textContent = 'Create';
};
//Search products-------------------------------------------
let onSearchProduct = (event) => {
  let inputText = searchProduct.value;
  let inputLower = inputText.toLowerCase();
  //loop all spans
  let productList = document.querySelectorAll('.card');
  // console.log(productList);
  for (let spanItem of productList) {
    let productTitle = spanItem.firstChild.lastChild.firstChild.textContent.toLocaleLowerCase();
    //update the style of the span 
    let productDisplay = "";
    // console.log(productTitle.indexOf (inputLower));
    if (productTitle.indexOf(inputLower) === -1) {
      productDisplay = "none";
    } else {
      productDisplay = "block";
    }
    spanItem.style.display = productDisplay;
  };
};
//Cancel and Add -------------------------------------------
// Manager info input required

let manageInfo = (indexInfo, action) => {
  if (action === 'show') {
    info[indexInfo].style.display = 'flex'
    info[indexInfo].parentElement.firstChild.nextSibling.style.border = '3px solid red';
  }
  else {
    info[indexInfo].style.display = 'none'
    info[indexInfo].parentElement.firstChild.nextSibling.style.border = '3px solid #e3e1e1';
  }
}
let onCancel = (e) => {
  hide(dom_product_dialog);
}
let onCreateProduct = () => {
  let product_name = document.getElementById('name').value;
  let product_type = document.getElementById('type').value;
  let product_description = document.getElementById('text').value;
  let product_price = document.getElementById('productPrice').value;
  let currency = document.getElementById('currency').value;
  let objData = {
    name: product_name,
    type: product_type,
    description: product_description,
    price: product_price,
    currency: currency,
    image: imgeUpload
  }
  imgeUpload = ''
  // check required input
  let product_input = product_name !== '' && product_type !== '' && product_price !== '' && currency !== 'no';
  if (product_input) {
    if (canCreate) {
      products.push(objData);
      products.reverse()
    }
    else{
      // Update vai index 
      products[index] = objData;
      canCreate = true
    }
    console.log('dd', products);
    hide(dom_product_dialog);
    //save to local storage
    saveProducts();
    // update to the view
    renderProducts()
    // clear input 
    clearInput()

  } else {
    if (product_name === '') {
      manageInfo(0, 'show')
    }
    else {
      manageInfo(0, 'hide')
    }
    if (product_type === '') {
      manageInfo(1, 'show')
    }
    else {
      manageInfo(1, 'hide')
    }
    if (product_price === '') {
      manageInfo(2, 'show')
    }
    else {
      manageInfo(2, 'hide')
    }
    if (currency === 'no') {
      manageInfo(3, 'show')
    }
    else {
      manageInfo(3, 'hide')
    }
  }

}
let imgeUpload = ''
let loadFile=(event)=>{
  let file = event.target.files[0]
  let reader = new FileReader()
  reader.addEventListener("load", () => {
    imgeUpload = reader.result;
  });
  reader.readAsDataURL(file);
}
saveProducts()
loadProducts();
renderProducts();

let searchProduct = document
  .querySelector('#search_bar input');
searchProduct.addEventListener('keyup', onSearchProduct)
let btn_add = product_view.querySelector('#add_product');
btn_add.addEventListener('click', onAddProduct);