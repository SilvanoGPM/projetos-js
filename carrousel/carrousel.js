function carrousel() {
    const images = document.querySelectorAll('.carousel__item');
    const next = document.querySelector('.carousel__control--next');
    const previous = document.querySelector('.carousel__control--previous');

    const SWITCH_TIME = 5000;

    let currentIndex = -1;
    let nextImageId;

    function nextImage() {
        if (currentIndex === images.length - 1) {
            currentIndex = -1;
        }
        currentIndex++;

        images.forEach(image =>
            image.classList.remove('carousel__item--visible'));

        images[currentIndex].classList.add('carousel__item--visible');
    }

    function previousImage() {
        if (currentIndex <= 0) {
            currentIndex = images.length;
        }
        currentIndex--;

        images.forEach(image =>
            image.classList.remove('carousel__item--visible'));

        images[currentIndex].classList.add('carousel__item--visible');
    }

    function resetTimer() {
        clearInterval(nextImageId);
        nextImageId = setInterval(nextImage, SWITCH_TIME);  
    }

    next.addEventListener('click', () => {
        resetTimer();
        nextImage();
    });
    previous.addEventListener('click', () => {
        resetTimer();
        previousImage();
    });

    nextImageId = setInterval(nextImage, SWITCH_TIME);
}

carrousel();