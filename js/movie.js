/**
 * @file movie.js
 * @description this file holds the class definition for our MovieList
 * @author Jason Sam
 * @version 1.0.0
 *
 */

/**
 * MovieList
 * This class has 6 properties and numerous methods
 * @class
 * @property {string} rootId - the id of the HTML element where the list is to be displayed
 * @property {Array} movieList - the array of movies
 * @property {number} editId - the id of the movie being edited
 
 * @property {string} searchTerm - search string to search for
 * @property {string} searchMode - either search via title or id
 * @property {string} sortMode - how to sort the movie list before displaying
 *
 * @property {function} refresh - this method removes the current displayed list elements and replaces them with updated list elements
 */

class MovieList {
  constructor(rootId, movies) {
    this.rootId = rootId;
    this.movieList = movies;
    this.editId = null;

    this.searchTerm = "";
    this.searchMode = "title";
    this.sortMode = null;

    this.refresh();
  }

  // returns the root id of the MovieList class
  getRoot() {
    return document.getElementById(this.rootId);
  }

  /**
   * renderRow(movie)
   * renders a single line of the movie list
   * generates the required elements to display the movie item
   * @param {object} movie - the movie to be rendered
   * @return row - returns the row elements for the movie
   */
  renderRow(movie) {
    if (this.editId === movie.id) {
      return this.renderRowEdit(movie);
    } else {
      return this.renderRowView(movie);
    }
  }

  /**
   * renderRowView
   * renders the row in default view mode
   * displays Title, Year and Rating
   * changes Action buttons to Edit and Delete
   * @param {object} movie - the movie to render
   * @return row - the row elements to render
   */
  renderRowView(movie) {
    // Create row element with class movie-row
    const row = document.createElement("tr");
    row.classList.add("movie-row");
    // Assign the corresponding id to movie-row
    row.dataset.id = movie.id;

    // Create each column with corresponding class
    const colId = document.createElement("td");
    colId.classList.add("col-id");
    colId.textContent = movie.id;

    const colTitle = document.createElement("td");
    colTitle.classList.add("col-title");
    colTitle.textContent = movie.title;

    const colYear = document.createElement("td");
    colYear.classList.add("col-year");
    colYear.textContent = movie.year;

    const colRating = document.createElement("td");
    colRating.classList.add("col-rating");
    // Call the printRating method to generate stars according to rating given
    colRating.textContent = this.printRating(movie.rating);

    const colActions = document.createElement("td");
    colActions.classList.add("col-actions");

    // Create action buttons
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-edit";
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-danger";
    deleteBtn.textContent = "Delete";

    // Bind events to each button
    editBtn.addEventListener("click", () => {
      this.startEditMode(movie.id);
    });

    deleteBtn.addEventListener("click", () => {
      this.deleteMovie(movie.id);
    });

    // Append
    colActions.append(editBtn, deleteBtn);

    row.append(colId, colTitle, colYear, colRating, colActions);

    return row;
  }

  /**
   * renderRowEdit
   * renders the row in edit mode
   * utilises inputs and select box
   * changes Action buttons to Save and Cancel
   * @param {object} movie - the movie to render
   * @return row - the row elements to render
   */

  renderRowEdit(movie) {
    // Create row element with class movie-row
    const row = document.createElement("tr");
    row.classList.add("movie-row", "edit");
    // Assign the corresponding id to movie-row
    row.dataset.id = movie.id;

    // Create each column with corresponding class
    const colId = document.createElement("td");
    colId.classList.add("edit-id");
    colId.textContent = movie.id;

    const colTitle = document.createElement("td");
    colTitle.classList.add("col-title");

    const colYear = document.createElement("td");
    colYear.classList.add("col-year");

    const colRating = document.createElement("td");
    colRating.classList.add("col-rating");

    // Create inputs and select box
    const inputTitle = document.createElement("input");
    inputTitle.classList.add("edit-title");
    inputTitle.name = "input-title";
    inputTitle.value = movie.title;

    const inputYear = document.createElement("input");
    inputYear.classList.add("edit-year");
    inputYear.name = "input-year";
    inputYear.value = movie.year;

    const ratingSelect = document.createElement("select");
    ratingSelect.classList.add("edit-rating");
    ratingSelect.name = "rating-select";

    [0, 1, 2, 3, 4, 5].forEach((n) => {
      const option = document.createElement("option");
      option.value = n;
      option.textContent = n;
      if (n === movie.rating) option.selected = true;
      ratingSelect.appendChild(option);
    });

    const colActions = document.createElement("td");
    colActions.classList.add("edit-actions");

    // Create action buttons
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "btn btn-success";
    saveBtn.textContent = "Save";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "btn btn-danger";
    cancelBtn.textContent = "Cancel";

    // Bind events to each button
    saveBtn.addEventListener("click", () => {
      this.saveEdit(movie.id);
    });

    cancelBtn.addEventListener("click", () => {
      this.cancelEdit();
    });

    // Append corresponding items together
    colTitle.appendChild(inputTitle);
    colYear.appendChild(inputYear);
    colRating.appendChild(ratingSelect);
    colActions.append(saveBtn, cancelBtn);

    row.append(colId, colTitle, colYear, colRating, colActions);

    return row;
  }

  /**
   * saveEdit
   * saves the current edited field and renders it to the movie list section
   * @param {number} id - the id to save to
   */
  saveEdit(id) {
    // Find movie id
    const movie = this.getMovieById(id);
    if (!movie) {
      return;
    }

    // Locate row with matching data-id
    const root = this.getRoot();
    const row = root.querySelector(`tr[data-id="${id}"]`);
    if (!row) {
      return;
    }

    // Get values from input fields
    const title = row.querySelector(".edit-title").value;
    const year = row.querySelector(".edit-year").value;
    const rating = Number(row.querySelector(".edit-rating").value);

    // Validation
    if (!title) {
      alert("Movie title cannot be empty.");
      return;
    }

    // Year must be numeric if provided
    if (year && isNaN(Number(year))) {
      alert("Year must be a number.");
      return;
    }

    // Year must be no more than 4 characters
    if (year.length > 4) {
      alert(" Year must be no more than 4 characters.");
      return;
    }

    // Rating must be between 0 and 5
    if (rating < 0 || rating > 5) {
      alert("Rating must be between 0 and 5.");
      return;
    }

    // Update the movie
    movie.title = title;
    movie.year = year;
    movie.rating = rating;

    // Reset edit state to null
    this.editId = null;

    this.refresh();
  }

  /**
   * cancelEdit
   * cancels the current edited field - reverts it to the previous properties
   */
  cancelEdit() {
    this.editId = null;

    this.refresh();
  }

  /**
   * refresh
   * Remove the current displayed list elements and replace them with the updated list elements
   * @param {array} list - the movie list of MovieList class
   */
  refresh() {
    // Get root id
    const rootId = this.getRoot();

    // Clear the existing rows
    rootId.replaceChildren();

    // Get list depending on search / sort mode
    const list = this.getViewList();

    // If no results found
    if (list.length === 0) {
      const row = document.createElement("tr");

      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.classList.add("no-results");
      cell.textContent = "No movies found.";

      row.appendChild(cell);
      rootId.appendChild(row);

      return;
    }

    // For each movie in the given list, call the renderRow method
    for (let i = 0; i < list.length; i++) {
      const row = this.renderRow(list[i]);
      rootId.appendChild(row);
    }
  }

  /**
   * startEditMode
   * Enter edit mode on the selected movie row / ID
   * @param {number} id
   */
  startEditMode(id) {
    // Switch row being edited
    if (this.editId !== null) {
      this.cancelEdit();
    }

    // Find movie id
    const movie = this.getMovieById(id);
    if (!movie) {
      return;
    }

    // Assign id to edit id
    this.editId = id;

    this.refresh();
  }

  /**
   * printRating
   * Generates visual stars according to the rating
   * @param {number} rating - number of filled stars to print
   * @return {string} stars - returns the string containing the resulting stars
   */
  printRating(rating) {
    const max = 5;
    let stars = "";

    for (let i = 0; i < max; i++) {
      if (i < rating) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }

    return stars;
  }

  /**
   * getMovieById
   * Gets the movie with the corresponding id
   * Returns null if no movie found
   * @param {number} id
   * @return {object} movie
   */
  getMovieById(id) {
    // Check if matching id is found
    for (let i = 0; i < this.movieList.length; i++) {
      if (this.movieList[i].id === id) {
        return this.movieList[i];
      }
    }
    // If no movie found, return null
    return null;
  }

  /**
   * getIndexById
   * Gets the index of the movie with the given id
   * Returns the index position of the movie within the movieList array
   * Assumes that ids are unique
   * @param {number} id - id to search for
   * @return {number} index - index of the movie in the array. Returns -1 if not found
   */
  getIndexById(id) {
    for (let i = 0; i < this.movieList.length; i++) {
      if (this.movieList[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  /**
   * addMovie
   * Add the movie, with properties pulled from the add form, to the movie list array
   * @param {object} movie - the movie to be added to the array
   */
  addMovie(movie) {
    this.movieList.push(movie);

    this.refresh();
  }

  /**
   * deleteMovie
   * Delete the selected movie from the list
   * Added validation and confirmation for both movie object and index (array)
   */
  deleteMovie(id) {
    // Get movie from the array
    const movie = this.getMovieById(id);
    // If not found, return
    if (!movie) {
      return;
    }

    // Get confirmation
    const confirmDelete = confirm(
      `Are you sure you want to delete "${movie.title}" (${movie.year})?`,
    );

    // Get the index of the movie within the array
    const index = this.getIndexById(id);

    if (!confirmDelete) {
      return;
    }

    alert(`"${movie.title}" (${movie.year}) has been deleted.`);

    // Remove movie using splice method
    this.movieList.splice(index, 1);

    // Safely nullify id if neede
    if (this.editId === id) {
      this.editId = null;
    }

    this.refresh();
  }

  // SEARCH FUNCTIONS
  /**
   * searchMovieByTitle
   * @param {string} term - the search string / term to look for
   * @returns {array} results - array of movies that match
   */
  searchMovieByTitle(term) {
    const results = [];
    const searchTerm = term;

    // If no search terms given, return the (default) movie list
    if (!term) return this.movieList;

    // Check whether a search term is in the title
    for (let i = 0; i < this.movieList.length; i++) {
      const movie = this.movieList[i];

      if (movie.title.toLowerCase().includes(term.toLowerCase())) {
        results.push(movie);
      }
    }

    return results;
  }

  /**
   * searchMovieById
   * @param {string} id - id to search for - is converted to number within our method
   * @returns {array} results - array of movies that match
   */
  searchMovieById(id) {
    const results = [];
    const searchId = Number(id);

    // If no id given, return the (default) movie list
    if (!id) return this.movieList;

    // Check whether the id matches
    for (let i = 0; i < this.movieList.length; i++) {
      const movie = this.movieList[i];

      if (movie.id === Number(id)) {
        results.push(movie);
      }
    }

    return results;
  }

  // SORT FUNCTIONS
  /**
   * sortA2Z
   * Bubble Sort - sorts list alphabetically
   * @param {array} list - list of movies to sort
   * @return {array} results - sorted list of movies
   */
  sortA2Z(list) {
    const results = [];

    for (let i = 0; i < list.length; i++) {
      results.push(list[i]);
    }

    // using bubble sort
    // compares titles and switches them alphabetically
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        if (results[i].title.toLowerCase() > results[j].title.toLowerCase()) {
          const temp = results[i];
          results[i] = results[j];
          results[j] = temp;
        }
      }
    }

    return results;
  }

  /**
   * sortZ2A
   * Calls the sortA2Z function and reverses the list
   * @param {array} list - list of movies to sort
   * @return {array} results - sorted list of movies
   */
  sortZ2A(list) {
    const results = this.sortA2Z(list);
    return results.reverse();
  }

  /**
   * sortRating
   * Sort list by rating
   * @param {array} list - list of movies to sort
   * @return {array} results - list of movies sorted by rating
   */
  sortRating(list) {
    const results = [];

    for (let i = 0; i < list.length; i++) {
      results.push(list[i]);
    }

    // compare ratings and switches them accordingly
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        if (results[i].rating < results[j].rating) {
          const temp = results[i];
          results[i] = results[j];
          results[j] = temp;
        }
      }
    }

    return results;
  }

  /**
   * sortYear
   * Sort list by release year
   * @param {array} list - list of movies to sort
   * @return {array} results - list of movies sorted by release year
   */
  sortYear(list) {
    const results = [];

    for (let i = 0; i < list.length; i++) {
      results.push(list[i]);
    }

    // compare year and switch accordingly
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        if (results[i].year > results[j].year) {
          const temp = results[i];
          results[i] = results[j];
          results[j] = temp;
        }
      }
    }

    return results;
  }

  /**
   * sortId
   * Sort list by id
   * @param {array} list - list of movies to sort
   * @return {array} results - list of movies sorted by id
   */
  sortId(list) {
    const results = [];

    for (let i = 0; i < list.length; i++) {
      results.push(list[i]);
    }

    // compare id and switch accordingly
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        if (results[i].id > results[j].id) {
          const temp = results[i];
          results[i] = results[j];
          results[j] = temp;
        }
      }
    }

    return results;
  }

  getViewList() {
    let list = [...this.movieList];

    // 1. SEARCH TERM & SEARCH MODE
    if (this.searchTerm) {
      if (this.searchMode === "title") {
        const term = this.searchTerm.toLowerCase();

        const results = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].title.toLowerCase().includes(term)) {
            results.push(list[i]);
          }
        }
        list = results;
      }

      if (this.searchMode === "id") {
        const results = [];
        const id = Number(this.searchTerm);

        for (let i = 0; i < list.length; i++) {
          if (list[i].id === id) {
            results.push(list[i]);
          }
        }
        list = results;
      }
    }

    // 2. SORT MODE - switch statements for each sort method
    // TODO: can potentially not use id as a search mode and have it default
    switch (this.sortMode) {
      case "a2z":
        list = this.sortA2Z(list);
        break;

      case "z2a":
        list = this.sortZ2A(list);
        break;

      case "rating":
        list = this.sortRating(list);
        break;

      case "year":
        list = this.sortYear(list);
        break;

      case "id":
      default:
        list = this.sortId(list);
        break;
    }

    return list;
  }
}
