let customer = JSON.parse(localStorage.getItem('products'));

console.log(customer);
let onSearchProduct = (event) => {
  let inputText = searchProduct.value;
  console.log(inputText);
  let inputLower = inputText.toLowerCase();
  //loop all spans
  let productList = document.querySelectorAll('.card');
  // console.log(productList);
  for (let spanItem of productList) {
    console.log(spanItem.firstChild.lastChild.firstChild.textContent);
    let productTitle = spanItem.firstChild.lastChild.firstChild.textContent.toLocaleLowerCase();

    //update the style of the span 
    let productDisplay = "";
    // console.log(productTitle.indexOf (inputLower));
    if (productTitle.indexOf(inputLower) === -1) {
      productDisplay = "none";
    }else {
      productDisplay = "block";
    }
    spanItem.style.display = productDisplay;
  };
};

let searchProduct = document
.querySelector('#search_bar input');
searchProduct.addEventListener('keyup', onSearchProduct)