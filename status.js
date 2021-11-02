var data = JSON.parse(document.querySelectorAll('.hero')[0].dataset.content);
try{
    var orders = JSON.parse(document.querySelectorAll('.orderitems')[0].dataset.content);
}catch(e){
    console.log("No orders found");
    var orders = {};
}

var mapping = {};
for (var i = 0; i < data.length; i++) {
    mapping[data[i]["menuid"]] = i;
}

window.addEventListener('load', () => {
    if (orders.length > 0){
        populateStatus();
        displayStatus();
    }
    else{
        var orderitems = document.querySelectorAll('.orderitems')[0];
        var a = document.createElement('a');
        a.href = "./menu.php";
        a.innerHTML = "No orders currently being processed. Head to the menu to order with us!";
        orderitems.appendChild(a);
    }
});

function populateStatus(){
    var orderitems = document.querySelectorAll('.orderitems')[0];
    if (orders){
    for (var i = 0; i < orders.length; i++) {
        if (orders[i]["status"] == "Completed"){
            continue;
        }
        var item = document.createElement('div');
        item.classList.add("item");
        var title = document.createElement('h3');
        var loc = document.createElement('p');
        var div = document.createElement('div');
        var button = document.createElement('button');
        button.classList.add("selectorder");
        orderitems.appendChild(button);
        item.appendChild(title);
        item.appendChild(loc);
        loc.appendChild(document.createTextNode("Order delivering to "+orders[i]["location"]));
        var numitems = JSON.parse(orders[i]['orders'].replaceAll('&quot;', '"'));
        var carttotal = 0;
        Object.keys(numitems).forEach((key) => {
            carttotal = carttotal + addMenuItem(data[mapping[key]], div, numitems);
        });
        button.appendChild(document.createTextNode("View Order ID: "+orders[i]["paymentid"]));
        title.appendChild(document.createTextNode("Cart total: S$"+carttotal));
        title.appendChild(document.createElement("br"));
        title.appendChild(document.createTextNode("Status: "+orders[i]["status"]));
        item.appendChild(div);
        orderitems.appendChild(item);
    };
}
}

function addMenuItem(menuinfo, menulist, numitems){
    const menuitem = document.createElement("div");
    const menuicon = document.createElement("div");
    const menuimage = document.createElement("img");
    const menuname = document.createElement("h4");
    const menudescription = document.createElement("div");
    const menuprice = document.createElement("h5");
    const menucontrol = document.createElement("div");
    const numitem = document.createElement("p");
    menuimage.src = (menuinfo["image"]);
    menudescription.appendChild(document.createTextNode(menuinfo["description"]));
    menuname.appendChild(document.createTextNode(menuinfo["name"]));
    var totalprice = parseFloat(menuinfo["price"])*parseInt(numitems[menuinfo["menuid"]]);
    menuprice.appendChild(document.createTextNode("Total: S$"+totalprice));

    if (numitems[menuinfo["menuid"]] === undefined || numitems[menuinfo["menuid"]] === "") {
        return 0;
    }else{
        numitem.appendChild(document.createTextNode("Quantity: "+numitems[menuinfo["menuid"]]));
    }

    menuitem.classList.add("menuitem");
    menuicon.classList.add("menuicon");
    menuimage.classList.add("menuimage");
    menuname.classList.add("menuname");
    menudescription.classList.add("menudescription");
    menuprice.classList.add("menuprice");
    menucontrol.classList.add("menucontrol");
    menuicon.appendChild(menuimage);
    menuicon.appendChild(menuname);
    menucontrol.appendChild(numitem);
    menuitem.appendChild(menuicon);
    menuitem.appendChild(menudescription);
    
    menuitem.appendChild(menucontrol);
    menuitem.dataset.id = menuinfo["menuid"];
    menuitem.appendChild(menuprice);
    menulist.appendChild(menuitem);
    return totalprice;
}

function displayStatus(){
    var items = document.querySelectorAll(".item");
    var buttons = document.querySelectorAll(".selectorder");
    items[0].classList.add("active");
    for (var i = 0; i < buttons.length; i++){
        var button = buttons[i];
        button.addEventListener("click", (event) => {
            var index = [...buttons].indexOf(event.target);
            console.log(index);
            if (items[index].classList.contains("active")){
                items[index].classList.remove("active");
                buttons[index].innerHTML = "View" + buttons[index].innerHTML.slice(4);
            }else{
                items[index].classList.add("active");
                buttons[index].innerHTML = "Hide" + buttons[index].innerHTML.slice(4);
            }

        });
    }
}