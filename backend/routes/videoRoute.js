const express = require("express");
const router = express.Router();
// const Video = require('../models/videomodel')
import Video from '../models/videomodel'
import { isAuth } from "../utils"


router.get("/",async(req,res) =>{
    const videos = await Video.find({})
    res.send(videos)
})

router.get("/:id",async(req,res)=>{
    try{
        const video = await Video.findById(req.params.id)
        res.send(video)
    } catch(e){
        res.status(404).send({error:"video not found"})
    }
})


router.post("/",isAuth, (req, res) => {
    const { title, body, url } = req.body;
    console.log(req.body)
    if (!title || !body || !url) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    console.log(req.user);
    const video = new Video({
        title,
        body,
        url,
        postedBy: req.user
    })
    video.save().then(data => {
        res.send({ data })
    }).catch(err => {
        res.status(500).send({error:'video not stored'})
        console.log(err);
    })
})

router.put("/:id",isAuth,async(req,res)=>{
    const videoId = req.params.id;
    const video = await Video.findOne({_id:videoId});
    if(video){
        video.title = req.body.title
        video.body = req.body.body
        video.url = req.body.url

        const updatedVideo = await video.save()
        if(updatedVideo){
            return res.status(200).send({msg:'video has been updated'})

        }
    }
    return res.status(500).send({error:'video update failed'})
})

router.delete("/:id",isAuth,async(req,res) =>{
    const delvid = await Video.findById(req.params.id)
    if(delvid){
        await delvid.remove()
        res.send({msg:'video deleted'})
    } else{
        res.send('error in deletion')
    }
})

export default router