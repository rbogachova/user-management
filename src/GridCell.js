import React, {useState} from 'react';

function GridCell(props) {
    const [editableText, setEditableText] = useState();
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    const onEditButtonClick = () => {
        setEditableText(props.text);
        setEditModeEnabled(true);
    };

    const onSaveButtonClick = () => {
        setEditModeEnabled(false);
    };

    const onCancelButtonClick = () => {
        setEditModeEnabled(false);
    };

    return (
        <td>
            <div style={{display: "flex"}}>
                {
                    (!editModeEnabled)
                        ?
                        <>
                            {props.text}

                            {!props.readOnly &&
                            <button className="btn btn-sm float-right fa fa-pencil"
                                    style={{marginLeft: "auto"}}
                                    onClick={onEditButtonClick}/>}
                        </>
                        :
                        <>
                            <input type="text"
                                   value={editableText}
                                   onChange={e => setEditableText(e.target.value)}/>

                            <button className="btn btn-sm float-right fa fa-check"
                                    onClick={onSaveButtonClick}/>

                            <button className="btn btn-sm float-right fa fa-times"
                                    onClick={onCancelButtonClick}/>
                        </>
                }
            </div>
        </td>
    );
}

export default GridCell;