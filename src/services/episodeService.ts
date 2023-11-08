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

             'video/mp4'
                }
                res.writeHead(206,head)

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