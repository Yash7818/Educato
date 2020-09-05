import express from 'express'
import User from '../models/usermodel'
import { getToken, isAuth } from '../utils'
import config from '../config'
import multer from 'multer';
import sharp from 'sharp';
import uuidv4 from 'uuid';
const router = express.Router();

const DIR = './public/'


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '-' + fileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/png' || file.mimetype == 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('The image is not compatible'))
        }
    }
})


router.put('/:id', isAuth, upload.single('avatar'), async (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const userId = req.params.id;
    const user = await User.findById(userId)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        // user.avatar = url+'/public/'+ req.file.filename || user.avatar
        const updateUser = await user.save();
        res.send({
            _id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            // avatar : updateUser.avatar,
            token: getToken(updateUser)
        })

    } else {
        res.status(404).send({ message: 'User not found' })
    }
})

// router.post('/mine/avatar',isAuth,upload.single('avatar'),async(req,res)=>{
//    const url = req.protocol + '://' + req.get('host')
//    const user = new User({

//    })
// })

export default router