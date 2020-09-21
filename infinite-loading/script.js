const postContainer = document.getElementById("post-container");
const loader = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = res.json();
  return data;
};

const showPosts = async () => {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-body"></p>
        ${post.body}
      </div>
    `;

    postContainer.appendChild(postEl);
  });
};

const showLoading = () => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 5000);
};

const filterPosts = (e) => {
  const query = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(query) > -1 || body.indexOf(query) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    console.log(123);
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
