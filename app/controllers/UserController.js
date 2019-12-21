"use strict";

import Controller from "../../vendor/Support/Facades/Controller";
import User from "../models/User";
// var User = require('../../database/schema/UserSchema');

class UserController extends Controller {
  async index(ctx) {
    ctx.body = await User.list()
  }

  async create(ctx) {
    ctx.body = await User.create(ctx.request.body);
  }

  async show(ctx) {
    ctx.body = await User.read(ctx.params.id);
  }

  async update(ctx) {
    ctx.body = await User.update(ctx.params.id, ctx.request.body);
  }

  async destroy(ctx) {
    ctx.body = await User.delete(ctx.params.id);
  }
}

export default new UserController();
