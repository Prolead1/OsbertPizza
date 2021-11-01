import {addMenuItem, setLocation} from "./js/helpers.js";
var data = JSON.parse(document.querySelectorAll('.hero')[0].dataset.content);
var mapping = {};
for (var i = 0; i < data.length; i++) {
    mapping[data[i]["menuid"]] = i;
}
window.addEventListener('load', () => {
    try{
        var numitems = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('numitems')).split('=')[1].split(','));
    }catch(e){
        console.error("Cookie 'numitems' not set.");
    }
    try{
        var mylocation = document.cookie.split('; ').find(row => row.startsWith('location')).split('=')[1];
    }catch(e){
        console.error("Cookie 'location' not set.");
    }

    if (mylocation === null || mylocation === undefined || mylocation === "") setLocation();

    var locationinfo = document.querySelector("h4.locationinfo");
    locationinfo.innerHTML = "Delivering to: "+ mylocation;

    if (numitems === undefined || numitems === null) {
        emptyCart();
    }else{
        populateCart(numitems);
        calcTotal(numitems);
        addToCart(numitems);
    }
    var changeloc = document.querySelector("#changeloc");
    changeloc.addEventListener("click", (event) =>{
        event.preventDefault();
        setLocation()});
});
function calcTotal(numitems) {
    var carttotal = document.querySelector("#carttotal");
    carttotal.innerHTML = "";
    var info = 0;
    Object.keys(numitems).forEach((key) => {
        if (numitems[key] !== ""){
            info = parseFloat(data[mapping[key]]["price"])*parseInt(numitems[key]) + info;
        }
    });
    if (info > 0) {
        info = info.toFixed(2);
        carttotal.innerHTML = "Cart Total: S$" + info;
    }
}
function populateCart(numitems){
    var cart = document.querySelectorAll('.cart')[0];
    cart.innerHTML = "";
    Object.keys(numitems).forEach((key) => {
        if (numitems[key] !== ""){
            console.log(key, data[mapping[key]]);
            addMenuItem(data[mapping[key]], cart, numitems);
        }else{
            emptyCart();
        }
    })
}

function emptyCart(){
    var cart = document.querySelectorAll('.cart')[0];
    cart.innerHTML = "";
    var form = document.querySelector("#makepayment");
    form.innerHTML = "";
    var menu = document.createElement("a");
    menu.href = "./menu.php";
    menu.innerHTML = "No items added to cart. <br>Click here to add some items from Menu<br><br><br>";
    cart.appendChild(menu);
}

function addToCart(numitems){
    var additem = document.querySelectorAll(".additem");
    additem.forEach(item =>{
        item.addEventListener("click", () =>{
            var p = item.parentElement.children[1];
            if (parseInt(p.innerHTML) <= 0){
                p.innerHTML = "1";
            }else{
                p.innerHTML = parseInt(p.innerHTML) + 1;
            }
            numitems[item.parentElement.parentElement.dataset.id] = p.innerHTML;
            document.cookie = "numitems=" + JSON.stringify(numitems);
            calcTotal(numitems);
        })
    })

    var removeitem = document.querySelectorAll(".removeitem");
    removeitem.forEach(item =>{
        item.addEventListener("click", () =>{
            var p = item.parentElement.children[1];
            if (parseInt(p.innerHTML) <= 1){
                p.innerHTML = "";
                emptyCart();
            }else{
                p.innerHTML = parseInt(p.innerHTML) - 1;
            }
            numitems[item.parentElement.parentElement.dataset.id] = p.innerHTML;
            document.cookie = "numitems=" + JSON.stringify(numitems);
            calcTotal(numitems);
        })
    });}
