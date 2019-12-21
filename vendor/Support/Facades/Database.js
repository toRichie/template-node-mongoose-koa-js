import pluralize from "pluralize";
import { ok, fail } from "./DatabaseResponse";

const MAX_RESULTS = 100;

class Database {
  constructor(model, key = "_id") {
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.key = key;
  }
  list() {
    return this.model
      .find({})
      .limit(MAX_RESULTS)
      .then(modelInstances => {
        var response = {};
        response[pluralize(this.modelName)] = modelInstances;
        return response;
      });
  }
  create(data) {
    return this.model.create(data).then(modelInstance => {
      var response = {};
      response[this.modelName] = modelInstance;
      return response;
    });
  }
  read(id) {
    var filter = {};
    filter[this.key] = id;

    return this.model.findOne(filter).then(modelInstance => {
      var response = {};
      response[this.modelName] = modelInstance;
      return response;
    });
  }
  delete(id) {
    const filter = {};
    filter[this.key] = id;

    return this.model.remove(filter).then(() => {
      return {};
    });
  }
  /**
   */
  update(id, data) {
    var filter = {};
    filter[this.key] = id;

    return this.model
      .findOne(filter)
      .then(modelInstance => {
        for (var attribute in data) {
          if (
            data.hasOwnProperty(attribute) &&
            attribute !== this.key &&
            attribute !== "_id"
          ) {
            modelInstance[attribute] = data[attribute];
          }
        }

        return modelInstance.save();
      })
      .then(modelInstance => {
        var response = {};
        response[this.modelName] = modelInstance;
        return response;
      });
  }
}
export default Database;
