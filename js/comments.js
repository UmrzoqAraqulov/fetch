const cardRow = document.querySelector(".card-row");

const postId = JSON.parse(localStorage.getItem("postId"));

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

function getPost({ name, email, body }) {
  return `
  <div class="card  text-bg-success mb-3">
  <div class="card-header">${email}</div>
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">${body}</p>
  </div>
</div>
  `;
}

function getting() {
  getData(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((res) => {
    res.map((el) => {
      cardRow.innerHTML += getPost(el);
    });
  });

  loader.innerHTML = "";
  loader.style.height = "0px";
}

setTimeout(() => {
  getting();
}, 1000);
