const endpoint = "http://localhost:3000/api/v1/posts"

document.addEventListener("DOMContentLoaded", () => {
  getPosts();
  const createPostForm = document.querySelector('#post-form');
  const form = document.getElementById('post-form')
  createPostForm.addEventListener("submit", (e) => {
    createFormHandler(e);
    form.reset();
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
      editBtn.setAttribute("id", `${post.id}`)

      divContainer.appendChild(postContainer)
      postContainer.appendChild(h3)
      h3.appendChild(h3Text)
      postContainer.appendChild(img)
      postContainer.appendChild(editBtn)
      editBtn.appendChild(btnTxt)

      const postDiv = document.querySelector("#post-container");
      postDiv.setAttribute("data-id", `${post.id}`)


      const patchForm = document.createElement("FORM");
      patchForm.setAttribute("id", "patch-form");
      patchForm.setAttribute("data-id", `${post.id}`);



      const editTitle = document.createElement("INPUT");
      editTitle.setAttribute("type", "text");
      editTitle.setAttribute("value", `${post.title}`);
      editTitle.setAttribute("data-id", `${post.id}`)
          // postDiv.appendChild(editTitle);
          // if(editTitle.dataset.id === postDiv.id){

          // }

      const editUrl = document.createElement("INPUT");
      editUrl.setAttribute("type", "text");
      editUrl.setAttribute("value", `${post.image_url}`);
      editUrl.setAttribute("data-id", `${post.id}`)


      const editSubmit = document.createElement("INPUT");
      editSubmit.setAttribute("type", "submit");
      editSubmit.setAttribute("data-id", `${post.id}`)

      editBtn.addEventListener("click", function(){
        divContainer.childNodes.forEach(function(){
          postDiv.appendChild(patchForm);
          patchForm.appendChild(editTitle);
          patchForm.appendChild(editUrl);
          patchForm.appendChild(editSubmit);

            })

          })




      })
    })
  }


        // const postDiv = document.querySelector("#post-container");
        //
        // postDiv.setAttribute("data-id", `${post.id}`)
        //
        // const patchForm = document.createElement("FORM");
        // patchForm.setAttribute("id", "patch-form");
        // patchForm.setAttribute("data-id", `${post.id}`);
        // // if(postDiv.id === patchForm.dataset.id){
        // postDiv.appendChild(patchForm);
        // // }
        //
        // const editTitle = document.createElement("INPUT");
        // editTitle.setAttribute("type", "text");
        // editTitle.setAttribute("value", `${post.title}`);
        // // postDiv.appendChild(editTitle);
        // // if(ed.dataset.id === postDiv.id){
        // patchForm.appendChild(editTitle);
        // // }
        //
        // const editUrl = document.createElement("INPUT");
        // editUrl.setAttribute("type", "text");
        // editUrl.setAttribute("value", `${post.image_url}`);
        // patchForm.appendChild(editUrl);
        //
        // const editSubmit = document.createElement("INPUT");
        // editSubmit.setAttribute("type", "submit");
        // patchForm.appendChild(editSubmit);


        // postDiv.appendChild(patchForm)
        // if (postDiv.id === patchForm.id) {
        //   postDiv.appendChild(patchForm)
        // }

        // for every edit button with post-id matching edit button id
        // create form

        // document.body.appendChild(patchForm);
        // editTitle.setAttribute("id", "edit-title");


        // const editSubmit = document.createElement("input");
        // editSubmit.setAttribute("type", "submit");

        // postDiv.appendChild(patchForm)
        // if (postDiv.id === patchForm.id) {
        //   postDiv.appendChild(patchForm)
        // }
        // console.log(patchForm)
        // document.getElementById("patch-form").appendChild(editTitle)

        // patchForm.appendChild(editTitle);
        // patchForm.appendChild(editUrl);
        // patchForm.appendChild(editSubmit);

      // })


function createFormHandler(e){
  e.preventDefault();
  const formTitle = document.querySelector("#input-title").value;
  const formUrl = document.querySelector("#input-url").value;
  postFetch(formTitle, formUrl);
}

function postFetch(title, image_url){
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
  .then(bodyData => {

    let divContainer = document.querySelector("#div-container");
    let postContainer = document.createElement("div");
    postContainer.setAttribute("id", "post-container");
    postContainer.setAttribute("data-id", `${bodyData.id}`);

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(`${bodyData.title}`)
    let img = document.createElement("img");
    img.setAttribute("src", `${bodyData.image_url}`)
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
    body: JSON.stringify(bodyData)
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
