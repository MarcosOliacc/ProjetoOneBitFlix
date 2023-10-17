import express from "express"
import { categoriesController } from "./controllers/categoriesControl"

const router = express.Router()

router.get('/categories', categoriesController.index)

export { router }