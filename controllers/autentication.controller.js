const {Users}= require('../models');
const bcrypt = require('bcrypt');
const jwtutil = require('../utils/jwt.utils')
const SALT_ROUND= 10;

const register = async(req, res)=>{
    const {email, password}= req.body;
    const passwordHashed = await bcrypt.hash(password, SALT_ROUND);
    await Users.create({
        email: email,
        password: passwordHashed
    })
    return res.json({
        message: "Registered Successfully!"
    });
}
const login = async(req, res)=>{
    const {email, password} = req.body;

    const userByEmail = await Users.findOne({where: {email}})

    if (!userByEmail) return res.status(401).json({message: 'User not registered.'})

    const checkPassword = await  bcrypt.compare(password, userByEmail.password);

    if (!checkPassword) return res.status(401).json({message: 'Unauthorized access.'});
    const token= jwtutil.generateToken(userByEmail);
    
    return res.json({message: 'Login Successfully!', token: token});
    
}

module.exports={
    register,
    login
}