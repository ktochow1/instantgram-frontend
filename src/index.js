const endpoint = "http://localhost:3000/api/v1/posts"

document.addEventListener("DOMContentLoaded", () => {
  getPosts();
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

      let divContainer = document.querySelector("#div-container");
      let postContainer = document.createElement("div");
      postContainer.setAttribute("id", "post-container");
      postContainer.setAttribute("data-id", `${post.id}`);

      let h3 = document.createElement("h3");
      let h3Text = document.createTextNode(`${post.title}`)
      let img = document.createElement("img");
      img.setAttribute("src", `${post.image_url}`)
      img.setAttribute("height", "350");
      img.setAttribute("width", "250");

      let editBtn = document.createElement("button");
      let btnTxt = document.createTextNode("Edit");

      divContainer.appendChild(postContainer)
      postContainer.appendChild(h3)
      h3.appendChild(h3Text)
      postContainer.appendChild(img)
      postContainer.appendChild(editBtn)
      editBtn.appendChild(btnTxt)

      editBtn.addEventListener("click", function(){
        console.log("click")
      })
    })
  })
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
    console.log(post.title)
    // CREATE POST ELEMENTS AFTER POST-REQ SUBMISSION


    // const postData = post.data.attributes
    // const postMarkup = `
    // <div data-id=${post.id}>
    // <h3>${postData.title}</h3>
    // <img src=${postData.image_url} height="200" width="250">
    // <button data-id=${postData.id}>Edit</button>
    // </div>`;
    // document.querySelector("#post-container").innerHTML += postMarkup;
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
