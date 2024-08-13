const express = require('express');
const { Post } = require('../models/post');
const { validateId, isValid } = require('../middleware/validateId');
const _ = require("lodash");
const { default: mongoose } = require('mongoose');
const router = express.Router();

// Create Post
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    await post.save();
    return res.send({
        status: 200,
        data: {
            id: post.id,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt
        },
        message: ""
    });

});

// Get All Posts
router.get("/", async (req, res) => {

    const posts = await Post.aggregate([
        {
            $replaceWith: {
                id: "$_id",
                title: "$title",
                description: "$description",
                createdAt: "$createdAt"
            }
        }
    ]);

    const totalItems = await Post.countDocuments();

    res.send({
        status: 200,
        message: "",
        data: {
            totalItems,
            posts,
        }
    });
});


// Get Post By Id
router.get("/:id", validateId, async (req, res) => {

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({
        status: 404,
        message: "There is no such a data with provided id",
        data: {},
        errors: []
    });

    return res.send({
        status: 200,
        message: "",
        data: {
            id: post.id,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt
        },
        errors: []
    })

});

// Update Post
router.put("/:id", validateId, async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
    }, { new: true });
    if (!post) return res.status(404).send({
        status: 404,
        message: "There is no such a data with provided id",
        data: {},
        errors: []
    });

    return res.send({
        status: 200,
        message: "",
        data: {
            id: post.id,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt
        },
        errors: []
    })
});

router.delete("/", async (req, res) => {

    const ids = req.body.postIds;
    const postIds = _.uniq(_.remove(ids, (id) => isValid(id)));

    await Post.deleteMany({ _id: { $in: postIds } });

    res.send({
        status: 200,
        message: "",
        data: {},
        errors: []
    })

});

module.exports = router;