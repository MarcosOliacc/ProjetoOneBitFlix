import { Response, Request } from "express"
import { courseService } from "../services/courseService"
import { getPaginatedParams } from "../helpers/getPaginatedParams"
export const coursesController = {
    // GET /courses/featured
    featured:async (req:Request, res: Response) => {
        

        try {
            const featuredCourses = await courseService.getFeaturedCourses()
            return res.json(featuredCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    // GET /courses/newest

    newest: async (req:Request, res: Response) => {
        try {
            const newestCourses = await courseService.getNewestCourses()
            return res.json(newestCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }  
        }
    },
    // GET /courses/search?name=
    search: async (req:Request, res: Response) => {
        const { name } = req.query
        const [page,perPage] = getPaginatedParams(req.query)
        try {
            if (typeof name !== 'string') throw new Error('params is not string')
            const courses = await courseService.findByName(name,page,perPage)
            return res.json(courses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }  
        }
    },
    // GET /courses/:id ----------------------------------
    show:async (req:Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    
}