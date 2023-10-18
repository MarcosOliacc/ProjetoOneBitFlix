import express from "express"
import { categoriesController } from "./controllers/categoriesControl"
import { coursesController } from "./controllers/coursesControl"
import { episodesController } from "./controllers/episodesControl"

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', coursesController.search)
router.get('/courses/:id', coursesController.show)

router.get('/episodes/stream', episodesController.stream)


export { router }