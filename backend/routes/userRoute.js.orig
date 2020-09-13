import express from 'express'
import User from '../models/usermodel'
import { getToken, isAuth } from '../utils'
import multer from 'multer';
import sharp from 'sharp';
import uuidv4 from 'uuid';
const router = express.Router();

const DIR = './public/'


router.post('/signin', async (req, res) => {
    const signinuser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (signinuser) {
        res.send({
            _id: signinuser.id,
            name: signinuser.name,
            email: signinuser.email,
            isAdmin: signinuser.isAdmin,
            token: getToken(signinuser)
        })
    } else {
        res.status(401).send({ error: 'Invalid Credentials' })
    }
})
<<<<<<< HEAD
router.post('/register',async(req,res)=>{

    const inuser = await User.findOne({
        email:req.body.email
    })
    if(inuser){
        return new Error('User already exist')
    }
    
    try{
=======
router.post('/register', async (req, res) => {
    try {
>>>>>>> bfdaabb0e9380d5c8966a08de84e1fb29bcce906
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        const newUser = await user.save()
        if (newUser) {
            res.send({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                token: getToken(newUser)
            })
        }
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