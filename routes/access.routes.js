const { Router } = require("express");
const { verifyTokenMiddleware } = require("../middlewares/user.middlewares");
const { grantAccess, removeAccess } = require("../controllers/access.controllers");

const accessRouter = Router();

accessRouter.post("/grant", verifyTokenMiddleware, grantAccess);

accessRouter.post("/remove", verifyTokenMiddleware, removeAccess);


module.exports = accessRouter;