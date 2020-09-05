const express = require("express");
const router = express.Router();
const Video = require('../models/videomodel')
import { isAuth } from "../utils"

router.post('/createvideo', isAuth, (req, res) => {
    const { title, body, url } = req.body;
    if (!title || !body || !url) {
        return res.status(422).send({ error: "Plase add all the fields" });
    }
    console.log(req.user);
    console.log(title, body, url);
    const video = new Video({
        title: title,
        body: body,
        url: url,
        postedBy: req.user
    })
    video.save().then(result => {
        res.send({ result })
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;