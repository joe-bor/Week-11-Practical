const React = require('react')

function Show (props) {
    const { title, description, _id, completed } = props.todo
    return (
        <div>
            <a href="/todos">Go Back to Index Page</a>
            <h1>To Do </h1>
            <h3>Title: { title } </h3>
            <h4>Description: { description? description : 'No Description Provided' } </h4>
            <h4>Completed: { completed? 'True' : 'False' } </h4>
            <div>
                <a href={`/todos/${ _id }/edit`}> <button>Edit this to do</button> </a>
            </div>
            <form action={`/todos/${ _id }?_method=DELETE`} method='POST'>
                <input type="submit" value="DELETE To Do" />
            </form>
        </div>
    )
}

module.exports = Show