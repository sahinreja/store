
let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Cannon EOS',
        imgaeName:'1.png',
        price:36000.00,
        inCart:0
    },
    {
        name:"Nikon EOS",
        imgaeName:'2.png',
        price:40000.00,
        inCart:0
    },
    {
        name:"Sonny DSLR",
        imgaeName:'1.png',
        price:50000.00,
        inCart:0
    },
    {
        name:"LG DSLR",
        price:50000.00,
        imgaeName:'1.png',
        inCart:0
    },
    {
        name:"Titan Model #1",
        imgaeName:'1.png',
        price:13000.00,
        inCart:0
    },
    {
        name:"Titan Model #",
        imgaeName:'1.png',
        price:10000.00,
        inCart:0
    },
    {
        name:"Titan Model #3",
        imgaeName:'1.png',
        price:13000.00,
        inCart:0
    },
    {
        name:"Titan Model #4",
        imgaeName:'1.png',
        price:9000.00,
        inCart:0
    },
    {
        name:"T-Shirt",
        imgaeName:'1.png',
        price:800.00,
        inCart:0
    },
    {
        name:"Stylish Shirt",
        imgaeName:'1.png',
        price:900.00,
        inCart:0
    },
    {
        name:"Party Shirt",
        imgaeName:'1.png',
        price:1200.00,
        inCart:0
    },
    {
        name:"Kurta Shirt",
        imgaeName:'1.png',
        price:1200.00,
        inCart:0
    }
];
let user = sessionStorage.getItem('username')
// console.log(user);
document.getElementById('demo').textContent = `${user}`;


for(let i=0;i<carts.length;i++){
    let btn = carts[i];
    btn.disabled = false;
    carts[i].addEventListener('click',()=>{
        let product  = products[i];
        curtNumbers(product);
        totalCost(product);
        btn.disabled = true;
        btn.classList.add('dis');
    })
}

function onLoadCurtnumber(){
    let productNumber  = sessionStorage.getItem('cartNumbers');

    if(productNumber){
        document.querySelector('.badge').textContent = productNumber;
    }
}


function curtNumbers(product){

    let productNumber = sessionStorage.getItem('cartNumbers')
    productNumber = parseInt(productNumber);

    if(productNumber){
        sessionStorage.setItem('cartNumbers', productNumber + 1);
        document.querySelector('.badge').textContent = productNumber + 1;
    }else{
        sessionStorage.setItem('cartNumbers',1);
        document.querySelector('.badge').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name] : product
            }
        }
        cartItems[product.name].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
        [product.name]:product
    }
    }
    sessionStorage.setItem('productsInCart',JSON.stringify(cartItems));
   
}

function totalCost(product){
    // console.log("The product price is " + product.price);
    let cartCost = sessionStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        sessionStorage.setItem('totalCost', cartCost + product.price)
    }else{
        sessionStorage.setItem('totalCost',product.price);
    }
}
function removeItem(val){
    let cart = sessionStorage.getItem('productsInCart');
    let cartNumbers = sessionStorage.getItem('cartNumbers');
    let totalCost = sessionStorage.getItem('totalCost');
    cart = JSON.parse(cart);
    cartNumbers = JSON.parse(cartNumbers);
    totalCost = JSON.parse(totalCost);
    // console.log(cart , cartNumbers , totalCost);
    // console.log(val.price);
    let removeItemPrice = Object.values(cart).find((item)=>item.name == val).price;
    let removeItemCartNo = Object.values(cart).find((item)=>item.name == val).inCart;
    if(removeItemCartNo == 1){
        totalCost -= removeItemPrice;
        cartNumbers -= removeItemCartNo;
    }else{
        totalCost -= removeItemCartNo*removeItemPrice
        cartNumbers -= removeItemCartNo;
    }
    // console.log(Object.values(cart).find((item)=>item.name == val).price);
    // console.log(Object.values(cart).filter((item)=>item.name != val));
    let newCart = Object.values(cart).filter((item)=>item.name != val)
    sessionStorage.setItem('productsInCart',JSON.stringify(newCart));
    sessionStorage.setItem('totalCost',JSON.stringify(totalCost));
    sessionStorage.setItem('cartNumbers',JSON.stringify(cartNumbers));
    onLoadCurtnumber();
    displayCart();
}

function increment(val){
    let cart = sessionStorage.getItem('productsInCart');
    let cartNumbers = sessionStorage.getItem('cartNumbers');
    let totalCost = sessionStorage.getItem('totalCost');
    cart = JSON.parse(cart);
    cartNumbers = JSON.parse(cartNumbers);
    totalCost = JSON.parse(totalCost);
    let incPrice = Object.values(cart).find((item)=>item.name == val).price;
    let inCart = Object.values(cart).find((item)=>item.name == val).inCart;
    totalCost += incPrice;
    cartNumbers += 1;
    inCart += 1;
    if(inCart <= 5){
    Object.values(cart).find((item)=>item.name == val).inCart = inCart;
    sessionStorage.setItem('productsInCart',JSON.stringify(cart));
    sessionStorage.setItem('totalCost',JSON.stringify(totalCost));
    sessionStorage.setItem('cartNumbers',JSON.stringify(cartNumbers));
    onLoadCurtnumber();
    displayCart();
    }else{
        alert('Sorry ! You can not add this item more');
    }
}
function decrement(val){
    let cart = sessionStorage.getItem('productsInCart');
    let cartNumbers = sessionStorage.getItem('cartNumbers');
    let totalCost = sessionStorage.getItem('totalCost');
    cart = JSON.parse(cart);
    cartNumbers = JSON.parse(cartNumbers);
    totalCost = JSON.parse(totalCost);
    let incPrice = Object.values(cart).find((item)=>item.name == val).price;
    let inCart = Object.values(cart).find((item)=>item.name == val).inCart;
    totalCost -= incPrice;
    cartNumbers -= 1;
    inCart -= 1;
    if(inCart>=1){
        Object.values(cart).find((item)=>item.name == val).inCart = inCart;
        sessionStorage.setItem('productsInCart',JSON.stringify(cart));
        sessionStorage.setItem('totalCost',JSON.stringify(totalCost));
        sessionStorage.setItem('cartNumbers',JSON.stringify(cartNumbers));
        onLoadCurtnumber();
        displayCart();
    }else{
        alert('You should remove this item');
    }
}



function displayCart(){
    let cartItems = sessionStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products-container');
    // console.log(cartItems);
    if(cartItems && productContainer){
        // console.log('running');
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <tr>
               <td><button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')" ><i class="fas fa-trash-alt"></i></button> ${item.name}</td>
               <td>${item.price}</td>
               <td><a class="btn btn-sm btn-danger" onclick="decrement('${item.name}')"><i class="fas fa-arrow-down"></i></a> <span class="m-1 p-2 bg-dark text-white"
                >${item.inCart}</span> <a class="btn btn-sm btn-warning add-cart" onclick="increment('${item.name}')"><i class="fas fa-arrow-up"></i></a></td>
               <td>${item.price * item.inCart}</td>
            </tr>
            `;
        });
      
     let totalCost = sessionStorage.getItem('totalCost');
     let tCost = JSON.parse(totalCost);
     console.log(tCost);
     if(tCost!=0){
        productContainer.innerHTML +=`
        <tr>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>${sessionStorage.getItem('totalCost')}</td>
     </tr>
     `;
        productContainer.innerHTML += `
        <tr>
               <td></td>
               <td></td>
               <td></td>
               <td><a class="btn btn-success"  href="success.html" onclick="sessionStorage.removeItem('productsInCart');sessionStorage.removeItem('totalCost');sessionStorage.removeItem('cartNumbers');">Checkout Now</a></td>
        </tr>
        `
     }else{
        productContainer.innerHTML = `<p class="text-center my-5">Add item into cart first!</p>` 
     }
    }
}
onLoadCurtnumber();
displayCart();
