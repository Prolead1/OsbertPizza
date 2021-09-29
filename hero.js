
var slideshows = document.querySelectorAll('[data-component="slideshow"]');
var leftbutton = document.getElementById("display-left");
var rightbutton = document.getElementById("display-right");
slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {

	var slides = document.querySelectorAll(`#${slideshow.id} [role="list"] .slide`);
	var index = 0, time = 10000;
    var timer = setInterval( autoNextSlide, time);
	slides[index].classList.add('active');

    leftbutton.addEventListener('click', () => {
        clearInterval(timer);
        timer = setInterval(autoNextSlide, time);
        slides[index].classList.remove('active');
        index -= 1;
        if (index < 0) index = slides.length - 1;
        slides[index].classList.add('active');
    })
    rightbutton.addEventListener('click', () => {
        clearInterval(timer);
        timer = setInterval(autoNextSlide, time);
        slides[index].classList.remove('active');
        index += 1;
        if (index === slides.length) index = 0;
        slides[index].classList.add('active');
    })
    function autoNextSlide(){
		slides[index].classList.remove('active');
		
		index++;
		if (index === slides.length) index = 0;

		slides[index].classList.add('active');

	}
}