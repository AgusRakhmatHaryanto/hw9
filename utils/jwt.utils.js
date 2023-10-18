const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user)=>{
    const token = jwt.sign({
        email: user.email
    },
    process.env.SECRET_KEY,
    {
        expiresIn: "12h",
    });
    return token;
};

module.exports= {
    generateToken
}
