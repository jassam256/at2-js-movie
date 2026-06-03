/**
 * @file app.js
 * Initializes the movie list into the application
 */

/**
 * initialMovies
 * @description - initial array of movies for our movie list application
 * each movie is an object with properties id, title, year and rating
 */
let initialMovies = [
  { id: 8, title: "Twilight", year: 2008, rating: 4 },
  { id: 9, title: "The Twilight Saga: New Moon", year: 2009, rating: 3 },
  { id: 10, title: "The Twilight Saga: Eclipse", year: 2010, rating: 2 },
  {
    id: 11,
    title: "The Twilight Saga: Breaking Dawn Part 1",
    year: 2011,
    rating: 3,
  },
  {
    id: 12,
    title: "The Twilight Saga: Breaking Dawn Part 2",
    year: "2012",
    rating: 4,
  },
  { id: 4, title: "Shrek", year: 2001, rating: 4 },
  { id: 5, title: "Shrek 2", year: 2004, rating: 5 },
  { id: 6, title: "Shrek The Third", year: 2007, rating: 3 },
  { id: 7, title: "Shrek Forever After", year: 2010, rating: 2 },
  { id: 1, title: "High School Musical", year: 2006, rating: 4 },
  { id: 2, title: "High School Musical 2", year: 2007, rating: 5 },
  {
    id: 3,
    title: "High School Musical 3: Senior Year",
    year: 2008,
    rating: 3,
  },
];

/**
 * @memberof movieList
 * @instance movieList
 * @param {string} rootId - id of the HTML element where the list is to be displayed
 * @param {Array} initialMovies - the initial array for our movie list
 */
let movielist = new MovieList("list", initialMovies);

// FUNCTIONS
// TODO:
// check for duplicate ID

// ADD MOVIE FUNCTIONS
// add button
const addBtn = document.getElementById("add-save");

// Get input values from the add-form - create newMovie object, pass to addMovie method
addBtn.addEventListener("click", () => {
  const id = Number(document.getElementById("add-id").value);
  const title = document.getElementById("add-title").value.trim();
  const year = document.getElementById("add-year").value.trim();
  const rating = Number(document.getElementById("add-rating").value);

  // Check that id & title are filled
  if (!id || !title) {
    return;
  }

  const newMovie = {
    id,
    title,
    year,
    rating,
  };

  movielist.addMovie(newMovie);

  clearAddForm();
});

// cancel button
const cancelBtn = document.getElementById("add-cancel");

const id = document.getElementById("add-id");
const title = document.getElementById("add-title");
const year = document.getElementById("add-year");
const rating = document.getElementById("add-rating");

cancelBtn.addEventListener("click", () => confirmClearAddForm());

/**
 * clearAddForm
 * Clears all the fields in the add-form
 */
function clearAddForm() {
  // Get input fields and select options
  const id = document.getElementById("add-id");
  const title = document.getElementById("add-title");
  const year = document.getElementById("add-year");
  const rating = document.getElementById("add-rating");

  // Clear input fields
  id.value = "";
  title.value = "";
  year.value = "";
  // Reset rating to 0
  rating.value = 0;
}

/**
 * confimClearAddForm
 * Get confirmation to clear add-form fields
 */
function confirmClearAddForm() {
  // Check if any default values are changed
  if (
    id.value != "" ||
    title.value != "" ||
    year.value != "" ||
    rating.value != 0
  ) {
    // Get user confirmation before clearing fields
    const confirmCancel = confirm(
      "Are you sure you want to clear all fields in the add form?",
    );

    if (!confirmCancel) {
      return;
    } else {
      clearAddForm();
    }
  } else {
    return;
  }
}

// SEARCH FUNCTIONS
// search buttons
const searchTitle = document.getElementById("search-title");
const searchId = document.getElementById("search-id");
const searchInput = document.getElementById("search-string");

// Call search method
searchTitle.addEventListener("click", () => {
  const searchValue = searchInput.value.trim();

  const results = movielist.searchMovieByTitle(searchValue);

  movielist.refresh(results);
});

searchId.addEventListener("click", () => {
  const searchValue = searchInput.value.trim();

  const results = movielist.searchMovieById(searchValue);

  movielist.refresh(results);
});

// SORT FUNCTIONS
// sort buttons - add event listeners that call corresponding method
const sortA2Z = document.getElementById("sort-a2z");
const sortZ2A = document.getElementById("sort-z2a");
const sortRating = document.getElementById("sort-rating");
const sortYear = document.getElementById("sort-year");
const sortId = document.getElementById("sort-id");

sortA2Z.addEventListener("click", () => {
  const sorted = movielist.sortA2Z(movielist.movieList);
  movielist.refresh(sorted);
});

sortZ2A.addEventListener("click", () => {
  const sorted = movielist.sortZ2A(movielist.movieList);
  movielist.refresh(sorted);
});

sortRating.addEventListener("click", () => {
  const sorted = movielist.sortRating(movielist.movieList);
  movielist.refresh(sorted);
});

sortId.addEventListener("click", () => {
  const sorted = movielist.sortId(movielist.movieList);
  movielist.refresh(sorted);
});

sortYear.addEventListener("click", () => {
  const sorted = movielist.sortYear(movielist.movieList);
  movielist.refresh(sorted);
});
