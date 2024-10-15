  let imageWidth= window.innerWidth/8;
  let imageHeight= imageWidth*(3/4);

  let images = [
    { front: 'assets/post1.jpg', reverse: 'assets/post-reverse1.jpg', info: '@gianluca.marta italy' },
    { front: 'assets/post2.jpg', reverse: 'assets/post-reverse2.jpg', info: '@rayanexhd beirut' },
    { front: 'assets/post3.jpg', reverse: 'assets/post-reverse3.jpg', info: '@mantis1942 warsaw' },
    { front: 'assets/post4.jpg', reverse: 'assets/post-reverse4.jpg', info: '@miljaemilian_ paris' },

    { front: 'assets/post5.jpg', reverse: 'assets/post-reverse5.jpg', info: '@personalaccct los angeles' },
    { front: 'assets/post6.jpg', reverse: 'assets/post-reverse6.jpg', info: '@debauchry hong kong' },
    { front: 'assets/post7.jpg', reverse: 'assets/post-reverse7.jpg', info: '@liiiu.baa london' },
    { front: 'assets/post8.jpg', reverse: 'assets/post-reverse8.jpg', info: '@waterlike.world copenhagen' }
];

let gallery = document.getElementById('gallery');
let footer = document.getElementById('footer');

function getRandomPosition(elementWidth, elementHeight) {
    let x = Math.random() * (window.innerWidth - elementWidth);
    let y = Math.random() * (window.innerHeight - elementHeight);
    return { x, y };
}

function createImageElement(image) {
    let container = document.createElement('div');
    container.className = 'image-container';
    container.style.width = imageWidth;
    container.style.height = imageHeight;
    
    let img = document.createElement('img');
    img.src = image.front;
    img.dataset.reverse = image.reverse;
    img.dataset.info = image.info;
    
    container.appendChild(img);
    
    let position = getRandomPosition(200, 200);

    container.style.left = `${position.x}px`;
    container.style.top = `${position.y}px`;
    container.style.zIndex = Math.floor(Math.random() * 8);
    
    function toggleImage(container, img) {
        let temp = img.src;
        img.src = img.dataset.reverse;
        img.dataset.reverse = temp;
        footer.textContent = img.dataset.info;

        // Get the maximum zIndex of all containers using the new function
        let maxZIndex = getMaxZIndex();

        // Set the zIndex of the clicked container to be higher than the current maximum
        container.style.zIndex = maxZIndex + 1; // Ensure the clicked image is on top

        // Optionally, you can keep the zIndex of other containers unchanged
        // or you can set them to a lower value if desired
    }

    container.addEventListener('click', function() {
        toggleImage(container, img);
    });
    
    return container;
}

function getMaxZIndex() {
    let allContainers = document.querySelectorAll('.image-container');
    let maxZIndex = 0;
    allContainers.forEach(function(otherContainer) {
        let zIndex = parseInt(window.getComputedStyle(otherContainer).zIndex, 10);
        if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
    });
    return maxZIndex;
}

images.forEach(image => {
    let imageElement = createImageElement(image);
    gallery.appendChild(imageElement);
});

interact('.image-container').draggable({
    inertia: true,
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
        })
    ],
    autoScroll: true,
    listeners: {
        move: dragMoveListener,
    }
    
});

function dragMoveListener(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    
}
