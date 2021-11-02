navicon = document.getElementById("navigation");
content = document.querySelector(".content");
sidebarnav = document.createElement("div");
sidebarnav.classList.add("sidebarnav");
sidebarnav.innerHTML = "<ul type='none'><li><a href='./menu.php'>Menu</a></li><li><a href='./cart.php'>View Cart</a></li><li><a href='./status.php'>Track My Order</a></li><li><a href='./feedback.php'>Feedback</a></li><li><a href='./account.php'>My Account</a></li><li><a href='logout.php'>Logout</a></li></ul>";
content.insertBefore(sidebarnav, document.querySelector(".hero"));

navicon.addEventListener("click", (event) => {
    event.preventDefault();
    sidebarnav = document.querySelector(".sidebarnav");
    if (sidebarnav.classList.contains("active")) {
        sidebarnav.classList.remove("active");
    }
    else{
        sidebarnav.classList.add("active");
    }
    
})