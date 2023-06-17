const React = require('react')

function New (props) {
    return (
        <div>
            <h1>New Todo Page</h1>
            <a href="/todos">See To Do List</a>
            <form action="/todos" method='POST'>
                <label htmlFor='title' >Title:</label> <input type="text" name='title' placeholder='Required' id='title' required/> <br />
                <label htmlFor='description'>Description:</label> <input type="text" name='description' id='description' placeholder='Not Required'/> <br />
                <label htmlFor="when" >When:</label> 
                <select name="when" id="when">
                    <option value="Today" key='today'>Today</option>
                    <option value="This Week" key='thisWeek'>This Week</option>
                    <option value="This Month" key='thisMonth'>This Month</option>
                </select> <br />
                <input type="submit" value="Create To Do" />
            </form>
        </div>
    )
}

module.exports = New