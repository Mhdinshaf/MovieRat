var apiKey="16f00b5b";
var apiUrl="https://www.omdbapi.com/";

function searchMovies() {
    var movieName = document.getElementById("searchInput").value;

    if( movieName ==""){
       alert("Please enter a movie name!");
       return; 
    }

    var url = apiUrl + "?apikey=" + apiKey + "&s=" + movieName;

    fetch(url)
        .then(function (response) { 
            return response.json();
})
        .then(function (data) {
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                document.getElementById("movieContainer").innerHTML = "<h3 class='text-danger text-center'>Movie not found!</h3>";
            }
})
.catch(function (error) {
            console.log("Error fetching data: ", error);
    });
}

function discoverMovie() {
    
    var keywords = ["Spider", "Bat", "Super", "Fast", "Joker", "Harry", "Iron", "Captain"];
    var randomIndex = Math.floor(Math.random() * keywords.length);
    var selectedWord = keywords[randomIndex];
    
   
    document.getElementById("searchInput").value = selectedWord;
    searchMovies(); 
}

function displayMovies(movies) {
    var container = document.getElementById("movieContainer");
    container.innerHTML = "";  

for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];

    var poster = movie.Poster
    if (poster === "N/A") {
        poster = "https://via.placeholder.com/300";
    }

    var Card = `
       <div class="col-md-3 col-6 mb-3">
                <div class="card h-100 bg-secondary text-white" onclick="getMovieDetails('${movie.imdbID}')">
                    <img src="${poster}" class="card-img-top" style="height: 300px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                    </div>
                </div>
            </div>
    `;
    container.innerHTML += Card;
    }  
}

function getMovieDetails(id) {

    var url = apiUrl + "?apikey=" + apiKey + "&i=" + id;

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
 
        document.getElementById("modalTitle").innerText = data.Title;
        document.getElementById("modalImage").src = data.Poster;
        document.getElementById("modalYear").innerText = data.Year;
        document.getElementById("modalPlot").innerText = data.Plot;

  
        document.getElementById("modalRating").innerText = data.imdbRating + "/10";
        document.getElementById("modalGenre").innerText = data.Genre;
        document.getElementById("modalDirector").innerText = data.Director;
        document.getElementById("modalActors").innerText = data.Actors;

       
        var myModal = new bootstrap.Modal(document.getElementById('movieModal'));
        myModal.show();
    });
}

window.onload = function() {
   
    document.getElementById("searchInput").value = "Avengers";
    searchMovies();
    
    setTimeout(function() {
        document.getElementById("searchInput").value = "";
    }, 1000);
};

