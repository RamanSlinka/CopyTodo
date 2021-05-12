import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan clicked')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onEnter = (e: any) => {
        if (e.key === 'Enter') {
            setEditMode(!editMode)
            props.changeTitle(title)
        }
    }


    return (
        editMode ? <TextField
                variant={'standard'}
                color={'primary'}
                size={'small'}
                value={title}
                autoFocus={true}
                onChange={changeTitle}
                onBlur={offEditMode}
                onKeyPress={onEnter}
            />
            /*<input
                value={title}
                autoFocus={true}
                onChange={changeTitle}
                onBlur={offEditMode}
                onKeyPress={onEnter}
            />*/
            : <span onDoubleClick={onEditMode}>{props.title} </span>
    )
})
export default EditableSpan