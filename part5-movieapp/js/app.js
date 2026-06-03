/**
 * @file app.js
 * Initializes the movie list into the application
 */

/**
 * initialMovies
 * @description - initial array of movies for our movie list application
 */
let initialMovies = [
  { id: 8, title: "Twilight", year: "2008", rating: 4 },
  { id: 9, title: "The Twilight Saga: New Moon", year: "2009", rating: 3 },
  { id: 10, title: "The Twilight Saga: Eclipse", year: "2010", rating: 2 },
  {
    id: 11,
    title: "The Twilight Saga: Breaking Dawn Part 1",
    year: "2011",
    rating: 3,
  },
  {
    id: 12,
    title: "The Twilight Saga: Breaking Dawn Part 2",
    year: "2012",
    rating: 4,
  },
  { id: 4, title: "Shrek", year: "2001", rating: 4 },
  { id: 5, title: "Shrek 2", year: "2004", rating: 5 },
  { id: 6, title: "Shrek The Third", year: "2007", rating: 3 },
  { id: 7, title: "Shrek Forever After", year: "2010", rating: 2 },
  { id: 1, title: "High School Musical", year: "2006", rating: 4 },
  { id: 2, title: "High School Musical 2", year: "2007", rating: 5 },
  {
    id: 3,
    title: "High School Musical 3: Senior Year",
    year: "2008",
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
