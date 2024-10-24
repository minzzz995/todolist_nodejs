const User = require('../model/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10

const userController = {}

userController.createUser = async (req, res)=>{
    try{
        const { email, name, password } = req.body;
        const user = await User.findOne({email})
        
        if (user) {
            return res.status(400).json({ status: 'fail', message: '이미 가입된 유저입니다' });
        }

        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({email, name, password:hash})
        await newUser.save()
        res.status(200).json({status:"success"})

    } catch(error) {
        res.status(400).json({status:'fail', message: error.message });
    }
}

userController.loginWithEmail = async(req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(user){
            const isMath = bcrypt.compareSync(password, user.password);
            if(isMath) {
                const token = user.generateToken();
                return res.status(200).json({status:"Success", user, token})
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다")
    } catch(error) {
        res.status(400).json({status:'fail', error:error.message});
    }
}

userController.getUser = async(req,res) => {
    try{
        const {userId} = req
        const user = await User.findById(userId).lean();
        if(!user){
            throw new Error("can not find user")
        }
        res.status(200).json({satatus: "success", user})
    }catch(error){
        res.status(400).json({status:"fail", message: error.message})        
    }
}

module.exports = userController;
