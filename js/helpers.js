
function addMenuItem(menuinfo, menulist, numitems){
    const menuitem = document.createElement("div");
    const menuicon = document.createElement("div");
    const menuimage = document.createElement("img");
    const menuname = document.createElement("h4");
    const menudescription = document.createElement("div");
    const menuprice = document.createElement("h5");
    const additem = document.createElement("button");
    const removeitem = document.createElement("button");
    const menucontrol = document.createElement("div");
    const numitem = document.createElement("p");
    // const submit = document.createElement("button");
    menuimage.src = (menuinfo["image"]);
    menudescription.appendChild(document.createTextNode(menuinfo["description"]));
    menuname.appendChild(document.createTextNode(menuinfo["name"]));
    menuprice.appendChild(document.createTextNode("S$"+menuinfo["price"]));
    additem.appendChild(document.createTextNode("+"));
    removeitem.appendChild(document.createTextNode("-"));

    if (numitems[menuinfo["menuid"]] === undefined) {
        numitem.appendChild(document.createTextNode(""));
    }else{
        numitem.appendChild(document.createTextNode(numitems[menuinfo["menuid"]]));
    }
    // submit.appendChild(document.createTextNode("Add to cart"));

    menuitem.classList.add("menuitem");
    menuicon.classList.add("menuicon");
    menuimage.classList.add("menuimage");
    menuname.classList.add("menuname");
    menudescription.classList.add("menudescription");
    menuprice.classList.add("menuprice");
    // submit.classList.add("submitorder");
    menucontrol.classList.add("menucontrol");
    additem.classList.add("additem");
    removeitem.classList.add("removeitem");

    menuicon.appendChild(menuimage);
    menuicon.appendChild(menuname);
    menucontrol.appendChild(removeitem);
    menucontrol.appendChild(numitem);
    menucontrol.appendChild(additem);
    menuitem.appendChild(menuicon);
    menuitem.appendChild(menudescription);
    menuitem.appendChild(menuprice);
    menuitem.appendChild(menucontrol);
    menuitem.dataset.id = menuinfo["menuid"];
    // menuitem.appendChild(submit);
    menulist.appendChild(menuitem);
}


function setLocation(){
    document.cookie = "location=";
    var mylocationchooser = document.getElementById("location");
    var inputcoords = [];
    mylocationchooser.classList.add("active");
    document.body.classList.add("preventscroll");
    var currentlocationinfo = document.getElementById("currentlocationinfo");
    var inputlocationinfo = document.getElementById("inputlocationinfo");

    if(!navigator.geolocation) {
        error();
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude  = position.coords.latitude.toFixed(3);
            const longitude = position.coords.longitude.toFixed(3);
            mylocation = [latitude, longitude];
            currentlocationinfo.innerHTML = "Current location: <br>"+mylocation[0]+", "+mylocation[1];
            
            currentlocationinfo.addEventListener("click", (event) => {
                event.preventDefault();
                handleSubmit(mylocation)});
        }, error);
      }
    
    var mylocationinput = document.getElementById("locationinput");

    mylocationinput.addEventListener("input", (event) => {
        inputcoords = [((mylocationinput.value%1000)/7).toFixed(3), (mylocationinput.value/13000).toFixed(3)];
            inputlocationinfo.innerHTML = "Input location: <br>"+inputcoords[0]+", "+inputcoords[1];
        inputlocationinfo.addEventListener("click", (event) => {
            event.preventDefault();
            handleSubmit(inputcoords)});
    });
    
}

function error() {
    console.error('Unable to retrieve your location');
    currentlocationinfo.innerHTML = 'Unable to retrieve your current location, search by Postal Code above';
  }

  function handleSubmit(location){
    
    if (location[1] > 1){
        var mylocationchooser = document.getElementById("location");
        mylocationchooser.classList.remove("active");
        document.body.classList.remove("preventscroll");
        document.cookie = "location=["+location[0]+","+location[1]+"]; max-age=31536000;";
        var locationinfo = document.querySelector("h4.locationinfo");
        locationinfo.innerHTML = "Delivering to: "+ location;
    }
}

function jsdata_parse(string) {
    result = {};
    string = string.slice(1, -1);
    string = string.split("}, ");
    string[string.length - 1] = string[string.length - 1].slice(0, -1);
    string.forEach(item => {
        item = item.slice(item, 1, -1);
        item = item.split(", ");
        item.forEach(elem => {
            elem = elem.split(": ");
            if (elem[1].startsWith("[")){
                elem[1] = elem[1].substring(1, -1);
                elem[1] = explode(",");
            }
            result[elem[0]] = elem[1];
        })
    });
    return result;
}

export {addMenuItem, setLocation, jsdata_parse};