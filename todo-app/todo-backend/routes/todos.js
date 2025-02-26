const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  req.todo = await Todo.findById(id)
  if(!req.todo)
    res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  return res.status(200).json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const ret = await Todo.findByIdAndUpdate(req.todo.id,{
    text : req.body.newtext ? req.body.newtext : req.todo.text,
    done : req.body.newdone ? req.body.newdone : req.todo.done
  },{new: true })
  res.status(200).json(ret); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
