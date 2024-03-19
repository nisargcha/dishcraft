let data;
let url = 'https://forkify-api.herokuapp.com/api/v2/recipes?search=';
let key = '&key=fb571a0b-5d65-4b6f-8193-dbbf45c6afec';
let recicpeurl = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
showLoader();


async function search() {
    try {
        let res = document.getElementById('search_input').value;
        let final = finalurl(res);
        let dataobj = await fetchRecipe(final);
        hideLoader();
        document.getElementById('container').innerHTML = "";
        createCard(dataobj);
        console.log(dataobj);
    } catch (error) {
        console.error('Error during search:', error);
        hideLoader(); // Make sure to hide the loader even in case of an error
    }
}

function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

function finalurl(res) {
    return url + res + key;
}

async function fetchRecipe(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error; // Propagate the error to the caller
    } 
}

function createCard(res) {
    const recipes = res.data;
    const recipearray = recipes.recipes;

    if (!recipearray || recipearray.length === 0) {
        console.error('No recipes found.');
        return;
    }

    for (let i = 0; i < recipearray.length; i++) {
        const idofRecipe = recipearray[i].id;

        const recipecard = document.createElement('div');
        recipecard.setAttribute('class', 'recipe-card');

        const recipe_img = document.createElement('div');
        recipe_img.setAttribute('class', 'recipe-img');

        const img = document.createElement('img');
        img.setAttribute('src', recipearray[i].image_url);

        recipe_img.appendChild(img);
        recipecard.appendChild(recipe_img);

        const h1 = document.createElement('h1');
        h1.setAttribute('class', 'recipe-title');
        h1.innerText = recipearray[i].title;
        recipecard.appendChild(h1);

        const btn = document.createElement('button');
        btn.innerText = 'Recipe';
        btn.setAttribute('class', 'recipe-button');
        btn.addEventListener('click',()=>{
            showRecipeModal(idofRecipe);
        })
        btn.dataset.recipeId = idofRecipe; 
        recipecard.appendChild(btn);

        const container = document.getElementById('container');

        if (container) {
            container.appendChild(recipecard);
        } else {
            console.error('Container not found.');
        }
    }
}
// document.getElementById('container').addEventListener('click', function (event) {
//     const button = event.target.closest('.recipe-button');
//     if (button) {
//         const recipeId = button.dataset.recipeId;
//         if (recipeId) {
//             showRecipeModal(recipeId);
//         }
//     }
// });

function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

async function showRecipeModal(id) {
    try {
        let idurl = recipeidurl(id);
        console.log(idurl);
        data = await fetchRecipeByID(idurl);

        // Update modal content
        document.getElementById('recipeTitleModal').innerText = data.data.recipe.title;
        document.getElementById('recipeImageModal').src = data.data.recipe.image_url;
        let ingarray = data.data.recipe.ingredients;
        console.log(ingarray);

        const instructionsModal = document.getElementById('recipeInstructionsModal');
        instructionsModal.innerHTML = ''; // Clear previous content

        for (let i = 0; i < ingarray.length; i++) {
            const ingredient = ingarray[i];

            // Create a new div for each ingredient
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add('ingredient');

            // Create elements for quantity and description
            const quantityElement = document.createElement('span');
            quantityElement.classList.add('quantity');
            quantityElement.innerText = ingredient.quantity;

            const descriptionElement = document.createElement('span');
            descriptionElement.classList.add('description');
            descriptionElement.innerText = ingredient.description;

            // Append quantity and description to the ingredient div
            ingredientDiv.appendChild(quantityElement);
            ingredientDiv.appendChild(descriptionElement);

            // Append the ingredient div to the modal
            instructionsModal.appendChild(ingredientDiv);
        }

        // Display the modal
        document.getElementById('recipeModal').style.display = 'block';
    } catch (error) {
        console.error('Error showing recipe modal:', error);
    }
}


async function fetchRecipeByID(idurl) {
    try {
        let response = await fetch(idurl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error; // Propagate the error to the caller
    }
}
function recipeidurl(id){
    return recicpeurl + id;
}
