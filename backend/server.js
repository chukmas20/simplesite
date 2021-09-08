const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

// app.get("/", (req,res)=>{
//    res.send("Api is Running");
// });



 app.use("/api/users", userRoutes)
 app.use("/api/notes", notesRoute)

 //-------deployment ---------

 __dirname = path.resolve();
 if(process.env.NODE_ENV === "production"){
     app.use(express.static(path.join(__dirname, '/client/build')))
     app.get("*", (req, res)=>{
         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
     })
 }else{
    app.get("/", (req,res)=>{
        res.send("Api is Running");
     });
 }

//  app.use(notFound);
//  app.use(errorHandler);

 const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on port${PORT}`);
})