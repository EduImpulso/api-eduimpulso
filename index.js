const express = require('express'),
    server = express(),
    cors = require('cors');

require('dotenv/config');
    
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 5000

require('./routes/user.routes.js')(server);
require('./routes/message.routes.js')(server);
require('./routes/course.routes.js')(server);

server.get('/', (req, res) =>{
    res.json({message: "Wellcome to EduImpulso API"})
})

server.listen(PORT, () => {
    console.log(`Server on port: ${PORT}!`)
});
