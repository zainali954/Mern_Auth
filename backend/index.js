import config from './config/config.js';
import app from './app.js'
import connectDB from './db/connectDB.js'

const port=config.PORT
connectDB().
then(app.listen(port, ()=>{
    console.log(`App is running on port: ${port}.`)
}))
