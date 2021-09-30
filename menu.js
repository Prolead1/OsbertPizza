var tabgroup = document.querySelectorAll('[data-component="tablist"]')[0];
var menulist = document.querySelectorAll('[data-component="menulist"]')[0];
var data = [[{"name":"cheese pizza", "image":"./assets/cheese.jpg", "description":"This is a promo cheese pizza"}],
            [{"name":"cheese pizza", "image":"./assets/cheese.jpg", "description":"This is ala carte cheese pizza"}],
            [{"name":"cheese pizza", "image":"./assets/cheese.jpg", "description":"This is a meal cheese pizza"}],
            [{"name":"cheese pizza", "image":"./assets/cheese.jpg", "description":"This is a side cheese pizza"}],
            [{"name":"cheese pizza", "image":"./assets/cheese.jpg", "description":"This is a drink cheese pizza"}]];

window.addEventListener('load', () => {
    try{
        var index = document.cookie.split('; ').find(row => row.startsWith('index')).split('=')[1];
        var mylocation = document.cookie.split('; ').find(row => row.startsWith('location')).split('=')[1];
        console.log(mylocation+" "+index);
    }catch(e){
        console.error(e)
    }
    if (index === undefined || index === null) var index = 0;
    if (mylocation === null || mylocation === undefined || mylocation === "") setLocation();
    var locationinfo = document.querySelector("h4.locationinfo");
    locationinfo.innerHTML = "Delivering to: "+ mylocation;
    populateMenu();
    updateTab(index);
})

function handleSubmit(location){
    
    if (location[1] > 1){
        console.log("submitted");
        mylocationchooser = document.getElementById("location");
        mylocationchooser.classList.remove("active");
        document.body.classList.remove("preventscroll");
        document.cookie = "location=["+location[0]+","+location[1]+"]; max-age=31536000;";
        console.log(document.cookie);
        var locationinfo = document.querySelector("h4.locationinfo");
        locationinfo.innerHTML = "Delivering to: "+ location;
    }
}

function setLocation(){
    document.cookie = "location=";
    var mylocationchooser = document.getElementById("location");
    var submitinput = document.getElementById("inputsubmit");
    var inputcoords = [];
    mylocationchooser.classList.add("active");
    document.body.classList.add("preventscroll");
    currentlocationinfo = document.getElementById("currentlocationinfo");
    inputlocationinfo = document.getElementById("inputlocationinfo");

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
    
    mylocationinput = document.getElementById("locationinput");

    mylocationinput.addEventListener("input", (event) => {
        inputcoords = [((mylocationinput.value%1000)/7).toFixed(3), (mylocationinput.value/13000).toFixed(3)];
        inputlocationinfo.innerHTML = "Input location: <br>"+inputcoords[0]+", "+inputcoords[1];
        inputlocationinfo.addEventListener("click", (event) => {
            event.preventDefault();
            handleSubmit(inputcoords)});
    })
    
}

function error() {
    console.error('Unable to retrieve your location');
    currentlocationinfo.innerHTML = 'Unable to retrieve your current location, search by Postal Code';
  }

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


function addMenuItem(menuinfo, menulist){
    const menuitem = document.createElement("div");
    const menuicon = document.createElement("div");
    const menuimage = document.createElement("img");
    const menuname = document.createElement("h4");
    const menudescription = document.createElement("div");

    menuimage.src = (menuinfo["image"]);
    menudescription.appendChild(document.createTextNode(menuinfo["description"]));
    menuname.appendChild(document.createTextNode(menuinfo["name"]));

    menuitem.classList.add("menuitem");
    menuicon.classList.add("menuicon");
    menuimage.classList.add("menuimage");
    menuname.classList.add("menuname");
    menudescription.classList.add("menudescription");

    menuicon.appendChild(menuimage);
    menuicon.appendChild(menuname);
    menuitem.appendChild(menuicon);
    menuitem.appendChild(menudescription);

    menulist.appendChild(menuitem);
}

function populateMenu(){
    for (var j=0; j<5; j++){
        for (var i=0;i<data[j].length;i++){
            addMenuItem(data[j][i], menulist.children[j]);
        }
}
}
