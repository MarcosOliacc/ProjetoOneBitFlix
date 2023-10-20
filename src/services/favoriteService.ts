import { Favorite } from "../models/Favorite"

export const favoriteService = {
    findByUserId: async (userId:number) => {
        const favorite = await Favorite.findAll({
            where: { userId },
            include: {
                association: 'Course',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url','thumbnailUrl']
                ]
            },
            attributes: [['user_id','userId']]
        })
        return {
            userId,
            courses: favorite.map(fav=> fav.Course)
        }
    },
    create: async (userId: number,courseId: number) => {
        const favorite = await Favorite.create({ userId, courseId })
        return favorite
    },
    delete: async (userId: number, courseId: number) => {
        await Favorite.destroy({
            where: { userId, courseId}
        })
    },
    isFavorited:async (userId:number, courseId: number ) => {
        const fav = await Favorite.findOne({
            where: { userId, courseId }
        })
        return fav !== null 
    }
}