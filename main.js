


// Accede a Botones de Categorías
const categoryButtons = document.querySelectorAll('.categories__button');


// Llamada a las categorias iniciales
function getCategories() {
    const URL = 'https://api.chucknorris.io/jokes/categories';
    const categoriesList = document.querySelector('.categories__list');

    fetch(URL)
        .then(response => response.json())
        .then(categories => {
            // Añade botones para cada categoría
            categories.forEach(category => {
                const newButton = document.createElement('button');
                newButton.className = 'categories__button';
                newButton.textContent = category;

                // Agrega el evento a los botones
                newButton.addEventListener('click', () => {
                    newButton.classList.toggle('categories__button--active');
                });

                categoriesList.appendChild(newButton);
            });
        })
        .catch(error => console.log(error.message));
}


// Llamada al chiste random sin categorías
function getJoke() {
    const URL = 'https://api.chucknorris.io/jokes/random';
    const jokeTitle = document.querySelector('.joke__title');

    fetch(URL)
        .then(response => response.json())
        .then(joke => {
            jokeTitle.textContent = joke.value;
        })
        .catch(error => console.log(error.message));
}


// Función para resetear los botones y llamar a un Joke random
function reset() {
    const resetButton = document.querySelector('.categories__reset');

    resetButton.addEventListener('click', () => {
        
        // Buscar botones activos
        let activeButtons = document.querySelectorAll('.categories__button--active');

        // Si hay botones activos se desactivan
        if (activeButtons.length > 0) {
            activeButtons.forEach(button => {
                button.classList.remove('categories__button--active');
            });
        }

        // Llamada para obtener un nuevo chiste
        getJoke();
    });
}

// Función para llamar a un Joke según categorías seleccionadas
function getJokeByCategories() {
    const newJokeButton = document.querySelector('.categories__newjoke');

    newJokeButton.addEventListener('click', () => {
        const categoriesSelected = [];

        let activeButtons = document.querySelectorAll('.categories__button--active');

        if (activeButtons.length > 0) {
            activeButtons.forEach(button => {
                categoriesSelected.push(button.textContent);
            });
        }

        const categoryString = categoriesSelected.join(','); 
        const URL = `https://api.chucknorris.io/jokes/random?category=${categoryString}`;
        const jokeTitle = document.querySelector('.joke__title');

        fetch(URL)
            .then(response => response.json())
            .then(joke => {
                jokeTitle.textContent = joke.value;
            })
            .catch(error => console.log(error.message));
    });
}

// Espera a la carga del DOM para ejecutar
document.addEventListener('DOMContentLoaded', () => {
    getCategories();
    getJoke();
    reset();
    getJokeByCategories();
});
