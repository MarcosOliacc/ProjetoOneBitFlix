import { Response, Request } from "express"
import { courseService } from "../services/courseService"
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