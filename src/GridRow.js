import React, {useState} from 'react';
import GridCell from "./GridCell";

function GridRow(props) {
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    const onEditButtonClick = () => {
        setEditModeEnabled(true);
    };

    const onCancelButtonClick = () => {
        setEditModeEnabled(false);
    };

    return (
        <tr>
            <GridCell readOnly={true}
                      text={props.user.id}/>
            <GridCell readOnly={false}
                      text={props.user.name}
                      editModeEnabled={editModeEnabled}/>
            <GridCell readOnly={false}
                      text={props.user.email}
                      editModeEnabled={editModeEnabled}/>
            <GridCell readOnly={false}
                      text={props.user.address.street}
                      editModeEnabled={editModeEnabled}/>
            <GridCell readOnly={false}
                      text={props.user.address.suite}
                      editModeEnabled={editModeEnabled}/>
            <GridCell readOnly={false}
                      text={props.user.address.city}
                      editModeEnabled={editModeEnabled}/>
            <GridCell readOnly={false}
                      text={props.user.address.zipcode}
                      editModeEnabled={editModeEnabled}/>
            <GridCell readOnly={false}
                      text={props.user.website}
                      editModeEnabled={editModeEnabled}/>
            <GridCell readOnly={false}
                      text={props.user.company.name}
                      editModeEnabled={editModeEnabled}/>
            <td>
                {editModeEnabled
                    ?
                    <div>
                        <button className="btn btn-sm btn-light float-right fa fa-times"
                                onClick={onCancelButtonClick}/>

                        <button className="btn btn-sm btn-light float-right fa fa-check"
                            /*onClick={onSaveButtonClick}*//>
                    </div>
                    :
                    <button className="btn btn-sm float-right fa fa-pencil"
                            onClick={onEditButtonClick}/>
                }
            </td>
        </tr>
    );
}

export default GridRow;