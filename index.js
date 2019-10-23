var moviesToDisplay = sort(database.movies);

function init () {
    populateCarousel(moviesToDisplay);
    var input = document.getElementsByTagName('input');
    for (var index = 0; index < input.length; index++) {
        input[index].addEventListener('input', handleInput);
    }
}

function handleImgClick(e) {
    var title = e.target.id;
    var movies = database.movies;
    var noMovies = document.getElementById("no-movies");

    if (noMovies) {
        noMovies.remove();
    } 

    for (var i = 0; i < movies.length; i++) {
        if(movies[i].title === title){
            var movieInfo = document.getElementsByClassName("movie-info")[0].children;

            movieInfo[0].children[0].setAttribute("src", movies[i].cover);
            movieInfo[0].children[0].setAttribute("alt", movies[i].title);
            movieInfo[1].children[0].innerHTML = movies[i].title;

            var li1 = document.createElement('li');
            li1.innerHTML = "Director: " + movies[i].director;
            var li2 = document.createElement('li');
            li2.innerHTML = "Year: " + movies[i].year;
            var li3 = document.createElement('li');
            li3.innerHTML = "Rating: " + movies[i].rating + "/10";
            var li4 = document.createElement('li');

            if (movies[i].haveIt) {
                li4.innerHTML = "Have It? Yes!";
            } else {
                li4.innerHTML = "Have it? No :(";
            }

            while (movieInfo[1].children[1].firstChild) movieInfo[1].children[1].removeChild(movieInfo[1].children[1].firstChild);

            movieInfo[1].children[1].append(li1, li2, li3, li4);

            movieInfo[2].children[0].innerHTML = movies[i].plot;
        }
    }
}

function handleInput (e) {
    var moviesToDisplay = [];
    populateCarousel(moviesToDisplay);
    
    if (e.target.value !== ''){
        var movies = database.movies;
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].title.toLowerCase().includes(e.target.value.toLowerCase())){
                moviesToDisplay.push(movies[i]);
            }
            populateCarousel(sort(moviesToDisplay));
        }
    }else{
        populateCarousel(sort(database.movies));
    }
}

function populateCarousel (movies) {
    var sliders = document.getElementsByClassName("slider");
    if (sliders[0].children.length > 0){
        while (sliders[0].firstChild) sliders[0].removeChild(sliders[0].firstChild);
    }

    if (movies.length === 0){
        sliders[0].append(document.createElement('h1'));
        sliders[0].children[0].innerHTML = 'No movies found';
    }else{
        for (var i = 0; i < movies.length; i++) {
            sliders[0].append(document.createElement('img'));
            var imgs = sliders[0].children;
            imgs[i].setAttribute("src", movies[i].cover);
            imgs[i].setAttribute("alt", movies[i].title);
            imgs[i].setAttribute("id", movies[i].title);
            imgs[i].addEventListener("click", handleImgClick);
        }
    }
}

function sort (movies) {
    return movies.sort(function (a, b) {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
    });

}

document.addEventListener("DOMContentLoaded", init);