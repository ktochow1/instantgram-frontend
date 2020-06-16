const endpoint = "http://localhost:3000/api/v1/posts"
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

let glyphStates = {
  "♡": "♥",
  "♥": "♡"
};

let colorStates = {
  "red" : "",
  "": "red"
};

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
    // console.log(posts)
    posts.data.forEach(post => {
      // console.log(post)
      let p = post.attributes

      //create DivContainer
      let divContainer = document.querySelector("#div-container");
      let postContainer = document.createElement("div");
      postContainer.setAttribute("id", "post-container");
      postContainer.setAttribute("data-id", `${post.id}`);
      //create H3 Title
      let h3 = document.createElement("h3");
      h3.setAttribute("id", "post-title")
      let h3Text = document.createTextNode(`${p.title}`)
      let img = document.createElement("img");
      img.setAttribute("id", "imgUrl")
      img.setAttribute("src", `${p.image_url}`)
      img.setAttribute("height", "350");
      img.setAttribute("width", "250");
      //create Edit btn
      let editBtn = document.createElement("button");
      let btnTxt = document.createTextNode("Edit");
      editBtn.setAttribute("class", "edit-button")
      editBtn.setAttribute("id", `${post.id}`)
      //create Like btn
      let likeBtn = document.createElement("button");
      let likeTxt = document.createTextNode("♥")
      //create delete btn
      let deleteBtn = document.createElement("button");
      let deleteTxt = document.createTextNode("Delete");
      deleteBtn.setAttribute("data-id", `${post.id}`)
      deleteBtn.setAttribute("id", "deleteBtn")
      //append created elements
      divContainer.appendChild(postContainer)
      postContainer.appendChild(h3)
      h3.appendChild(h3Text)
      postContainer.appendChild(img)
      postContainer.appendChild(editBtn)
      editBtn.appendChild(btnTxt)
      postContainer.appendChild(likeBtn)
      likeBtn.appendChild(likeTxt)
      postContainer.appendChild(deleteBtn);
      deleteBtn.appendChild(deleteTxt);
      //add edit btn event listener
      const patchForm = document.createElement("FORM");
      patchForm.setAttribute("id", "patch-form");
      patchForm.setAttribute("data-id", `${post.id}`);
      const editTitle = document.createElement("INPUT");
      editTitle.setAttribute("type", "text");
      editTitle.setAttribute("id", "editTitle")
      editTitle.setAttribute("placeholder", `${p.title}`)
      editTitle.setAttribute("data-id", `${post.id}`)
      const editUrl = document.createElement("INPUT");
      editUrl.setAttribute("id", "editUrl")
      editUrl.setAttribute("type", "text");
      editUrl.setAttribute("placeholder", `${p.image_url}`);
      editUrl.setAttribute("data-id", `${post.id}`)
      const editSubmit = document.createElement("INPUT");
      editSubmit.setAttribute("type", "submit");
      editSubmit.setAttribute("data-id", `${post.id}`);

      function patchFetch(title, image_url){
        const bodyData = {title, image_url}
        fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          },
          method: 'PATCH',
          body: JSON.stringify(bodyData),
        }).then(response => response.json())
        .then(data =>  {
          // console.log(data)
          console.log(data)
          let containerId = document.querySelector("#div-container");
          // containerId.id = document.querySelectorAll(`[data-id=${post.id}]`)
          containerId
          // let id = containerId.getAttribute("data-id")
          // console.log(containerId)
          // console.log(this.attr("data-id"))
          //bodyData = undefined
          //post = Correct post object
          // console.log(post.id)
          let container = document.querySelector("#div-container");
          container.setAttribute("data-id", `${post.id}`);
          container.title = editTitle
          let divContainer = document.querySelector("#div-container");
          // console.log(container)
          // divContainer.find((id) => {console.log(id)})
          // console.log(container.dataset)
          // console.log(this)
          // console.log(post.id)
        }
      )
      }
      // patchForm.appendChild(editSubmit);

      editBtn.addEventListener("click", function(e){
        postContainer.appendChild(patchForm);
        patchForm.appendChild(editTitle);
        patchForm.appendChild(editUrl);
      })

        // const editSubmit = document.createElement("INPUT");
        // editSubmit.setAttribute("type", "submit");
        // editSubmit.setAttribute("data-id", `${post.id}`);
        patchForm.appendChild(editSubmit);

        patchForm.addEventListener("submit", (e) => {
          editFormHandler(e)
        })
        function editFormHandler(e){
          e.preventDefault();
          const title = document.querySelector("#editTitle").value;
          const image_url = document.querySelector("#editUrl").value;
          editTitle.id = e.originalTarget.dataset
          patchFetch(title, image_url);
        }

        // deleteBtn.addEventListener("click", (e) => {
        //   console.log(post)
        //
        //   // deleteFormHandler(e);
        // })
      function deleteFormHandler(e){
        // console.log(e.explicitOriginalTarget.attributes[0].nodeValue)
        const deleteBtn = document.querySelector("#deleteBtn")
        deleteBtn.value = e.explicitOriginalTarget.attributes[0].nodeValue
        deleteFetch(deleteBtn.value)
        console.log(deleteBtn)
      }
      function deleteFetch(title, image_url){
        const bodyData = {title, image_url}
        fetch(`http://localhost:3000/api/v1/posts${post.id}`, {
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          },
          method: "DELETE"
        }).then(response => response.json())
        .then(json => console.log(json))
      }
    })

// likeBtn.addEventListener("click", function(e){
      //   createLikeHandler(e);
      // })
// function createLikeHandler(e){
//   e.preventDefault();
//   let more = parseInt(e.target.previousElementSibling.innerText) + 1
//     console.log(e)
// }
}
)
}

function createFormHandler(e){
  e.preventDefault();
  const formTitle = document.querySelector("#input-title").value;
  const formUrl = document.querySelector("#input-url").value;
  console.log(this)
  // postFetch(formTitle, formUrl);
}



function postFetch(title, image_url) {
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
    let likeBtn = document.createElement("button");
    let likeTxt = document.createTextNode("Likes")

    divContainer.appendChild(postContainer)
    postContainer.appendChild(h3)
    h3.appendChild(h3Text)
    postContainer.appendChild(img)
    postContainer.appendChild(editBtn)
    editBtn.appendChild(btnTxt)
    postContainer.appendChild(likeBtn)
    likeBtn.appendChild(likeTxt)
  })
}
