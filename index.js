const app = require('./app');
const http = require('http')
const PORT = 3000;
const {connectDb, sequelize} = require("./utils/db")

const server = http.createServer(app)

connectDb()

sequelize.sync().then(()=> {
    console.log('tablas creadas')
}).catch((error)=>{
    console.log('error', error)
})

app.listen(PORT,()=>{
    console.log('Server running on port '+PORT);
});