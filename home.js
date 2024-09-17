let userName = document.getElementById('userNameHeader');
let cardsSection = document.getElementById('cardsSection');
let signOut = document.getElementById('signOut');
let bgAccess = document.getElementById('bgAccess');


if (localStorage.getItem('userEmail') && localStorage.getItem('userName')) {
  userName.innerText = `Welcome: `;
  let userNameText = document.createElement('b');
  userNameText.innerText = localStorage.getItem('userName');
  userNameText.style.color = '#ff7287';
  userName.append(userNameText);
  fetchMovies();
} else {
  let flexSection = document.createElement('div');
  flexSection.classList.add('flexSection');
  let textAuthorized = document.createElement('h1');
  textAuthorized.innerText = 'Access not authorized';
  textAuthorized.classList.add('text-danger', 'bg-light-subtle');
  textAuthorized.style.padding = '1rem';
  textAuthorized.style.borderRadius = '10px';
  flexSection.appendChild(textAuthorized);
  cardsSection.appendChild(flexSection);
  signOut.innerHTML= "Back to login"
  bgAccess.style.backgroundColor ="black"
  bgAccess.style.height ="100vh"
  userName.innerText = `Not logged in :(`;
  
}

async function fetchMovies() {
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key=802d1355530b8a3d8cddc201b7e66441&language=en-US&page=1';
  
    let res = await fetch(url, { method: 'GET' });
    let data = await res.json();
    
    data.results.forEach((element) => {
      let cardContainer = document.createElement('div');
      cardContainer.classList.add('col-12', 'col-md-3', 'mb-4', 'd-flex', 'align-items-stretch'); 
  
      let card = document.createElement('div');
      card.classList.add('card', 'h-100'); 
  
      let img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
      img.alt = element.title;
  
      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column');
  
      let title = document.createElement('h5');
      title.classList.add('card-title');
      title.innerText = element.title;
  
      let rating = document.createElement('p');
      rating.classList.add('card-text');
      rating.innerHTML = ` ${element.vote_average} <i class="fa-solid fa-star" style="color: gold;"></i>`;
  
      // إضافة زر "Watch Now"
      let watchButton = document.createElement('a');
      watchButton.classList.add('btn', 'btn-danger', 'mt-auto'); 
      watchButton.href = '#'; 
      watchButton.innerText = 'Watch Now';
  
      cardBody.append(title);
      cardBody.append(rating);
      cardBody.append(watchButton); 
      card.append(img);
      card.append(cardBody);
      cardContainer.append(card);
      cardsSection.append(cardContainer);
    });
  }
  


signOut.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = './login.html';
});
