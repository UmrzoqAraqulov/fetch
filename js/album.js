const cardRow = document.querySelector(".card-row");

const userId = JSON.parse(localStorage.getItem("userId"));

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

function getAlbum({ title, id }) {
  return `
  <div class="col-md-4 col-lg-3 mb-3 text-center">
   <div class="card">
     <div class="card-body">
       <h5 class="card-title">${title}</h5>
        <a onclick="albumId(${id})" style="color:white;width:100%;" class="btn btn-info" href="photos.html">Photos</a>
       </div>
     </div>
   </div>
 </div>
  `;
}

function date() {
  getData(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`).then(
    (res) => {
      res.map((el) => {
        cardRow.innerHTML += getAlbum(el);
      });
    }
  );
  loader.innerHTML = "";
  loader.style.height = "0px";
}

setTimeout(() => {
  date();
}, 1000);

function albumId(id) {
  localStorage.setItem("albumId", JSON.stringify(id));
}
