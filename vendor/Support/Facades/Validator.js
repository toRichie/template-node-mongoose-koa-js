import joi from "joi";

class Validator {
  /**
   * validate the given request with joi rules
   *
   */

  constructor(ctx, rules = {}) {
    const request = ctx.request.body;
    const settings = { abortEarly: false };

    const result = joi.validate(request, rules, settings);

    if (result.error)
      ctx.throw(400, "Bad request: Validation failed", {
        message: this.parser(result.error.details)
      });
  }

  /**
   * parse all the errors
   *
   * @param {*} err
   */
  parser(err) {
    var obj = {};
    for (var i = 0; i < err.length; i++) {
      var item = err[i];
      var field = item.context.key;
      obj[field] = [item.message];
    }
    return obj;
  }
}

export default Validator;
