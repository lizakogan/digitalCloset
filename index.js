document.addEventListener('DOMContentLoaded', async function () {
  const mannequins = {};

  // Fetch the mannequins data from the server
  async function fetchMannequins() {
    const response = await fetch('http://localhost:3000/mannequins');
    const data = await response.json();
    data.forEach(mannequin => {
      mannequins[mannequin.mannequinId] = { // Use mannequinId as the key
        tops: mannequin.tops,
        bottoms: mannequin.bottoms,
        shoes: mannequin.shoes
      };
    });
  }

  await fetchMannequins();

  // Function to get a random item from an array
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Function to generate an outfit for a specific mannequin
  function generateOutfit(mannequinId) {
    const mannequin = mannequins[mannequinId];
    const mannequinNumber = mannequinId.slice(-1);

    if (mannequin && mannequin.tops.length > 0) { // Check if mannequin exists
      document.getElementById(`top${mannequinNumber}`).src = getRandomItem(mannequin.tops);
      document.getElementById(`top${mannequinNumber}`).classList.add('show');
    }

    if (mannequin && mannequin.bottoms && mannequin.bottoms.length > 0) { // Check if mannequin exists
      document.getElementById(`bottom${mannequinNumber}`).src = getRandomItem(mannequin.bottoms);
      document.getElementById(`bottom${mannequinNumber}`).classList.add('show');
    }

    if (mannequin && mannequin.shoes.length > 0) { // Check if mannequin exists
      document.getElementById(`shoes${mannequinNumber}`).src = getRandomItem(mannequin.shoes);
      document.getElementById(`shoes${mannequinNumber}`).classList.add('show');
    }
  }

  // Automatically generate outfits for all mannequins
  generateOutfit('mannequin1');
  generateOutfit('mannequin2');
  generateOutfit('mannequin3');

  // Event listeners for generating outfits when buttons are clicked
  document.getElementById('generate-outfit1').addEventListener('click', function () {
    generateOutfit('mannequin1');
  });

  document.getElementById('generate-outfit2').addEventListener('click', function () {
    generateOutfit('mannequin2');
  });

  document.getElementById('generate-outfit3').addEventListener('click', function () {
    generateOutfit('mannequin3');
  });

  // Functions for the popup
  function showPopup(content) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    popupText.innerHTML = content;
    popup.classList.add('show');
  }

  function hidePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
  }

  // Adding event listeners for popup triggers
  const popupTriggers = document.querySelectorAll('.popup-trigger');
  popupTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      const popupContent = this.getAttribute('data-popup');
      switch (popupContent) {
        case 'project':
          showPopup('The goal of this project is to save you from the morning “what to wear” crisis! It’s designed for all those who have ever stood in front of their closet with a blank stare, struggling to find the perfect outfit for different occasions. Now, instead of stressing over what to wear, just click the generate buttons and let me do the thinking for you!');
          break;
        case 'overview':
          showPopup('Lizas Closet is an interactive and stylish project that offers a personalized fashion design experience. The project simulates a digital wardrobe where users can generate and match outfits for different events, morning, brunch, and evening, while also drawing fashion inspiration through my Pinterest profile to get even more ideas.');
          break;
        case 'inspired':
          showPopup('<p>Feeling uninspired? Click <a href="https://pin.it/66gIHmQ4i" target="_blank">my Pinterest profile</a> to get some inspiration!</p>');
          break;
        case 'about':
          showPopup('I’m a junior software developer with a passion for turning creative ideas into functional, I enjoy diving into new challenges, experimenting with code, and constantly learning new technologies. My journey in tech began with a curiosity for how things work behind the scenes.');
          break;
        default:
          showPopup('Default content');
      }
    });
  });

  // Close the popup when clicking on the popup area or close button
  document.getElementById('popup').addEventListener('click', hidePopup);
  document.getElementById('close-popup').addEventListener('click', hidePopup);
});