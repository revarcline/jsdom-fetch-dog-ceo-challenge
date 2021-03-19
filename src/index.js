console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", function () {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const dogImages = document.querySelector("div#dog-image-container");

  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const dogBreeds = document.querySelector("ul#dog-breeds");

  let images = [];

  function renderImages(json) {
    images = json["message"];
    dogImages.innerHTML = images
      .map((url) => `<img src="${url}" class="dog-image">`)
      .join("\n");
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
    .then((json) => {
      renderImages(json);
    })
    .catch((error) => {
      throw error;
    });
});
