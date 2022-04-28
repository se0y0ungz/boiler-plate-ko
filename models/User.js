const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const saltRounds = 10 //salt가 몇글자인지



const userSchema = mongoose.Schema({
    name :{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true, //공백제거
        unique:1
    },
    password:{
        type:String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default: 0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save', function(next){
    var user = this;

    //password가 바뀔때만 암호화
    if(user.isModified('password')) { 
        //비밀번호를 암호화 시킨다.

        //salt를 만들때 saltRounds 필요
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            //salt를 제대로 생성했다면
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)

                user.password = hash
                next()
            })
        })
    }

})

const User = mongoose.model('User', userSchema) //스키마로 감싸준다

module.exports = {User} // 다른 곳에서도 쓸 수 있게 