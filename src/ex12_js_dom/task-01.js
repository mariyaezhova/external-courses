const arrayPhotos = [];
const numberOfPhotos = 10;

// loop to fill array by jpg format photos
for (let i = 1; i <= numberOfPhotos; i++ ) {
    arrayPhotos.push(`asset/${i}.jpg`);
}

const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const currentPhoto = document.querySelector('.photo');
let indexPhoto = 0;

currentPhoto.src = arrayPhotos[indexPhoto];

function createSmoothTransition() {
    currentPhoto.src = arrayPhotos[indexPhoto];
    currentPhoto.className = 'photo-showed';
    
    setTimeout(() => {
        currentPhoto.className = 'photo';
    }, 500);
}

prevButton.onclick = function() {
    indexPhoto--;
    if (indexPhoto < 0) {
        indexPhoto = arrayPhotos.length - 1;
    }

    createSmoothTransition();
}

nextButton.onclick = function() {
    indexPhoto++;
    if (indexPhoto > arrayPhotos.length - 1) {
        indexPhoto = 0;
    }

    createSmoothTransition();
}
