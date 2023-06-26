import {
    create,
    get,
    getOne,
    update,
    deleteNgo,
    login
} from "../Controller/NGOController.js";
import express from "express";
import NgoMiddleware from "../Middleware/NgoMiddleware.js";
const router = express.Router();

// CREATE
router.post("/register", create());

// router.get("/",NgoMiddleware, get());
router.get("/get",NgoMiddleware,getOne());
router.patch("/:id",NgoMiddleware,update());
router.delete("/:id",NgoMiddleware,deleteNgo());
router.post("/login",login);


export default router;
