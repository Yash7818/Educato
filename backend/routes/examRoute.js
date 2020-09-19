const express = require("express");
const router = express.Router();

import Exam from "../models/exammodel"
import { isAuth } from "../utils"

router.post('/examques', isAuth, (req, res) => {
    const { question, option1, option2, option3, option4, correct } = req.body;
    if (!question || !option1 || !option2 || !option3 || !option4 || !correct) {
        return res.status(422).json({ error: "Please enter all details" });
    }
    console.log(req.user);
    const exam = new Exam({
        question,
        option1,
        option2,
        option3,
        option4,
        correct,
        postedBy: req.user
    })

    exam.save().then(data => {
        res.send({ data });
    }).catch(err => {
        res.status(500).send({ err })
        console.log(err);
    })
})

router.patch("/examques/:id", isAuth, (req, res) => {
    Exam.findByIdAndUpdate(req.params.id)
        .then(result => {
            console.log(result);
            result.question = req.body.question
            result.option1 = req.body.option1
            result.option2 = req.body.option2
            result.option3 = req.body.option3
            result.option4 = req.body.option4
            result.correct = req.body.correct
            result.save().then(ans => {
                res.send({ ans })
            }).catch(err => {
                res.status(500).send({ error: "Updation of ques failed" })
                console.log(err);
            })

        })

})

router.get("/allExamQuestion", isAuth, async (req, res) => {
    const questions = await Exam.find({});
    res.send(questions)
})

router.get("/examques/:postedBy", isAuth, (req, res) => {
    const postedId = req.params.postedBy;
    console.log(postedId);
    Exam.find({ postedBy: postedId })
        .populate("postedBy", "_id")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            }
            res.send({ result })
        })

})

router.delete('/examopt/:id', isAuth, async (req, res) => {
    const examOpt = await Exam.findById(req.params._id);
    if (examOpt) {
        await examOpt.remove();
        res.send({ msg: "Question deleted" });
    }
    else {
        res.send({ error: "Error while question deletion" })
    }
})

export default router;