const cardRow = document.querySelector(".card-row");
const title = document.querySelector(".title");

const loader = document.querySelector(".loader");
loader.innerHTML += `
<div class="cube-loader">
  <div class="cube-top"></div>
  <div class="cube-wrapper">
    <span style="--i:0" class="cube-span"></span>
    <span style="--i:1" class="cube-span"></span>
    <span style="--i:2" class="cube-span"></span>
    <span style="--i:3" class="cube-span"></span>
  </div>
</div>`;

const albumId = JSON.parse(localStorage.getItem("albumId"));

function getData(url) {
  class ErrorResponse extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          reject(new ErrorResponse(res.status, "Url is error"));
        }
      })
      .then((res) => {
        resolve(res);
      });
  });
}

function getPhotos({ title, url }) {
  return `
    <div class="card" style="width: 270px;">
  <img src="${url}" class="card-img-top" alt="img">
  <div class="card-body">
    <p class="card-text">${title}</p>
  </div>
</div>
  `;
}

async function getting() {
  // title.style.display = block;
  let data = await getData(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );
  data.map((el) => {
    cardRow.innerHTML += getPhotos(el);
  });
  loader.innerHTML = "";
  loader.style.height = "0px";
}

setTimeout(() => {
  getting();
}, 3000);
