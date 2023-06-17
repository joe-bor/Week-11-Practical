const React = require('react')

function Edit (props) {
    const { title, description, _id } = props.todo
    return (
        <div>
            <h1>Edit: "{title}"</h1>
            <a href='/todos'>See To Do List</a>
            <form action={`/todos/${_id}?_method=PUT`} method='POST'>
                <label htmlFor='title' >Title:</label> <input type="text" name='title' defaultValue={title} id='title' required/> <br />
                <label htmlFor='description'>Description:</label> <input type="text" name='description' id='description' defaultValue={description? description : ''}/> <br />
                <label htmlFor="when" >When:</label> 
                <select name="when" id="when">
                    <option value="Today" key='today'>Today</option>
                    <option value="This Week" key='thisWeek'>This Week</option>
                    <option value="This Month" key='thisMonth'>This Month</option>
                </select> <br />
                <label htmlFor="completed">Completed:</label> <input type="checkbox" name="completed" id="completed" /> <br />
                <input type="submit" value="Edit To Do" />
            </form>
        </div>
    )
}

module.exports = Edit