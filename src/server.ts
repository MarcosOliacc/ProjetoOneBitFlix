import express from "express"
import { sequlize } from "./database"
import { adminJSRouter, adminjs } from "./adminjs"
import { router } from "./routes"

const app = express()

app.use(adminjs.options.rootPath, adminJSRouter)

app.use(express.json())

app.use(express.static('public'))

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    sequlize.authenticate().then(()=>{
        console.log('DB conection successfull')
    })
    console.log(`Server started successfuly at port ${PORT}`)
})