/* check if app is production or not , if it is we don't want to load our db  
NODE_ENV is set by default by nodejs
.config to get database_url from .env and set it
*/
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express=require('express')
const app=express();
const expressLayouts=require('express-ejs-layouts');

//importing root router
const indexRouter=require('./routes/index')

//importing mongoose for mongodb
const mongoose=require('mongoose')

//connecting to db
//setting db from env as we want to connect to local server now but on deployment it will connect to vail server
mongoose.connect(process.env.DATABASE_URL)

//connecting to db
const db=mongoose.connection;

/* will log on connection error */
db.on('error',error=>console.error(error))

/* will run only once when db is connected */
db.once('open',()=>console.log("connected to mongoose"))


//setting views engine
app.set('view engine' ,'ejs')

//setting views folder
app.set('views',__dirname+'/views')

//setting layouts folder
app.set('layout' ,'layouts/layout')

//used to tell express layouts are being used
app.use(expressLayouts)

//Used to tell express where all static html/css files are
app.use(express.static('public'))

//using index router
app.use('/',indexRouter)

//starting nodejs on port no
//letting server decide which port number is running when appl is deployed else using default 8080 port
app.listen(process.env.PORT || 8080)



