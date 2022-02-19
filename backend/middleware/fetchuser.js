var jwt = require("jsonwebtoken");
const JWT_SECRET = "pramodatre";

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to the request obj
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ Error: "Please authenticate using a vaild token " })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ Error: "Please authenticate using a vaild token " })

    }
}
module.exports = fetchuser;