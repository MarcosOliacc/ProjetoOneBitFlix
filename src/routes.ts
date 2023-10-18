import express from "express"
import { categoriesController } from "./controllers/categoriesControl"
import { coursesController } from "./controllers/coursesControl"

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)
router.get('/courses/:id', coursesController.show)

export { router }