import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {

    const {
        value,
        onChange,
        disabled = false
    } = props;

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(value);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        onChange(value);
    },[onChange, value])

    const activateViewMode = useCallback(() => {
        setEditMode(false);
        onChange(title);
    },[onChange, title])

    const onPressEnterOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return editMode
        ?    <TextField value={title}
                        onKeyPress={onPressEnterOffEditMode}
                        disabled={disabled}
                        onChange={onChangeTitle}
                        autoFocus
                        onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{value}</span>
});
