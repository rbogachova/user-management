import React, {useState} from 'react';

function GridCell(props) {
    const [text, setText] = useState(props.text);

    return (
        <td>
            {
                (props.editModeEnabled)
                    ?
                    <input type="text"
                           value={text}
                           onChange={e => setText(e.target.value)}/>
                    :
                    <>
                        {props.text}
                    </>
            }
        </td>
    );
}

export default GridCell;