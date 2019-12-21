import Router from "koa-router";
import UserController from "../controllers/UserController"

const router = new Router()
/**
 * set prefix for api
 */
router.prefix("/api")

/**
 * define the path for all the routes
 */

router
  .get("/users", UserController.index)
  .post("/users", UserController.create)
  .get("/users/:id", UserController.show)
  .put("/users/:id", UserController.update)
  .patch("/users/:id", UserController.update)
  .delete("/users/:id", UserController.destroy)

export default router
