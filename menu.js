var tabgroup = document.querySelectorAll('[data-component="tablist"]')[0];
var menulist = document.querySelectorAll('[data-component="menulist"]')[0];
try{
    var index = document.cookie.split('; ').find(row => row.startsWith('index')).split('=')[1];
}
catch(e){
    var index = 0;
}
var data = [[{"name":"cheese pizza", "image":"./cheese.png", "description":"This is a promo cheese pizza"}],
            [{"name":"cheese pizza", "image":"./cheese.png", "description":"This is ala carte cheese pizza"}],
            [{"name":"cheese pizza", "image":"./cheese.png", "description":"This is a meal cheese pizza"}],
            [{"name":"cheese pizza", "image":"./cheese.png", "description":"This is a side cheese pizza"}],
            [{"name":"cheese pizza", "image":"./cheese.png", "description":"This is a drink cheese pizza"}]];
populateMenu();
updateTab();


function updateTab(){
    tabgroup.children[index].classList.add('active');
    menulist.children[index].classList.add('active');

    tabgroup.addEventListener("click", event => {
        tabgroup.children[index].classList.remove('active');
        menulist.children[index].classList.remove('active');
        index = [...event.target.parentElement.children].indexOf(event.target);
        tabgroup.children[index].classList.add('active');
        menulist.children[index].classList.add('active');
        document.cookie = "index="+index+";";
    })
}


function addMenuItem(menuinfo, menulist){
    console.log(menuinfo["image"]);
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
            console.log(data[j])
            addMenuItem(data[j][i], menulist.children[j]);
        }
}
}
