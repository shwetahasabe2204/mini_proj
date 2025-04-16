import express from 'express'
import { adminRouter } from './routers/AdminRouter'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
app.use('/admin',adminRouter)

app.get('/',(req,res)=>{
    res.send('hi')
})

app.listen(3000,()=>{
    console.log("Server has been strated")
})