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
  const formTitle = document.querySelector("#input-title").value;
  const formUrl = document.querySelector("#input-url").value;
  postFetch(formTitle, formUrl);
  // const submit = document.querySelector("#submit-button");
}

function postFetch(title, url){
  let bodyData = {title, url}
  fetch(endpoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)//how i'm going to SEND data to API
  })
  .then(response => response.json())
  .then(post => {
    console.log(post);
  })

}
