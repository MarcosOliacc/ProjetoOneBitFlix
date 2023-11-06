import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";


export const userController = {
    show: async (req:AuthenticatedRequest,res: Response) => {
        const currentUser = req.user!
        try {
            res.json(currentUser)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        try {
            const watching = await userService.getKeepWatching(userId)
            return res.json(watching)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },
    update: async (req: AuthenticatedRequest, res: Response) => {
        const id = req.user!.id
        const { firstName, lastName, phone, email, birth } = req.body

        try {
            const updatedUser = await userService.update(id, { firstName, lastName, phone, email, birth })
            return res.json(updatedUser)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
                
            }
        }
    },
    updatePassword: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user!
        const {currentPassword, newPassword} = req.body
        user.checkPassword(currentPassword, async (err, isSame)=> {
            try {
                if (err) return res.status(400).json({message: err.message})
                if (!isSame) return res.status(401).json({message: 'incorrect password'})
                await userService.updatePassword(user.id,newPassword)
                return res.status(204).send()
            } catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message })
                }
            }            

        })


    }
}