import express from "express"
import { sequlize } from "./database"

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    sequlize.authenticate().then(()=>{
        console.log('DB conection successfull')
    })
    console.log(`Server started successfuly at port ${PORT}`)
})