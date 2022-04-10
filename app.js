// car

let carIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

carIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

// =====================//

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // remove items
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);

  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItems);
  }
  //  quantitiy
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quanityCahge);
  }
  // add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // buy buttons
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
// buyButtonClicked
function buyButtonClicked() {
  alert("your ordered is placed");

  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updataTotal();
}
function removeCartItems(e) {
  var buttonClicked = e.target;
  buttonClicked.parentElement.remove();
  updataTotal();
}
// addCartClicked

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductTocart(title, price, productImg);
  updataTotal();
}
// quanity fouction

function quanityCahge(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updataTotal();
}
// addProductTocart
function addProductTocart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartITems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartITems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("you have aleray add this");
      return;
    }
  }

  var cartBoxContent = `
<img src="${productImg}" class="cart-img" alt="">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!-- remove cart -->
<i class='bx bx-message-alt-x cart-remove' ></i>
`;
  cartShopBox.innerHTML = cartBoxContent;
  cartITems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItems);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quanityCahge);
}
// update total price

function updataTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];

    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quanityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quanity = quanityElement.value;
    total = total + price * quanity;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// search for items

const searchInput = document.getElementById("Search");
const shopContent = document.getElementById("shop-content");
const title = shopContent.querySelectorAll(".product-box");

const value = searchInput.value;

// const titleOf = productBox.getElementsByTagName('h2')



const switherLis = document.querySelectorAll('.switcher li')
const imgs = Array.from(document.images)
const boxess = document.querySelectorAll('.product-box')
switherLis.forEach((li) => {
  li.addEventListener('click', removeActive)
  li.addEventListener('click', mangeImage)
})




function removeActive() {
  switherLis.forEach((el) => {
    el.classList.remove('active');
    this.classList.add('active')
  })
}

// mange imges
function mangeImage() {
  boxess.forEach((im) =>{
    im.style.display = 'none'
  })
  document.querySelectorAll(this.dataset.cat).forEach((i) => {
    i.style.display = 'block'
  })
}