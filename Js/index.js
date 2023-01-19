var slider = document.getElementById("slider");
var slides = slider.getElementsByClassName("slide");
var pagination = document.getElementById("pagination");
var items = slider.getElementsByClassName("pagination-item");

var currentSlide = 0;
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var intervalId;

//Show slide function 
function showSlide() {
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.add("opacity-0");
        slides[i].classList.add("w-0");
        items[i].classList.remove("lg:w-12");
        items[i].classList.remove("w-8");
        items[i].classList.remove("lg:opacity-100");
        items[i].classList.add("lg:bg-opacity-30");

        // slides[i].classList.add("hidden");

    }
    slides[currentSlide].classList.remove("opacity-0");
    slides[currentSlide].classList.remove("w-0");
    items[currentSlide].classList.add("lg:w-12");
    items[currentSlide].classList.add("w-8");
    items[currentSlide].classList.add("lg:bg-opacity-100");
    items[currentSlide].classList.remove("lg:bg-opacity-30");
}

showSlide();



//Add event listener to all the pagination items
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
        currentSlide = Array.from(items).indexOf(this);
        stopAutoplay();
        showSlide();
    });
}

//Start Autoplay function
function startAutoplay() {
    intervalId = setInterval(nextSlide, 3000);
}

//Stop Autoplay function
function stopAutoplay() {
    clearInterval(intervalId);
}
startAutoplay();


//Next slide function
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;

    console.log(currentSlide);

    showSlide();
}

//Prev slide function
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;

    console.log(currentSlide);

    showSlide();
}



//Add event listener to all the slides
for (var i = 0; i < slides.length; i++) {
    slides[i].addEventListener("click", function () {
        var imgSrc = this.getElementsByTagName("img")[0].src;
        var fullScreenImg = document.createElement("img");
        fullScreenImg.src = imgSrc;
        fullScreenImg.classList.add("full-screen-img");

        //Create prev and next buttons
        var prevBtn = document.createElement("button");
        prevBtn.innerHTML = `<i class="fa-solid fa-angle-left"></i>`
        prevBtn.classList.add("prev-btn");
        var nextBtn = document.createElement("button");
        nextBtn.innerHTML = `<i class="fa-solid fa-angle-right"></i>`
        nextBtn.classList.add("next-btn");

        document.body.appendChild(fullScreenImg);
        document.body.appendChild(prevBtn);
        document.body.appendChild(nextBtn);

        //Add click event to prev button
        prevBtn.addEventListener("click", function () {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            fullScreenImg.src = slides[currentSlide].getElementsByTagName("img")[0].src;
        });
        //Add click event to next button
        nextBtn.addEventListener("click", function () {
            currentSlide = (currentSlide + 1) % slides.length;
            fullScreenImg.src = slides[currentSlide].getElementsByTagName("img")[0].src;
        });

        //Add click event to full screen image
        fullScreenImg.addEventListener("click", function () {
            this.remove();
            prevBtn.remove();
            nextBtn.remove();
        });
    });
}


//stop autoplay when mouse enter the slider and start autoplay when mouse leave the slider

slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", startAutoplay);


//Add event listener to next and prev buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
