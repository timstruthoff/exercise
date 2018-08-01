/**
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise<any>}
 */
function loadImage(url) {
  return new Promise(function(resolve, reject) {
    var img = document.createElement('img');
    img.onload = function() {
      resolve(this);
    };

    img.onerror = function(e) {
      reject(e);
    };

    img.src = url;
  });
}

/**
 * Animate a element to a position
 * @param {HTMLElement} element
 * @param {number} duration
 * @param {number} x
 * @param {number} y
 * @return {Promise<any>}
 */
function animate(element, duration, x, y) {
  return new Promise(function(resolve) {
    TweenLite.to(element, duration, {
      left: x,
      top: y,
      onComplete: resolve,
    });
  });
}

var images = [
  './assets/001-yawn.png',
  './assets/002-wink.png',
  './assets/003-smile-1.png',
  './assets/004-smile.png',
  './assets/005-surprise.png',
  './assets/006-shocked.png',
  './assets/007-sceptic.png',
  './assets/008-sad-2.png',
  './assets/009-sad-1.png',
  './assets/010-happy-3.png',
  './assets/011-pain.png',
  './assets/012-muted.png',
  './assets/013-meh.png',
  './assets/014-laugh.png',
  './assets/015-ill.png',
  './assets/016-happy-2.png',
  './assets/017-happy-1.png',
  './assets/018-cute.png',
  './assets/019-crying.png',
  './assets/020-crazy.png',
  './assets/021-cool.png',
  './assets/022-bored.png',
  './assets/023-blush.png',
  './assets/024-sad.png',
  './assets/025-happy.png',
];

const ANIMATION_DURATION = 0.25;
// Contains all promises of the images loading.
var promiseArray = [];

images.forEach(currentImageUrl => {
  // Loading image with the current url
  // and adding th promise for when the loading
  // is finished to the to promise array.
  promiseArray.push(loadImage(currentImageUrl));
});

var allImagesFinishedPromise = Promise.all(promiseArray);

// When all images are finished loading
allImagesFinishedPromise.then(images => {

  // Appending all images to dom
  images.forEach(currentImage => {
    document.body.appendChild(currentImage);
  });

  // Index of the image that is currently
  let currentIndex = 0;


  // Looping function which gets executed for each image
  function animateNextImage() {
    let currentImage = images[currentIndex];
    // Animating all items
    animate(currentImage, ANIMATION_DURATION, '200px', '0px')
      .then(() => {
        return animate(currentImage, ANIMATION_DURATION, '200px', '200px');
      })
      .then(() => {
        return animate(currentImage, ANIMATION_DURATION, '0px', '200px');
      })
      .then(() => {
        return animate(currentImage, ANIMATION_DURATION, '0px', '0px');
      })
      .then(() => {
        currentIndex++;

        // Checking if at the end of array
        if (currentIndex === images.length) {

          // All images are animated
          console.log('finished')
        } else {

          // If not starting the animation for the next item.
          animateNextImage();
        }
      })
      .catch(reason => {
        console.error(reason);
      });
  }
  animateNextImage();
});
