import {addMenuItem, setLocation} from "./js/helpers.js";
var tabgroup = document.querySelectorAll('[data-component="tablist"]')[0];
var menulist = document.querySelectorAll('[data-component="menulist"]')[0];
var data = jsdata_parse(document.querySelectorAll('.hero')[0].dataset.content);

window.addEventListener('load', () => {
    try{
        var index = document.cookie.split('; ').find(row => row.startsWith('index')).split('=')[1];
    }catch(e){
        console.error("Cookie 'index' not set.");
    }

    try{
        var mylocation = document.cookie.split('; ').find(row => row.startsWith('location')).split('=')[1];
    }catch(e){
        console.error("Cookie 'location' not set.");
    }

    try{
        var numitems = jsdata_parse(document.cookie.split('; ').find(row => row.startsWith('numitems')).split('=')[1].split(','));
    }catch(e){
        console.log("No items in cart.");
    }

    if (index === undefined || index === null) {
        var index = 0;
        document.cookie = "index="+index+";max-age=31536000;";
    }
    if (mylocation === null || mylocation === undefined || mylocation === "") setLocation();
    if (numitems === undefined || numitems === null) {
        var numitems = {};
        document.cookie = "numitems="+numitems+";max-age=31536000;";
    }
    var locationinfo = document.querySelector("h4.locationinfo");
    locationinfo.innerHTML = "Delivering to: "+ mylocation;

    var changeloc = document.getElementById("changeloc");
    changeloc.addEventListener("click", () => {
        setLocation();});
    populateMenu(numitems);
    updateTab(index);

    addToCart(numitems);
})


function updateTab(index){
    tabgroup.children[index].classList.add('active');
    menulist.children[index].classList.add('active');

    tabgroup.addEventListener("click", event => {
        tabgroup.children[index].classList.remove('active');
        menulist.children[index].classList.remove('active');
        index = [...event.target.parentElement.children].indexOf(event.target);
        tabgroup.children[index].classList.add('active');
        menulist.children[index].classList.add('active');
        document.cookie = "index="+index+";max-age=31536000;";
    })
}


function populateMenu(numitems){
    for (var j=0; j<data.length; j++){
        addMenuItem(data[j], menulist.children[parseInt(data[j]['category'])], numitems);
    }
}


function addToCart(numitems){
    var additem = document.querySelectorAll(".additem");
    additem.forEach(item =>{
        item.addEventListener("click", () =>{
            var p = item.parentElement.children[1];
            if (parseInt(p.innerHTML) <= 0 || p.innerHTML === ""){
                p.innerHTML = "1";
            }else{
                p.innerHTML = parseInt(p.innerHTML) + 1;
            }
            numitems[item.parentElement.parentElement.dataset.id] = p.innerHTML;
            document.cookie = "numitems=" + JSON.stringify(numitems);
        })
    })

    var removeitem = document.querySelectorAll(".removeitem");
    removeitem.forEach(item =>{
        item.addEventListener("click", () =>{
            var p = item.parentElement.children[1];
            if (parseInt(p.innerHTML) <= 1 || p.innerHTML === ""){
                p.innerHTML = "";
            }else{
                p.innerHTML = parseInt(p.innerHTML) - 1;
            }
            numitems[item.parentElement.parentElement.dataset.id] = p.innerHTML;
            document.cookie = "numitems=" + JSON.stringify(numitems);
        })
    })
}
export {addMenuItem, addToCart};