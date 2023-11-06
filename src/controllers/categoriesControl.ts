import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { getPaginatedParams } from "../helpers/getPaginatedParams";

export const categoriesController = {
    // GET /categories ------------------------------------------------
    index:async (req:Request, res:Response) => {
        
        try {
            const [ page, perPage ] = getPaginatedParams(req.query)
            const categories = await categoryService.findAllPaginated(page, perPage)
            res.json(categories)            
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    // GET /categories/:id ---------------------------------------------
    show: async (req: Request, res: Response) => {

        try {
            const { id } = req.params
            const category = await categoryService.findByIdCourses(id)
            return res.json(category)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }

}