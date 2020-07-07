const endpoint = "http://localhost:3000/api/v1/posts"

// *likes aren't saved when page reloads

  document.addEventListener("DOMContentLoaded", () => {
    getPosts();
  })

  function getPosts(){
  fetch(endpoint)
  .then(response => response.json())
  .then(posts => {
    posts.data.forEach(postData => {
      let post = new Post(postData)
      let likeBtn = post.postContainer.children[3]

      likeBtn.addEventListener("click", function(e){
        e.preventDefault()
        likes(e)
      })

      function likes(e){
        // console.log(posts)
          let more = parseInt(e.target.innerText[2]) + 1
          fetch(`http://localhost:3000/api/v1/posts/${post.id}/like/${posts.data[0].relationships.like.data.id}`,{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "counter": more
            })
          }).then(res => res.json())
          .then((like_obj => {
            // console.log(like_obj)
            let likeButton = document.querySelector(`[data-id='${like_obj.data.attributes.post_id}'] .like-buttons`);
            // console.log(like_obj.data)
            likeButton.innerHTML = `♥ ${like_obj.data.attributes.counter}`
          }))
        }

      // function editFormHandler(e){
      //     // e.preventDefault();
      //     const title = document.querySelector("#editTitle").value;
      //     const image_url = document.querySelector("#editUrl").value;
      //     editTitle.id = e.originalTarget.dataset
      //     patchFetch(title, image_url);
      //   }

      function deleteFetch(postOb){
        // console.log(this.location.reload)
        const bodyData = {postOb}
        fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          },
          method: "DELETE"
        }).then(response => response.json())
        .then(data => {
          // console.log(data)
          let current_post = document.querySelector(`[data-id='${data.data.id}']`)
          current_post.remove()
          // DELETE WORKS BUT POSTS DELETE AFTER REFRESH
          // console.log(post)
          // let post = document.querySelector(`[data-id='${data.data.id}']`);
        })
        // this.location.reload()
      }

      // function createFormHandler(e){
      //   e.preventDefault();
      //   const title = document.querySelector("#input-title").value;
      //   const image_url = document.querySelector("#input-url").value;
      //   // console.log(formTitle)
      //   postFetch(title, image_url);
      //   form.reset();
      // }
      // createPostForm.addEventListener("submit", (e) => {
      //   createFormHandler(e);
      // })

      function deleteFormHandler(e){
          // console.log(e.explicitOriginalTarget.attributes[0].nodeValue)
          // const deleteBtn = document.querySelector("#deleteBtn")
          const postOb = post
          // console.log(postOb)
          // deleteBtn.value = e.explicitOriginalTarget.attributes[0].nodeValue
          deleteFetch(postOb)
          // console.log(deleteBtn)
        }
      deleteBtn.addEventListener("click", (e) => {
      deleteFormHandler(e);
    })
    //   patchForm.addEventListener("submit", (e) => {
    //   editFormHandler(e)
    //
    //   //reset the input boxes after submit
    //
    // })
      // editBtn.addEventListener("click", function(e){
      //   postContainer.appendChild(patchForm);
      //   patchForm.appendChild(editTitle);
      //   patchForm.appendChild(editUrl);
      // })

    })})}
//     postFetch(title, image_url){
//       console.log(this)
//           const bodyData = {title, image_url}
//           console.log(bodyData)
//           fetch(endpoint, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json", //explicit about content type
//               "Accept": "application/json"
//           },
//             body: JSON.stringify(bodyData)
//           })
//           .then(response => response.json())
//           .then(bodyData => {
//             console.log(bodyData)
//             let current_post = document.querySelector(`[data-id='${bodyData.data.id}']`)
//             let div = document.querySelector("#div-container");
//             let postC = document.createElement("div");
//             postC.setAttribute("id", "post-container");
//             postC.setAttribute("data-id", `${bodyData.id}`);
//
//             let pTitle = document.createElement("h3");
//             let h3Text = document.createTextNode(`${bodyData.title}`)
//             let img = document.createElement("img");
//             img.setAttribute("src", `${bodyData.image_url}`)
//             img.setAttribute("height", "350");
//             img.setAttribute("width", "250");
//
//             let eBtn = document.createElement("button");
//             let ebtnTxt = document.createTextNode("Edit");
//             let lBtn = document.createElement("button");
//             let lTxt = document.createTextNode(`♡ ${0}`)
//             let dBtn = document.createElement("button");
//             let dTxt = document.createTextNode("Delete");
//
//             let comments = document.createElement("div");
//             comments.setAttribute("id", "comments");
//             let commentForm = document.createElement("FORM");
//             commentForm.setAttribute("id", "comment-form");
//             let comTxtArea = document.createElement("INPUT");
//             comTxtArea.setAttribute("type", "textarea");
//             comTxtArea.setAttribute("placeholder", "write your comment here")
//             let comSub = document.createElement("INPUT");
//             comSub.setAttribute("type", "submit")
//             comSub.setAttribute("value", "Submit")
//
//             div.appendChild(postC)
//             postC.appendChild(pTitle)
//             pTitle.appendChild(h3Text)
//             postC.appendChild(img)
//             postC.appendChild(eBtn)
//             eBtn.appendChild(ebtnTxt)
//             postC.appendChild(lBtn)
//             lBtn.appendChild(lTxt)
//             postC.appendChild(dBtn)
//             dBtn.appendChild(dTxt)
//             postC.appendChild(comments);
//             comments.appendChild(commentForm);
//             commentForm.appendChild(comTxtArea);
//             commentForm.appendChild(comSub);
// )}




class Like {
  constructor(likes){
    this.likes = likes
  }
}
class Comment {
  contructor(content){
    this.content = content
  }
}

class Post {
  constructor(attributes){

    this.id = attributes.id
    this.postContainer = document.createElement("div");
    this.postContainer.setAttribute("data-id", `${this.id}`);

    this.postContainer.innerHTML =  `
      <h3 class='post-title'>${attributes.attributes.title}</h3>
      <img id='imgUrl' src='${attributes.attributes.image_url}' width='250' height='350'>
      <button  class='edit-buttons' id='edit-button'>Edit</button>
      <button class='like-buttons' id='like-button' like-data-id='${this.id}'>♡ 0</button>
      <button id='deleteBtn' class='buttons' data-id='${attributes.id}'>Delete</button>
      <div id='comments'><form data-id='${attributes.id}' id='comment-form'>
      <input type='textarea' placeholder='write your comment here'><input id='comment-submit' type='submit' value='Submit'></form>
      </div>
      `
    this.postContainer.children[2].addEventListener("click", function(e){
        const patchForm = document.createElement("FORM");
        const editTitle = document.createElement("INPUT");
        const editUrl = document.createElement("INPUT");
        const editSubmit = document.createElement("INPUT");
        //create label for form
        //include placeholder names for fields
          patchForm.setAttribute("class", "patch-form");
          editTitle.setAttribute("type", "text");
          editTitle.setAttribute("class", "editTitle")
          editUrl.setAttribute("class", "editUrl");
          editUrl.setAttribute("type", "text");
          editSubmit.setAttribute("type", "submit");
          this.parentElement.append(patchForm)
            patchForm.appendChild(editTitle)
            patchForm.appendChild(editUrl)
            patchForm.appendChild(editSubmit)
            editSubmit.addEventListener("click", function(e){
              e.preventDefault()

              let title = editTitle.value
              let url = editUrl.value
              // console.log(attributes)
              patchFetch(title, url)
            })

            function patchFetch(title, image_url){
                const bodyData = {title, image_url}
                fetch(`http://localhost:3000/api/v1/posts/${attributes.id}`, {
                  headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                  },
                  method: 'PATCH',
                  body: JSON.stringify(bodyData),
                }).then(response => response.json())
                .then(data =>  {
                  //make the page reload after submitting patch
                  let currentContainer =  document.querySelector(`[data-id='${data.data.id}']`)
                  currentContainer.firstChild.innerHTML = data.data.attributes.title
                  currentContainer.childNodes[3].attributes[1].value = data.data.attributes.image_url
                })
              }
            })

            // function editFormHandler(e){
            //     // e.preventDefault();
            //     const title = document.querySelector("#editTitle").value;
            //     const image_url = document.querySelector("#editUrl").value;
            //     editTitle.id = e.originalTarget.dataset
            //     patchFetch(title, image_url);
            //   }
          //   patchForm.addEventListener("submit", (e) => {
          //   editFormHandler(e)
          //
          //   //reset the input boxes after submit
          //
          // })

    //       // let current_post = document.querySelector(`[data-id='${bodyData.data.id}']`)
    //   const current_p = document.querySelector(`[data-id='${this.attributes.id}']`)//.bind(this)//.appendChild(patchForm)
    //   console.log(current_p) //null
    //   // console.log(this) //correct, clicked edit button
    //   // const commentSub = document.getElementById('comment-submit')
    //   // console.log(commentSub)



    //

  // const form = document.getElementById('post-form')
  // h3.setAttribute("id", "post-title")
  // img.setAttribute("id", "imgUrl")
  // img.setAttribute("height", "350");
  // img.setAttribute("width", "250");
  // img.setAttribute("src", `${p.image_url}`)
  // let h3Text = document.createTextNode(`${p.title}`)
  //
  //
  // deleteBtn.setAttribute("id", "deleteBtn")
  // deleteBtn.setAttribute("class", "buttons")
  // editBtn.setAttribute("class", "buttons");
  // likeBtn.setAttribute("class", "like-buttons");
  // likeBtn.setAttribute("id", "like-button")
  // likeBtn.setAttribute("data-id", `${post.id}`)

  // patchForm.setAttribute("id", "patch-form");
  // editTitle.setAttribute("type", "text");
  // editTitle.setAttribute("id", "editTitle")
  // editUrl.setAttribute("id", "editUrl")
  // editUrl.setAttribute("type", "text");
  // editSubmit.setAttribute("type", "submit");

  // commentForm.setAttribute("data-id", `${post.id}`)
  // comments.setAttribute("id", "comments");
  // commentForm.setAttribute("id", "comment-form");
  // comTxtArea.setAttribute("type", "textarea");
  // comTxtArea.setAttribute("placeholder", "write your comment here")
  // comSub.setAttribute("type", "submit")
  // comSub.setAttribute("value", "Submit")
  // // create Edit btn
  // editBtn.setAttribute("id", `${post.id}`);
  // patchForm.setAttribute("data-id", `${post.id}`);
  // editTitle.setAttribute("placeholder", `${p.title}`)
  // editTitle.setAttribute("data-id", `${post.id}`)
  // editUrl.setAttribute("placeholder", `${p.image_url}`);
  // editUrl.setAttribute("data-id", `${post.id}`)
  // editSubmit.setAttribute("data-id", `${post.id}`);
  //
  // deleteBtn.setAttribute("data-id", `${post.id}`)
  // //append created elements
  // divContainer.appendChild(postContainer)
  // postContainer.appendChild(h3)
  // h3.appendChild(h3Text)
  // postContainer.appendChild(img)
  // postContainer.appendChild(editBtn)
  // editBtn.appendChild(btnTxt)
  // postContainer.appendChild(likeBtn)
  // likeBtn.appendChild(likeTxt)
  // postContainer.appendChild(deleteBtn);
  // deleteBtn.appendChild(deleteTxt);
  // postContainer.appendChild(comments);
  // comments.appendChild(commentForm);
  // commentForm.appendChild(comTxtArea);
  // commentForm.appendChild(comSub);


  // patchForm.appendChild(editSubmit);






    document.getElementById('div-container').appendChild(this.postContainer)



    // <div id="post-container" data-id="2"></div>
    // let h3 = document.createElement("h3");
    // let img = document.createElement("img");
    // let comments = document.createElement("div");
    // let commentForm = document.createElement("FORM");
    // let comTxtArea = document.createElement("INPUT");
    // let comSub = document.createElement("INPUT");
    // let deleteBtn = document.createElement("button");
    // let deleteTxt = document.createTextNode("Delete");
    // let editBtn = document.createElement("button");
    // let btnTxt = document.createTextNode("Edit");
    // let likeBtn = document.createElement("button");
    // let likeTxt = document.createTextNode(`♡ ${0}`);
    // this.name = name
    // this.image_url = image_url
  }
}


      // {let number
      // if(posts.data.relationships.like.data){
      //   number = post.relationships.likes.data.length
      // } else {
      //   number = 0
      // }
      // console.log(post.relationships.likes)
      // console.log(post.relationships.likes.data[0].id)
      // create DivContainer}

      // create post post-form
      // let commentForm = document.createElement("FORM");
      ///////////////////////////////////////////////////////////////////////////

      // function getLikes(){
      //   fetch(`http://localhost:3000/api/v1/posts`)
      //   .then(resp => resp.json())
      //   .then(likes => {
      //     likes.data.forEach(like => {
      //       let divContainer = document.querySelector("#div-container");
      //       let postContainer = document.createElement("div");
      //       postContainer.setAttribute("id", "post-container");
      //
      //     })
      //   })
      // }
      ///////////////////////////////////////////////////////////////////////////
  // likeBtn.addEventListener("click", function(e){
  //         createLikeHandler(e);
  //       })
  // function createLikeHandler(e){
  //   e.preventDefault();
  //   let more = parseInt(e.target.previousElementSibling.innerText) + 1
  //     console.log(e)
  // }



  //
  // function getLikes(){
  //   fetch(`http://localhost:3000/api/v1/posts/${post.id}/likes`)
  //   .then(resp => resp.json())
  //   .then(likes => {
  //     // console.log(likes)
  //   //   // console.log(post)
  //   //   // likes.forEach(like => {
  //   //     // console.log(like.attributes.likes)
  //   //     // postContainer.children[3].innerHTML[2] = post.relationships.likes.data
  //   //
  //   //     // console.log(post.relationships.likes.data)
  //   //     // console.log(postContainer.children[3].innerHTML[2] = like.attributes.likes)
  //   //     let likeo = document.querySelector("#like-button")
  //   //     let page = document.querySelector("#div-container")
  //   //     var i;
  //   //     for(i = 0; i < page.children.length; i++){
  //
  //   //     }
  //
  //    })
  //
  // }
  // getLikes()
  // patchForm.appendChild(editSubmit);
