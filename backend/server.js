const app=require('./app');

const path=require('path');
const connectDatabase = require('./config/database');





connectDatabase();
 const server=app.listen(process.env.PORT,()=>{
    console.log(`server is listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('shutting down the server due tounhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })


})

process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('shutting down the server due to uncaughtException error');
    server.close(()=>{
        process.exit(1);
    })

})



