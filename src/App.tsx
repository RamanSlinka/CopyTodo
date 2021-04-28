import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';


export type FilerValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilerValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj});

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasksObj});

    }


    function changeFilter(value: FilerValuesType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todoList = todolists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodolists([...todolists])
        }
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true}

        ]
    });


    function addTodoList(title: string) {
        let todoList: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTodolists([todoList, ...todolists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button  color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodoList = tasksObj[tl.id];

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        id={tl.id}
                                        key={tl.id}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;


