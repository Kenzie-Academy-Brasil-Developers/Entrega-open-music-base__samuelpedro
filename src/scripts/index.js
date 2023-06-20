const renderDarkMode = () =>{
  const buttonDarkMode = document.querySelector('.button-dark__mode')
  const html = document.querySelector('html')

  buttonDarkMode.addEventListener('click', () => {
    html.classList.toggle('dark__mode')

    if(html.classList.contains('dark__mode')){
      buttonDarkMode.innerText = 'Light Mode'
      localStorage.setItem('darkMode', true)
    }
    else {
      buttonDarkMode.innerText = 'Dark Mode'
      localStorage.setItem('darkMode', false)
    }
  })
}

function createCard(product) {
  const cardContainer = document.createElement("li");
  cardContainer.classList.add("card");

  const image = document.createElement("img");
  image.src = product.img;

  const artist = document.createElement("p");
  artist.innerText = product.band + " " + product.year;
  artist.classList.add("p__artist")

  const title = document.createElement("h2");
  title.innerText = product.title;

  const price = document.createElement("p");
  price.innerText = "R$ " + product.price;
  price.classList.add("p-card__price")
  const button = document.createElement("button");
  button.innerText = "Comprar";

  if (localStorage.getItem("darkMode") === "true") {
    cardContainer.classList.add("dark__mode");
    image.classList.add("dark__mode");
    artist.classList.add("dark__mode");
    title.classList.add("dark__mode");
    price.classList.add("dark__mode");
    button.classList.add("dark__mode");
  }  

  cardContainer.appendChild(image);
  cardContainer.appendChild(artist);
  cardContainer.appendChild(title);
  cardContainer.appendChild(price);
  cardContainer.appendChild(button);

  return cardContainer;
}

function renderCards(products) {
    const renderAlbuns = document.querySelector(".render__albuns");
  
    products.forEach((product) => {
      const card = createCard(product);
      renderAlbuns.appendChild(card);
    });
}

function renderButtons(categories) {
  const listButtons = document.querySelector('.ul__buttons')

  categories.forEach((category, index) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("buttons__style")
    button.innerText = category;
    button.dataset.categoryIndex = index; // Adiciona o atributo data-category-index
    listButtons.appendChild(listItem);
    listItem.appendChild(button);
  });
}


function filteredButtons(categories, products) {
  const buttons = document.querySelectorAll(".buttons__style");
  const priceInput = document.querySelector(".pricevalue");
  const priceText = document.querySelector(".p__price");
  const renderAlbuns = document.querySelector(".render__albuns");
  
  let filteredProducts = products; // Array inicial de produtos filtrados
  let categoryIndex = 0; // Índice da categoria selecionada
  let maxPrice = parseFloat(priceInput.value); // Valor máximo do preço
  priceInput.value = maxPrice;
  priceText.innerText = `Até R$ ${maxPrice}`;


  function renderFilteredCards() {
    renderAlbuns.innerHTML = ""; // Limpar os cards antes da iteração

    const filteredCards = filteredProducts.map((product) => createCard(product));
    filteredCards.forEach((card) => renderAlbuns.appendChild(card));
  }

  function filterProducts() {
    if (categoryIndex === 0) {
      return products.filter((product) => product.price <= maxPrice);
    } else {
      return products.filter(
        (product) =>
          product.category === categoryIndex && product.price <= maxPrice
      );
    }
  }

  priceInput.addEventListener("input", () => {
    maxPrice = parseFloat(priceInput.value);
    priceText.innerText = `Até R$ ${maxPrice}`;

    filteredProducts = filterProducts(); // Filtrar os produtos novamente

    renderFilteredCards();
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryIndex = parseInt(button.dataset.categoryIndex);

      filteredProducts = filterProducts(); // Filtrar os produtos novamente

      renderFilteredCards();
    });
  });

  renderFilteredCards(); // Renderizar os cards iniciais
}

function toggleDarkMode() {
  const body = document.body;
  const buttons = document.querySelectorAll(".buttons__style");
  const darkModeButton = document.querySelector(".button-dark__mode");

  darkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark__mode");

    buttons.forEach((button) => {
      if (body.classList.contains("dark__mode")) {
        button.classList.add("dark__mode");
      } else {
        button.classList.remove("dark__mode");
      }
    });

    if (body.classList.contains("dark__mode")) {
      darkModeButton.innerHTML = '<i class="fa-sharp fa-solid fa-sun"></i>';
      localStorage.setItem("darkMode", "true");
    } else {
      darkModeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem("darkMode", "false");
    }
  });

  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    body.classList.add("dark__mode");
    darkModeButton.innerHTML = '<i class="fa-sharp fa-solid fa-sun"></i>';
  } else {
    body.classList.remove("dark__mode");
    darkModeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

renderButtons(categories);
renderCards(products);
filteredButtons(categories, products);
renderDarkMode();
toggleDarkMode();