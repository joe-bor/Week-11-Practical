const React = require('react')

function Index (props) {
    const { title, description, _id } = props.todo
    return (
        <div>
            <h1> To Do List </h1>
            <a href="/todos/new">Add a to do</a>
            <ol>
                {
                    props.todo.map( (todo) => {
                        return (
                            <li key={todo._id}><a href={`/todos/${todo._id}`}> { todo.title }</a></li>
                        )
                    })
                }
            </ol>
        </div>
    )
}

module.exports = Index