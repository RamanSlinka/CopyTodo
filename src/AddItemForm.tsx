import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo(function (props: addItemFormPropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      error &&  setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle(' ');
        } else {
            setError('Title is requared')
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                label={'Title'}
                helperText={error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                // className={error ? 'error' : ''}
            />
            <IconButton

                color='primary'
                onClick={addTask}>
            <AddBox />
            </IconButton>
            {/*  {error && <div className=' error-message'>{error}</div>}*/}
        </div>
    )
})