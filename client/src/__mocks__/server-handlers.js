import {rest} from 'msw' 

const todoArray = [
  {todoid: 50, title: "Test this code", iscomplete: false}, 
  {todoid: 51, title: "Also test this", iscomplete: false}, 
  {todoid: 52, title: "Don't test this one", iscomplete: false},
  {todoid: 53, title: "Do something", iscomplete: true}
];

const handlers = [
  rest.get("http://localhost:8080/todos", async (req, res, ctx) => {
    return res(ctx.json(todoArray));
  })
  // ,
  // rest.post('http://localhost:8080/todos', (req, res, ctx) => {
  //   const id = todoArray[todoArray.length - 1]?.id + 1 || 1;
  //   todoArray.push({todoid: id, title: req.body, iscomplete: false });
  //   return res(ctx.json({success: true}))
  // }),
  // rest.delete('http://localhost:8080/todos/:id', (req, res, ctx) => {
  //   const { id } = req.params;
  //   todoArray = todoArray.filter(todo => todo.todoid !== id);
  //   return res(ctx.json({success: true}))
  // }), 
  // rest.put('http://localhost:8080/todos/:id', (req, res, ctx) => {
  //   const { id } = req.params;
  //   let todo = todoArray.filter(todo => todo.todoid === id);
  //   todo.iscomplete = true;
  //   return res(ctx.json({success: true}))
  // })
];

export {handlers};