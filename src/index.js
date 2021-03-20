console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", function () {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const dogImages = document.querySelector("div#dog-image-container");

  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const dogBreeds = document.querySelector("ul#dog-breeds");

  const breedDropdown = document.querySelector("select#breed-dropdown");

  function renderImages(json) {
    const images = json["message"];
    images.forEach((imageUrl) => {
      let dogImage = document.createElement("img");
      dogImage.src = imageUrl;
      dogImages.appendChild(dogImage);
    });
  }

  function generateBreed(breed) {
    let li = document.createElement("li");
    li.innerText = breed;
    dogBreeds.appendChild(li);
    li.addEventListener("click", function (e) {
      e.target.style.color = "DarkRed";
    });
  }

  function renderBreeds(breeds) {
    let existingList = dogBreeds.children;
    for (const oldBreed of existingList) {
      oldBreed.remove();
    }
    breeds.forEach((breed) => generateBreed(breed));
  }

  fetch(imgUrl)
    .then((response) => response.json())
    .then((json) => {
      renderImages(json);
    })
    .catch((error) => {
      throw error;
    });

  fetch(breedUrl)
    .then((response) => response.json())
    .then((breedJson) => {
      const breeds = Object.keys(breedJson.message);
      renderBreeds(breeds);
      breedDropdown.addEventListener("change", function (e) {
        renderBreeds(
          breeds.filter((breed) => breed.startsWith(e.target.value)),
        );
      });
    })
    .catch((error) => {
      throw error;
    });
});
