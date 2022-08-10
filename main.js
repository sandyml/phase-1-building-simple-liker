// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const errorModal = document.querySelector("#modal")

// Your JavaScript code goes here!
// event listener 
document.addEventListener("DOMContentLoaded", () => {
  //console.log("DOMContentLoaded has loaded",)
// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads - we will target the error modal
  //console.log(document.querySelector("#modal").innerText)
  //console.log(document.querySelector("#modal"))
  // const errorModal = document.querySelector("#modal")
  errorModal.classList.add("hidden")
  
  // console.log(errorModal)

  // CALL FIND LIKES 
  // findLikes()
  clickListener()

})

function hideError() {
  errorModal.classList.add("hidden") // line 53

}
// When a user clicks on an empty heart:
  // Invoke mimicServerCall to simulate making a server request
// need an event listener on all of the hearts 
function findLikes() {
  const likeArray = document.querySelectorAll(".like-glyph")
  likeArray.forEach((singularLike) => {
    singularLike.addEventListener("click", () => console.log("YOU FOUND LIKE BUTTON"))
  })
}
// GLOBAL EVENT DELEGATION 
function clickListener() {
  document.addEventListener("click", (event) => {
    // conditional logic: if i click on the hearts then console.log 'YOU FOUND LIKE BUTTON', otherwise do nothing 
    if(event.target.classList[0] === 'like-glyph'){
      // PROMISE ASYNCHRONOUS: need a .then()
      // invoke mimicServerCall
      mimicServerCall()
      .then((resp) => {
        const activatedHeart = event.target.classList.add("activated-heart");
        if (activatedHeart) {
          event.target.classList.remove("activated-heart")
          event.target.innerHTML = EMPTY_HEART
        } else {
          event.target.classList.add("activated-heart");
          event.target.innerHTML = FULL_HEART
        }    

      }) // 3 secs / 3000ms
      // implement a .catch
      .catch(error => {
        // errorModal.classList.remove("hidden") // if promise fails, .catch will catch error 
      // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
      setTimeout(() => {  
        hideError()
      }, 3000) 
      }) 

    }
  })
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
