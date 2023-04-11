const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {

    const newPost = await Post.create({
      content: req.body.content,
     title: req.body.title,
      user_id: req.session.user_id
    });
    console.log(newPost)

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id',withAuth, async(req, res) => {
  try{
    

    const postData = await Post.destroy({
      where: { 
       id: req.params.id
      }
    })
res.status(200).json(postData)
}catch(err){
res.status(400).json("Bad Request Made :P")
  }
})
module.exports = router;


router.put('/:id',withAuth, async(req,res)=>{
  try {
    const postData = await Post.update({"title": req.body.title, "content":req.body.content},{
      where:{
        id: req.params.id,
        id: req.params.id
      }
    })
    console.log(postData)
    res.status(200).json(postData)
    

  } catch (error) {
    res.status(400).json(error)
  }
})