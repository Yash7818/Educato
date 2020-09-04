import express from 'express'
import User from '../models/usermodel'
import { getToken, isAuth } from '../utils'
import config from '../config'
import multer from 'multer';
import sharp from 'sharp';
const bcrypt = require('bcryptjs')
const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        const updateUser = await user.save();
        res.send({
            _id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: getToken(updateUser)
        })

    } else {
        res.status(404).send({ message: 'User not found' })
    }
})


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: "please add email or password" });
    }
    await User.findOne({
        email,
    }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).send({ error: "invalid Email or Password" });
        }
        bcrypt.compare(password, savedUser.password).then((isMatch) => {
            if (isMatch) {
                const token = getToken(savedUser)
                const { _id, name, email, isAdmin } = savedUser;
                res.send({
                    _id,
                    name,
                    email,
                    isAdmin,
                    token
                });
            }
            else {
                return res.status(422).send("Error wromg Email or Password");
            }
        }).catch((err) => {
            res.status(404).send(err);
        });
    })
    // if(signinuser){
    //     res.send({
    //         _id:signinuser.id,
    //         name:signinuser.name,
    //         email:signinuser.email,
    //         isAdmin:signinuser.isAdmin,
    //         token:getToken(signinuser)
    //     })
    // } else{
    //     res.status(401).send({error: 'Invalid Credentials'})
    // }
})
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(422).send({ error: "pls add all fields correctly" });
        }
        User.findOne({ email }).then((savedUser) => {
            if (savedUser) {
                return res.status(404).send({ error: "User already Exists" });
            }
            bcrypt.hash(password, 8).then((hashedPassword) => {
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                })
                user.save().then(() => res.status(201).send({
                    message: "user saved succesfully"
                })).catch((err) => res.status(404).send(err));
            })
        })

    } catch (e) {
        res.status(404).send(e)
        console.log(e)
    }

})


const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('this file in not compatible'))
        }
        cb(undefined, true)
    }
})
router.post('/mine/avatar', isAuth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 1000, height: 1000 }).png().toBuffer()
    await req.user.save()
    res.send({
        avatar: buffer,
        token: getToken(buffer)
    })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

export default router