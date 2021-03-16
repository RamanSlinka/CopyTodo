import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [ editMode, setEdiMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEdiMode(true)
        setTitle(props.title)
    }

    const activateVieMode = () => {
                setEdiMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input value={title}
                 onChange={onChangeTitleHandler}
                 onBlur={activateVieMode} autoFocus

        />
        :  <span onDoubleClick={activateEditMode}>{props.title}</span>
}