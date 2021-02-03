const express = require('express'),
    server = express(),
    cors = require('cors');
    
server.use(cors());
server.use(express.json());

require('./routes/message.routes.js')(server);
require('./routes/course.routes.js')(server);

server.get('/', (req, res) =>{
    res.json({message: "Wellcome to EduImpulso API"})
})

server.listen(5001, () => {
    console.log("Server on!")
});
