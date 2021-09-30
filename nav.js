navicon = document.getElementById("navigation");
content = document.querySelector(".content");
sidebarnav = document.createElement("div");
sidebarnav.classList.add("sidebarnav");
sidebarnav.innerHTML = "<ul type='none'><li><a href='./cart.html'>View Cart</a></li><li><a href='./status.html'>Track My Order</a></li><li><a href='./feedback.html'>Feedback</a></li><li><a href='./account.html'>My Account</a></li></ul>";
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