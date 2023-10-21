import { Request, Response } from "express";
import path from "path";
import fs from 'fs'
import { WatchTimeAttributes } from "../models/WatchTime";
import { WatchTime } from '../models'
export const episodeService = {
    stramEpisodeWithResponse: (res: Response, videoUrl: string, range: string | undefined) => {
        const filePath = path.join(__dirname, '..','..','uploads', videoUrl)

        try {
            const fileStat = fs.statSync(filePath)

            if(range){
                const parts = range.replace(/bytes=/, '').split('-')

                const start = parseInt(parts[0], 10)
                const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

                const chunkSize = (end-start) + 1

                const file = fs.createReadStream(filePath,{ start, end })

                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/mp4'
                }
                res.writeHead(206,head)

                file.pipe(res)
            } else {
                const head = {
                    'Content-Length': fileStat.size,
                    'Content-Type': 'video/mp4'
                }
                res.writeHead(200, head)

                fs.createReadStream(filePath).pipe(res)
            }
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }

    },
    getWatchTime: async (userId: number, episodeId: number ) => {
        const watch = await WatchTime.findOne({
            where: { userId, episodeId },
            attributes: ['seconds']
        })
        return watch
    },
    setWatchTime:async ({userId, episodeId, seconds}: WatchTimeAttributes) => {
        const watchAlready = await WatchTime.findOne({
            where: { userId, episodeId }
        })
        if(watchAlready) {
            watchAlready.seconds = seconds
            await watchAlready.save()
            return watchAlready
        } else {
            const watch = await WatchTime.create({ userId, episodeId, seconds })
            return watch  
        }


    }
}