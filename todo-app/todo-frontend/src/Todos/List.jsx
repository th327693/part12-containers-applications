import React, { Fragment } from 'react'
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }
  if(!todos ) {
    return (
      <div>
        empty
      </div>
    )
  }
  return (
    <>
      {todos.map(todo => {
        const doneInfo = (
          <>
            <span>This todo is done</span>
            <span>
              <button onClick={onClickDelete(todo)}> Delete </button>
            </span>
          </>
        )

        const notDoneInfo = (
          <>
            <span>
              This todo is not done
            </span>
            <span>
              <button onClick={onClickDelete(todo)}> Delete </button>
              <button onClick={onClickComplete(todo)}> Set as done </button>
            </span>
          </>
        )
        return {
          id : todo.id,
          component : (
          <Fragment key={todo.id}>
            <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
            <span>
              <Fragment key={todo.id}>
              {todo.text} 
              </Fragment>
            </span>
            <Fragment key={todo.id}>
              {todo.done ? doneInfo : notDoneInfo}
            </Fragment>
            </div>
          </Fragment>
          
        )}
      }).reduce((acc, cur) => [...acc, <hr key={generateUUID()} />, cur.component], [])}
    </>
  )
}

export default TodoList
