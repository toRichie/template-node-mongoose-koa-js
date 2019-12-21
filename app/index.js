"use strict";

import Koa from "koa";
import convert from "koa-convert";
import koaRes from "koa-res";
import bodyParser from "koa-bodyparser";
import userAgent from "koa-useragent";
import error from "koa-json-error";
import cors from "kcors";
import Router from 'koa-router';

/**
 * import all the routers
 *
 */
import UserRouter from "./routers/UserRouter";

const app = new Koa();

let errorOptions = {
  postFormat: (e, obj) => {
    if (process.env.NODE_ENV !== "production") {
      return obj;
    } else {
      delete obj.stack;
      delete obj.name;
      return obj;
    }
  }
};
app.use(error(errorOptions));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

app.use(async function responseTime(ctx, next) {
  const t1 = Date.now();
  await next();
  const t2 = Date.now();
  ctx.set("X-Response-Time", Math.ceil(t2 - t1) + "ms");
});

app.use(cors({
  origin: "*"
}));
app.use(userAgent);
app.use(convert(koaRes()));
app.use(bodyParser({
  enableTypes: ["json"]
}));

/**
 * register all the routes
 *
 */

const router = new Router();

router.get('/', ctx => {
  ctx.body = `Connected to ${process.env.APP_NAME} successfully!`;
});

router.get('/shipmentserver', ctx => {
  ctx.body = `${process.env.APP_NAME} is open for request.`;
});


app.use(router.routes());
app.use(UserRouter.routes());

export default app;