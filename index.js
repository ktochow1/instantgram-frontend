const endpoint = "http://localhost:3000/api/v1/posts"

document.addEventListener("DOMContentLoaded", () => {
  getPosts()
  const createPostForm = document.querySelector('#post-form');
  createPostForm.addEventListener("submit", (e) => {
    createFormHandler(e)
})
})

function getPosts(){
  fetch(endpoint)
  .then(response => response.json())
  .then(posts => {
    posts.data.forEach(post => {
      const markup = `<div data-id=${post.id}>
        <h3>${post.attributes.title}</h3><br>
        <img src=${post.attributes.image_url} height="200" width="250"><br>
        <button id="edit-button" data-id=${post.id}>Edit</button><br>
        </div>`;

        document.querySelector('#post-container').innerHTML += markup
    })
  })
}

function createFormHandler(e){
  e.preventDefault();
  console.log(e)
}
