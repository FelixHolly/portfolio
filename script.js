const numStars = 50;
const starContainer = document.getElementById('stars');

const stars = [];

// Create star elements
for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  star.style.opacity = Math.random();
  starContainer.appendChild(star);
  
  const speed = Math.random() *  0.2;
  stars.push({ star, speed });
}

// Move stars
function moveStars() {
  stars.forEach(({ star, speed }) => {
    const currentLeft = parseFloat(star.style.left);
    const newLeft = currentLeft - speed;

    if (newLeft < -2) {
      star.style.left = '99vw';
      star.style.top = `${Math.random() * 100}vh`;
    } else {
      star.style.left = `${newLeft}vw`;
    }
  });

  requestAnimationFrame(moveStars);
}

moveStars();
