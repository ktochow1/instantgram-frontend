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
      // const markup =
      // `<div data-id=${post.id}>
      //   <h3>${post.title}</h3><br>
      //   <img src=${post.image_url} height="200" width="250"><br>
      //   </div>`;
      let postContainer = document.querySelector("#post-container");
      postContainer.setAttribute("data-id", `${post.id}`);

      let h3 = document.createElement("h3");
      let h3Text = document.createTextNode(`${post.title}`)
      h3.appendChild(h3Text)
      // h3.value = post.title;
      postContainer.appendChild(h3)
      let node = document.createTextNode(`${post.title}`)
      // div.append(node)


      // let postContainer = document.querySelector("#post-container")
      // let mainDiv = document.createElement("div")
      // postContainer.appendChild(mainDiv)
        // mainDiv.setAttribute("data-id", `${post.id}`)
      // let editBtn = document.createElement('button');
      // editBtn.value = "Edit"
      // editBtn.setAttribute(`data-id`, `data[${posts.id}].id`);
        // editBtn.setAttribute(`id`, `edit-button`);
      // editBtn.id = post.id
      // mainDiv.appendChild(editBtn)
        // const editBtn = document.getElementById("#edit-button");
        // const container = document.querySelector('#post-container').innerHTML += markup;
        //
        // let img = document.querySelector('img');
        // img.append(editBtn)
        // editBtn.append(postDiv)
        // editBtn.append(postDiv)

          //<button id="edit-button" data-id=${post.id}>Edit</button>


        // console.log(editBtn)
        // let array = markup.split(", ")

        // console.log(editBtn)


        // editBtn.addEventListener("click", function(){
        //   alert("click")
        })
        })
        // editBtn.addEventListener("click", function(){
        //   alert("click");
        // console.log(editBtn)


        // const editBtn = document.getElementById("#edit-button").addEventListener("click", () => { console.log("click") });
        //
        // editBtn.addEventListener('click', click)
        // editBtn.addEventListener('click', () => {console.log("click")})


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
