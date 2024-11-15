 const nav=document.getElementById('nav')
const addToCart=document.getElementById('addToCart')
const close=document.getElementById('close');
addToCart.addEventListener('click', ()=>{
    nav.style.transform='translateX(0)'
})
close.addEventListener('click', ()=>{
     nav.style.transform='translateX(100%)'
})

//card fetching here
const grid=document.getElementById('grid')
let cart=[]
let total=0
let dataproduct;

fetch('./data.json').then( (response) => response.json()).then((data)=>{
    console.log(data);
    dataproduct=data;
    ProductDisplay(data)
    Categorys(data)
   
});

function ProductDisplay(data){
    
    data.forEach(function(product){
        const card=document.createElement('div')
        card.className="bg-white rounded-md overflow-hidden shadow-md grid gap-2"
        card.innerHTML=` <div class="relative">
                    <img src="${product.image.mobile}" alt="" class="w-full h-72">
                    <div class="bg-white rounded-xl absolute bottom-[-15px]  gap-2  p-2 border-[1px] border-stone-300 left-32 hover:shadow-md hover:text-stone-950 md:left-16">
                        <a href="#" onclick="addCart(${product.id})" class="flex gap-2 add" id='add-${product.id}'><img src="../img/icon-add-to-cart.svg" alt=""><span class="text-lg"> Add to Cart</span></a>
                        <p id='added-cart-${product.id}' class="added-cart text-stone-600 text-lg" style='display:none'>Added in Cart</p>
                    </div>
                </div>
                <div class="p-4 grid gap-2"> 
                    <h2 class="text-stone-400">${product.category}</h2>
                    <h1 class="text-stone-800 text-lg">${product.name}</h1>
                    <p class="text-stone-500 font-semibold"><b style='color:chocolate'>$</b> ${product.price}</p>
                </div>`


        grid.appendChild(card)
    })
    
}
function addCart(id){

    
    const product=dataproduct.find(p => p.id===id);
    const cartitem=cart.find(item => item.id===id);
    if(cartitem ){
      cartitem.qty +=1
    }else{
     cart.push({...product, qty:1}); 
    }
    document.getElementById(`added-cart-${id}`).style.display='block'
    document.getElementById(`add-${id}`).style.display='none'
    document.getElementById('empty').style.display='none'
     document.getElementById('title').style.display='block'
        document.getElementById('Confirme').style.display='block'
        document.getElementById('amount-sec').style.display='flex'
     UpdateCartUI();
}
function UpdateCartUI(){
    let count=0
    total=cart.reduce( (acc,item) => acc + item.price * item.qty,0)
    const showcart=document.getElementById("show-cart");
    showcart.innerHTML=''
    cart.forEach(function(item){
      if(item.qty==0){
        document.getElementById('empty').style.display='block'
        document.getElementById('title').style.display='none'
        document.getElementById('Confirme').style.display='none'
        document.getElementById('amount-sec').style.display='none'
      }else{
        count +=item.qty
        const list=document.createElement('div')
        list.className=" w-full flex justify-between items-center mt-4 border-b-2 border-b-stone-100 py-2";
        list.innerHTML=`<div class="flex gap-2">
                            <img src="${item.image.thumbnail}" alt="" class="w-8 h-8">
                            <div class="gap-2">
                                <h2 class="text-stone-800">${item.name}</h2>
                                <p class="text-stone-400 font-semibold text-sm">$ ${item.price * item.qty}</p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <span class="w-6 h-6 cursor-pointer bg-white shadow-lg border-[1px] border-stone-200 rounded-full flex justify-center items-center text-lg" onclick='decrease(${item.id})'>-</span> <strong id='setqty'>${item.qty}</strong> <span  class="w-6 h-6 bg-white shadow-lg border-[1px] border-stone-200 rounded-full flex justify-center items-center text-lg cursor-pointer" onclick="increase(${item.id})">+</span>
                        </div>`
                        showcart.appendChild(list)
      }
    })
    document.getElementById("count").innerHTML=count
    
    document.getElementById('total').innerHTML=`$ ${total}`
}

function decrease(id){
    const cartiem=cart.find(item => item.id ===id);
    if(cartiem.qty==0){
        removeFromCart(id)
    }else{
        cartiem.qty -=1
        if(cartiem.qty==0){
             document.getElementById(`added-cart-${id}`).style.display='none'
             document.getElementById(`add-${id}`).style.display='flex'
        }else{
            document.getElementById('setqty').innerHTML=` ${cartiem.qty}`
        }
        UpdateCartUI()
    }  
}

function increase(id){
    const cartitem=cart.find(item => item.id===id);
    if(cartitem){
        cartitem.qty +=1
       document.querySelector('strong').textContent=` ${cartitem.qty}`
        UpdateCartUI()
    }
}

function removeFromCart(id){
    cart=cart.filter(item => item.id !==id)
    document.getElementById(`added-cart-${id}`).style.display='none'
    document.getElementById(`add-${id}`).style.display=' flex'
    UpdateCartUI()
}
// popup section here


const overlay=document.getElementById('overlay')
const popup= document.getElementById("popup")
const btn=document.getElementById('Confirme');
const closepopup=document.getElementById('closePopup');
const Start=document.getElementById("NewStart")
btn.addEventListener('click',function(e){
    overlay.style.display='block'
    popup.style.display='grid'
})
closepopup.addEventListener('click',(e)=>{
    overlay.style.display='none'
    popup.style.display='none'
    document.querySelector('.added-cart').style.display='flex'
    document.querySelector('.add').style.display='none'
    cart=[]
    UpdateCartUI()
})
overlay.addEventListener('click',(e)=>{
    overlay.style.display='none'
    popup.style.display='none'
      document.querySelector('.added-cart').style.display='flex'
    document.querySelector('.add').style.display='none'
    cart=[]
    UpdateCartUI()
})

Start.addEventListener('click',(e)=>{
    overlay.style.display='none'
    popup.style.display='none'
    document.querySelector('.added-cart').style.display='none'
    document.querySelector('.add').style.display='flex'
    console.log(document.querySelector('.added-cart'));
    
    cart=[]
    UpdateCartUI()
})

// product category


function Categorys(data){
    const category=document.getElementById('Category');
data.forEach(function(item){
     const ul=document.createElement('ul')
     ul.className="text-center"
     ul.innerHTML=`<li class="my-4 text-stone-700 hover:text-stone-950 text-lg font-medium md:text-left"><a href="#"> ${item.category}</a></li>`
     category.appendChild(ul)
     document.getElementById("counts").innerHTML=item.id
})
}