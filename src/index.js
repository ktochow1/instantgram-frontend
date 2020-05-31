const endpoint = "http://localhost:3000/api/v1/posts"



document.addEventListener("DOMContentLoaded", () => {
  getPosts();

  // editBtn.addEventListener("click", function(){
  //   alert("click");
  // })
  const createPostForm = document.querySelector('#post-form');
  createPostForm.addEventListener("submit", (e) => {
    createFormHandler(e)
  })
})

function getPosts(){
  fetch(endpoint)
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      const markup = `<div data-id=${post.id}>
        <h3>${post.title}</h3><br>
        <img src=${post.image_url} height="200" width="250"><br>
        <button id="edit-button" data-id=${post.id}>Edit</button><br>
        </div>`;

        document.querySelector('#post-container').innerHTML += markup;
        const editBtn = document.getElementById("#edit-button");
        console.log(editBtn)
        // editBtn.addEventListener("click", function(){
        //   alert("click")
        // })
        })
        // editBtn.addEventListener("click", function(){
        //   alert("click");
        // console.log(editBtn)


        // const editBtn = document.getElementById("#edit-button").addEventListener("click", () => { console.log("click") });
        //
        // editBtn.addEventListener('click', click)
        // editBtn.addEventListener('click', () => {console.log("click")})
    });

  };


function createFormHandler(e){
  e.preventDefault();
  const formTitle = document.querySelector("#input-title").value;
  const formUrl = document.querySelector("#input-url").value;
  postFetch(formTitle, formUrl);
  patchFetch(formTitle);

  // const submit = document.querySelector("#submit-button");
}

function postFetch(title, image_url){
  // const editBtn = document.querySelector("#edit-button");
  const bodyData = {title, image_url}
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //explicit about content type
      "Accept": "application/json"
  },
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(post => {
    const postData = post.data.attributes
    const postMarkup = `
    <div data-id=${post.id}>
    <h3>${postData.title}</h3>
    <img src=${postData.image_url} height="200" width="250">
    <button data-id=${postData.id}>Edit</button>
    </div>`;
    document.querySelector("#post-container").innerHTML += postMarkup;
  })
}

function patchFetch(title, id){
  const bodyData = {title, id}
  fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSONstringify(bodyData)
  }).then(response => response.json())
  .then(json => console.log(json))
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify(bodyData)
    // })
    // .then(response => response.json())
    // .then(post => {
    //   console.log(post)
    // })
}
