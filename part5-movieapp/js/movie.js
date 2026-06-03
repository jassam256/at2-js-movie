/**
 * @file movie.js
 * @description this file holds the class definition for our MovieList
 * @author Jason Sam
 * @version 1.0.0
 *
 */

/**
 * MovieList
 * This class has 2 properties and numerous methods
 * @class
 * @property {string} rootId - the id of the HTML element where the list is to be displayed
 * @property {Array} movieList - the array of movies
 * @property {function} refresh - this method removes the current displayed list elements and replaces them with updated list elements
 */

class MovieList {
  constructor(rootId, movies) {
    this.rootId = rootId;
    this.movieList = movies;

    this.refresh();
  }

  /**
   * movieRow
   */

  refresh() {}
}
