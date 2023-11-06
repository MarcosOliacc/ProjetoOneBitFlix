import { Response, Request } from "express"
import { courseService } from "../services/courseService"
import { getPaginatedParams } from "../helpers/getPaginatedParams"
import { AuthenticatedRequest } from "../middlewares/auth"
import { likeService } from "../services/likeService"
import { favoriteService } from "../services/favoriteService"
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
    show:async (req:AuthenticatedRequest, res: Response) => {
        

        try {
            const courseId = req.params.id
            const userId = req.user!.id
            const course = await courseService.findByIdWithEpisodes(courseId)
            if(!course) return res.status(404).json({message: 'course not found'})
            
            const liked = await likeService.isLiked(userId, Number(courseId))
            const favorited = await favoriteService.isFavorited(userId, Number(courseId))
            return res.json({...course.get(), favorited, liked })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    popular:async (req:Request,res: Response) => {
        try {
            const topTen = await courseService.getTopTen()
            return res.json(topTen)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
    
}