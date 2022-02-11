const API_URL = 'https://jsonblob.com/api/jsonBlob/941470356607352832';
const product = document.getElementById("product-wrapper")
const cart = document.getElementById("cart")
const getInfo = document.getElementById("checkCart")
const closeButton = document.getElementById("closeButton")
const checkout = document.getElementById("checkout")
const cartList = document.getElementById("cartList")
const empty = document.getElementById("empty")
const subTotal = document.getElementById("total")
let number = 0;
let total = 0;

async function getData(){
    const response = await fetch(API_URL)
    const results = await response.json()

    product.innerHTML = '';
    console.log(results);

    results.Array.forEach((element) => {
        const li = document.createElement("li")
        const img = document.createElement("img")
        const div = document.createElement("div")
        const brand = document.createElement("p")
        brand.className = "brand"
        const name = document.createElement("p")
        name.className = "name"
        const price = document.createElement("p")
        price.className = "price"
        const button = document.createElement("button")
        img.src = `${element.image}`
        brand.textContent = `${element.brand}`
        name.textContent = `${element.name}`
        price.textContent = `$ ${element.price.toLocaleString()}`
        button.textContent = "Buy Now"

        li.appendChild(img);
        li.appendChild(div);
        div.appendChild(brand);
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(button);

        product.appendChild(li);

// --------------------------------------------------------------------
// Increase the number of items
// Add info to cart
// --------------------------------------------------------------------
        button.addEventListener("click",addCart)
        function addCart(){
            if(element.boolean){
                number += 1;
                cart.innerText = `${number}`;
                alert('Added to cart')
                element.boolean = false

                if(number !== 0){
                    empty.style.display ='none';
                }

                const item = document.createElement("li")
                item.className = "item"
                const miniImage = document.createElement("img")
                miniImage.className = "miniImage"
                const div2 = document.createElement("div")
                div2.className = "div2"
                const miniName = document.createElement("p")
                const miniPrice = document.createElement("p")
                const div3 = document.createElement("div")
                div3.className = "div3"
                const miniButton = document.createElement("button")
                miniButton.className = "miniButton"
            
                miniImage.src = `${element.image}`
                miniName.textContent = `${element.name}`
                miniPrice.textContent = `$ ${element.price.toLocaleString()}`
                miniButton.textContent = '×'
            
                item.appendChild(miniImage);
                item.appendChild(div2);
                div2.appendChild(miniName);
                div2.appendChild(miniPrice);
                item.appendChild(div3);
                div3.appendChild(miniButton);

                cartList.appendChild(item);

// --------------------------------------------------------------------
// Cal total
// --------------------------------------------------------------------
                total += element.price;
                subTotal.innerText = `Total $${total.toLocaleString()}`

 // --------------------------------------------------------------------
// Delete item
// ---------------------------------------------------------------------              
                miniButton.addEventListener("click",deleteItem)
                function deleteItem(){
                    cartList.removeChild(item)
                    number -= 1;
                    cart.innerText = `${number}`;
                    element.boolean = true;
                    total -= element.price;
                    subTotal.innerText = `Total $${total.toLocaleString()}`

                    if(number === 0){
                        empty.style.display ='block';
                    }
                }
            }
// -----------------------------------------------------------------------
            else{
                alert('This car is already added')
                }
        }

        
    });
// --------------------------------------------------------------------
// View the cart
// --------------------------------------------------------------------
        cart.addEventListener("click",viewCart)
        function viewCart(){
            getInfo.style.display = 'block'
        }

// --------------------------------------------------------------------
// Close the cart
// --------------------------------------------------------------------
        closeButton.addEventListener("click", closeCart)
        function closeCart(){
            getInfo.style.display = 'none'
        }
  

// --------------------------------------------------------------------
// Close the cart
// --------------------------------------------------------------------
        checkout.addEventListener("click", check)
        function check(){
            if(number === 0){
                alert("Cart is empty!!!")
            }else{
            alert("Loading. . .")}
        }
}
getData()


