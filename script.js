
const api_Link = 'https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=9be47324454c40c2b6006f586ea62c5a&page=1';
const img_Path = 'https://image.tmdb.org/t/p/w1280';
const search_Api = 'https://api.themoviedb.org/3/search/movie?api_key=9be47324454c40c2b6006f586ea62c5a&query=';




const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(api_Link);

function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      main.innerHTML = ''; // Clear previous results
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.setAttribute('class', 'thumbnail');
        img.src = img_Path + element.poster_path;

        const title = document.createElement('h3');
        title.textContent = element.title || element.original_name;

        const vote = document.createElement('div')
        vote.setAttribute('class','popularity')
        vote.textContent = (element.vote_average).toFixed(1) + '%'

        if (element.vote_average <= 7){
          vote.style.backgroundColor = 'red'
        }else if(element.vote_average < 8){
          vote.style.backgroundColor = 'orange'
        }else if(element.vote_average >= 8 ){
          vote.style.backgroundColor = 'green'
        }

        const p_release_date = document.createElement('p')
        p_release_date.textContent = `release date: ${element.release_date}` 


        div_card.appendChild(img);
        div_card.appendChild(title);
        div_card.appendChild(vote)
        div_card.appendChild(p_release_date)
        main.appendChild(div_card);
      });
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value.trim(); 
  if (searchItem) {
    returnMovies(search_Api + searchItem);
    search.value = "";
  }
});
