"use strict";

class SearchController {
  async index({ request, response }) {
    // const
    const { query, type, json } = request.all();
    // console.log(request.all());
    // console.log(query[0]);
    // console.log(jsonOfSearch);
    // console.log(request.all());
    var data = [];
    if (type == "FreeNow") {
      for (let i = 0; i < json.length; i++) {
        if (json[i].motorista == query) {
          data.push(json[i]);
        }
      }
    } else {
      for (let i = 0; i < json.length; i++) {
        if (json[i].Nome == query) {
          data.push(json[i]);
        }
      }
    }
    return data;
  }
}

module.exports = SearchController;
