import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './style.css';
import shortid from 'shortid';
// import { compileFunction } from 'vm';

class App extends Component {
    constructor() {
        super();

        const prevTodoList = JSON.parse(localStorage.getItem("todoList"));
        // const remainingNum = prevTodoList.length;
        // let remaining = function() {
        //     if (remainingNum === 1) return 1 + ' Task Left'
        //     else return remainingNum + ' Tasks Left'
        // }

        this.removeTaskHandler = this.removeTaskHandler.bind(this);
        this.checkClickHandler = this.checkClickHandler.bind(this);
        this.state = {
            placeholder: "Add Task…_〆(°▽°*)",
            todoList: prevTodoList || [],
            // remaining: remaining() || 0 + ' Tasks Left'
        }
    }

    blur() { this.setState({ placeholder: "Add Task…_〆(°▽°*)" }) }
    focus() { this.setState({ placeholder: "" }) }
    
    toggleNav(e) { 
        let nav = e.currentTarget.childNodes[0];
        while(nav) {
            if(nav.tagName === 'A') { nav.classList.remove('navActive') }
            nav = nav.nextSibling;
        }
        e.target.classList.add('navActive');
    }

    removeTaskHandler(e) {
        this.setState({ 
            todoList: this.state.todoList.filter((task) => {
                return task.id !== e.target.parentNode.id;
            })
        }, () => { localStorage.setItem("todoList", JSON.stringify(this.state.todoList)) });
    }

    checkClickHandler(e) {
        let nameChecked = e.target.name;
        this.setState((prevState) => ({
            todoList: prevState.todoList.map( task => {
                if (task.id === nameChecked) {
                    return Object.assign(task, { checked: !task.checked })
                } else { return task }
            })
        }), () => { localStorage.setItem("todoList", JSON.stringify(this.state.todoList)) })
    }

    addTaskHandler(e) {
        e.preventDefault();
        const taskElement = e.target.elements["task"];
        if (taskElement.value === "") {
            return
        } else {
            this.setState({
                todoList: this.state.todoList.concat({
                    id: shortid.generate(),
                    description: taskElement.value,
                    checked: false
                })
            }, () => {
                localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
                taskElement.value = "";
            });
        }
    }

    allDoneHandler() {
        this.setState((prevState) => ({
            todoList: prevState.todoList.map( task => {
                return Object.assign(task, { checked: true })
            })
        }), () => { localStorage.setItem("todoList", JSON.stringify(this.state.todoList)) })
    }

    clearCompletedHandler() {
        this.setState({ 
            todoList: this.state.todoList.filter((task) => {
                return task.checked !== true;
            })
        }, () => { localStorage.setItem("todoList", JSON.stringify(this.state.todoList)) });
    }

    render() {
        let activeTask = this.state.todoList.filter((todo) => { return todo.checked === false });
        let completedTask = this.state.todoList.filter((todo) => { return todo.checked === true });
        let everyChecked = this.state.todoList.map((task) => { return task.checked });

        return (
            <div id="toDoContainer">
                <h3>To Do List</h3>
                <form onSubmit={(e) => this.addTaskHandler(e) } id="typeArea">
                    <input id="task" type="text" placeholder={this.state.placeholder}
                        onBlur={() => this.blur()} onFocus={() => this.focus()}/>
                    <button type="submit" id="addNoteBtn">Add</button>
                </form>
                <BrowserRouter basename={'/todolist'}> {/* basename={'/todolist'} */}
                    <nav>
                        <div className="guide">
                            <p id="remaining"></p>
                        </div>
                        <div className="guide" onClick={(e)=>this.toggleNav(e)}>
                            <Link className="nav navActive" to="/">All</Link>
                            <Link className="nav" to="/active">Active</Link>
                            <Link className="nav" to="/completed">Completed</Link>
                        </div>
                        <div className="guide">
                            <button onClick={(e)=>this.allDoneHandler(e)} id="allDone"></button>
                            <button onClick={(e)=>this.clearCompletedHandler(e)} id="clearCompleted"></button>
                        </div>
                    </nav>
                    <Route exact path="/" render={()=><All todoList={this.state.todoList} checked={everyChecked} checkClickHandler={this.checkClickHandler} removeTaskHandler={this.removeTaskHandler}/>}/>
                    <Route exact path="/active" render={()=><All todoList={activeTask} checked={everyChecked} checkClickHandler={this.checkClickHandler} removeTaskHandler={this.removeTaskHandler} />}/>
                    <Route exact path="/completed" render={()=><All todoList={completedTask} checked={everyChecked} checkClickHandler={this.checkClickHandler} removeTaskHandler={this.removeTaskHandler}/>}/>
                </BrowserRouter>
            </div>
        );
    }
}

class All extends Component {
    render() {
        return(
            <div className="fusen">
                <ul>
                    {this.props.todoList.map((todo,index) => (
                        <PostItNote
                            key={index}
                            id={todo.id}
                            description={todo.description}
                            checked={todo.checked}
                            checkClickHandler={this.props.checkClickHandler}
                            removeTaskHandler={this.props.removeTaskHandler}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

class PostItNote extends Component {
    render() {
        const {
            id,
            description,
            checked
        } = this.props;
  
        return (
        <li id={id}>
            <label>
                <input name={id} type="checkbox" checked={checked} onChange={this.props.checkClickHandler}/>
                <span className="checkmark"></span>
                <span className="text">{description}</span>
            </label>
            <button onClick={this.props.removeTaskHandler}>×</button>
        </li>
        );
    }
}

function ToDoContainer() {
    return (
        <App />
    );
}

ReactDOM.render(<ToDoContainer />, document.querySelector('#root'));