let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toy) => toyFunction(toy))

function toyFunction(toy){
  toy.map((toyCards) => {
    const collection = document.querySelector(`#toy-collection`)
    let card = document.createElement("div")
    card.className = "card"
    let names = document.createElement("h2")
    names.innerText = toyCards.name
    let imgs = document.createElement("img")
    imgs.src = toyCards.image
    imgs.className = "toy-card"
    let likes = document.createElement("p")
    likes.innerText = `This toy has ${toyCards.likes} likes`
    const button = document.createElement("button")
    button.className = "like-btn"
    button.id = `${toyCards.id}`
    button.innerText = "Like ❤️"
    collection.appendChild(card)
    card.appendChild(names)
    card.appendChild(imgs)
    card.appendChild(likes)
    card.appendChild(button)
  })
}

let submitButton = document.getElementsByName("submit")[0];
submitButton.addEventListener("click", (event) => {
  event.preventDefault()

  let newName = document.getElementsByName("name")[0]
  let newImage = document.getElementsByName("image")[0]

  fetch("http://localhost:3000/toys", { 
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newName.value,
      image: newImage.value,
      likes: 0
    })
  })
})

const likeBttn = document.querySelector("button")
likeBttn.addEventListener("click", (event) => {
  fetch("http://localhost:3000/toys/:id", {
    method: "PATCH", 
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes++
    })
  })
    .then((response) => response.json())
    .then((currentLikes) => likes.innerText =  `This toy has ${currentLikes.likes} likes`)
})
