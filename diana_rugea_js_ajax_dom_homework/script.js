let recipe = {};

const fetchRecipes = async (url, typeOfSearch) => {
  const res = await fetch(url);
  // console.log(url);
  try {
    const data = await res.json();
    const dataLength = Object.keys(data.meals).length;
    console.log(data);
    if (typeOfSearch === 0) {
      for (i = 0; i < dataLength; i++) {
        recipe.recipestrMeal = data.meals[i].strMeal;
        recipe.recipestrMealThumb = data.meals[i].strMealThumb;
        recipe.recipesMealId = data.meals[i].idMeal;
        // console.log(recipe);
        displayRecipes();
      }
    } else {
      recipe.recipestrMeal = data.meals[0].strMeal;
      recipe.recipestrMealThumb = data.meals[0].strMealThumb;
      recipe.recipestrInstructions = data.meals[0].strInstructions;
      recipe.recipestrTags = data.meals[0].strCategory;
      recipe.recipestrYoutube = data.meals[0].strYoutube;

      console.log(recipe);
      displayModal();
    }
  } catch (error) {
    console.log("Problem reaching the Recipes API", error);
  }
};

function getAllRecipes() {
  const getRecipes = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  return fetchRecipes(getRecipes, 0);
}

function getRecipeByIngredient(ingredient) {
  const ingredientRecipe =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
  const ingredientURLInput = `${ingredientRecipe}${ingredient}`;
  console.log(ingredientURLInput);
  return fetchRecipes(ingredientURLInput, 0);
}

function getRecipeById(idMeal) {
  const idRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  const idRecipeURL = `${idRecipe}${idMeal}`;
  return fetchRecipes(idRecipeURL, 1);
}

getAllRecipes();

function displayRecipes() {
  console.log(recipe);
  let strMeal = recipe.recipestrMeal;
  let imageURL = recipe.recipestrMealThumb;
  let idMeal = recipe.recipesMealId;

  const listItem = document.createElement("li");
  const paragraphSection = document.createElement("div");
  const nameParagraph = document.createElement("p");
  const imageRecipe = document.createElement("img");
  const recipeBtn = document.createElement("button");

  paragraphSection.classList.add("paragraph-section");
  nameParagraph.classList.add("title");
  listItem.classList.add("recipe-card");
  recipeBtn.classList.add("recipe-btn");

  nameParagraph.textContent = strMeal;
  imageRecipe.src = imageURL;
  recipeBtn.textContent = "Get Recipe ";
  // console.log(idMeal);

  document.getElementById("recipe").appendChild(listItem);
  listItem.appendChild(imageRecipe);
  listItem.appendChild(paragraphSection);

  paragraphSection.appendChild(nameParagraph);
  paragraphSection.appendChild(recipeBtn);

  recipeBtn.addEventListener("click", function () {
    // console.log("Hey! You clicked this button. " + idMeal)
    getRecipeById(idMeal);
  });
}

$(document).ready(function () {
  $("#submit-btn").click(function () {
    // console.log("Button is Working");
    $("#recipe").empty();
    searchInput();
  });
});

function searchInput() {
  let searchInput = document.getElementById("searchInput").value;
  let formattedInput = searchInput.replace(/\s+/g, "_");
  console.log(searchInput);
  getRecipeByIngredient(formattedInput);
}

function displayModal() {
  let strMeal = recipe.recipestrMeal;
  let strTags = recipe.recipestrTags;
  let strInstructions = recipe.recipestrInstructions;
  let imageURL = recipe.recipestrMealThumb;
  let strYoutube = recipe.recipestrYoutube;

  const modal = document.getElementById("recipeModal");
  modal.style.display = "block";
  const modalContent = document.getElementById("modalContent");

  $("body").css("overflow", "hidden");

  const span = document.getElementsByClassName("close")[0];
  const addedContent = document.getElementById("contentToBeCleared");

  span.onclick = function () {
    modal.style.display = "none";
    clearModal();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      clearModal();
    }
  };

  const modalTitle = document.createElement("h1");
  const modalTag = document.createElement("p");
  const modalInstructionsTitle = document.createElement("h2");
  const modalInstructions = document.createElement("p");
  const modalImage = document.createElement("img");
  const modalBreakLine = document.createElement("br");
  const modalYoutubeLink = document.createElement("a");

  modalTitle.textContent = strMeal;
  modalTag.textContent = strTags;
  modalInstructionsTitle.textContent = "Instructions:";
  modalInstructions.textContent = strInstructions;
  modalImage.src = imageURL;
  let link = document.createTextNode("Watch Video");
  modalYoutubeLink.appendChild(link);
  modalYoutubeLink.title = "Watch Video";
  modalYoutubeLink.href = strYoutube;

  modalTitle.classList.add("modal-title");
  modalTag.classList.add("modal-tag");
  modalInstructionsTitle.classList.add("modal-instructions-title");
  modalImage.classList.add("modal-image");
  modalYoutubeLink.classList.add("modal-link");
  modalInstructions.classList.add("modal-instructions");

  modalContent.appendChild(addedContent);
  addedContent.appendChild(modalTitle);
  addedContent.appendChild(modalTag);
  addedContent.appendChild(modalInstructionsTitle);
  addedContent.appendChild(modalInstructions);
  addedContent.appendChild(modalImage);
  addedContent.appendChild(modalBreakLine);
  addedContent.appendChild(modalYoutubeLink);
}

function clearModal() {
  $("#contentToBeCleared").empty();
  $("body").css("overflow", "visible");
}
