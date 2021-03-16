import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";


export type FilerValuesType = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string
    title: string
    filter: FilerValuesType
}

type TasksStateType = {
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
    function changeTaskTitle(taskId: string, newTitle:string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasksObj});

    }


    function changeFilter(value: FilerValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(filteredTodolist)
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    function changeTodolistTitle(id: string, newTitle: string) {
      const todoList =  todoLists.find( tl=> tl.id === id )
        if ( todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true}

        ]
    });


    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>

            {
                todoLists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }

                    return <TodoList

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
                })
            }


        </div>
    );
}

export default App;


