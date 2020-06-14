import React, {useState} from 'react';

function GridRow(props) {
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [savedUser, setSavedUser] = useState(props.user);
    const [editingUser, setEditingUser] = useState(props.user);

    const onEditButtonClick = () => {
        setEditingUser(savedUser);
        setEditModeEnabled(true);
    };

    const onCancelButtonClick = () => {
        setEditModeEnabled(false);
    };

    const onSaveButtonClick = () => {
        setSavedUser(editingUser);
        setEditModeEnabled(false);
    };

    const renderEditModeCells = () =>
        <>
            <td>{savedUser.id}</td>
            <td>
                <input type="text"
                       value={editingUser.name}
                       onChange={e => setEditingUser({...editingUser, name: e.target.value})}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.email}
                       onChange={e => setEditingUser({...editingUser, email: e.target.value})}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.address.street}
                       onChange={e => setEditingUser({
                           ...editingUser,
                           address: {...editingUser.address, street: e.target.value}
                       })}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.address.suite}
                       onChange={e => setEditingUser({
                           ...editingUser,
                           address: {...editingUser.address, suite: e.target.value}
                       })}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.address.city}
                       onChange={e => setEditingUser({
                           ...editingUser,
                           address: {...editingUser.address, city: e.target.value}
                       })}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.address.zipcode}
                       onChange={e => setEditingUser({
                           ...editingUser,
                           address: {...editingUser.address, zipcode: e.target.value}
                       })}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.website}
                       onChange={e => setEditingUser({...editingUser, website: e.target.value})}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.company.name}
                       onChange={e => setEditingUser({
                           ...editingUser,
                           company: {...editingUser.company, name: e.target.value}
                       })}/>
            </td>

            <td>
                <button className="btn btn-sm btn-light float-right fa fa-times"
                        onClick={onCancelButtonClick}/>

                <button className="btn btn-sm btn-light float-right fa fa-check"
                        onClick={onSaveButtonClick}/>
            </td>
        </>;

    const renderReadOnlyModeCells = () =>
        <>
            <td>{savedUser.id}</td>
            <td>{savedUser.name}</td>
            <td>{savedUser.email}</td>
            <td>{savedUser.address.street}</td>
            <td>{savedUser.address.suite}</td>
            <td>{savedUser.address.city}</td>
            <td>{savedUser.address.zipcode}</td>
            <td>{savedUser.website}</td>
            <td>{savedUser.company.name}</td>
            <td>
                <button className="btn btn-sm float-right fa fa-pencil"
                        onClick={onEditButtonClick}/>
            </td>
        </>;

    return (
        <tr>
            {editModeEnabled ? renderEditModeCells() : renderReadOnlyModeCells()}
        </tr>
    );
}

export default GridRow;