const MAX_RESULTS = 100;

class Mongo {
  constructor(model, key = "_id") {
    this.model = model;
    this.key = key;
  }
  list() {
    return this.model
      .find({})
      .limit(MAX_RESULTS)
      .then(res => res);
  }
  create(data) {
    return this.model.create(data).then(res => res);
  }
  createMany(data) {
    return this.model.insertMany(data).then(res => res);
  }
  read(id) {
    return this.model.findById(id).then(res => res);
  }

  delete(id) {
    return this.model.findByIdAndRemove(id).then(res => res)
  }

  deletePull(where, block) {
    return this.model
      .updateOne(where, {
        $pull: block
      })
      .then(modelInstance => {
        var res = {};
        res[this.modelName] = modelInstance;
        return res;
      });
  }

  createPush(where, data) {
    return this.model
      .updateOne(where, {
        $push: data
      })
      .then(modelInstance => {
        var res = {};
        res[this.modelName] = modelInstance;
        return res;
      });
  }

  update(id, data) {
    return this.model.findOneAndUpdate({ _id: id }, data, { new: true })
      .then(res => res);
  }

  updateSet(where, data) {
    return this.model.updateOne(where, {
      $set: data
    }).then(res => {
      return res;
    });
  }

  updateSetReturn(where, data) {
    return this.model
      .findOneAndUpdate(where,
        { $set: data }, { new: true })
      .then(modelInstance => {
        return modelInstance;
      });
  }

  findWhere(query) {
    return this.model.find(query).then(res => {
      return res;
    });
  }

  findWhere(query, fields) {
    return this.model.find(query, fields).then(res => {
      return res;
    });
  }

  async aggregation(query) {
    return this.model
      .aggregate(query)
  }
}
export default Mongo;
