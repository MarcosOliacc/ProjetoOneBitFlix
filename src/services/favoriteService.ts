import { Favotire } from "../models/Favorite"

export const favoriteService = {
    findByUserId: async (userId:number) => {
        const favorite = await Favotire.findAll({
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
        const favorite = await Favotire.create({ userId, courseId })
        return favorite
    },
    delete: async (userId: number, courseId: number) => {
        await Favotire.destroy({
            where: { userId, courseId}
        })
    }
}