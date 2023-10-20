import { Favotire } from "../models/Favorite"

export const favoriteService = {
    create: async (userId: number,courseId: number) => {
        const favorite = await Favotire.create({ userId, courseId })
        return favorite
    }
}