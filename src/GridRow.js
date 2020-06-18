import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GridRow(props) {
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [savedUser, setSavedUser] = useState(props.user);
    const [editingUser, setEditingUser] = useState(props.user);
    const [deleteUserModalActive, setDeleteUserModalActive] = useState(false);

    const onEnterPress = (e) => {
        let code = e.keyCode || e.which;
        if (code === 13)
            onSaveButtonClick();
    };

    const onSaveButtonClick = () => {
        setSavedUser(editingUser);
        setEditModeEnabled(false);
    };

    const onCancelButtonClick = () => {
        setEditModeEnabled(false);
    };

    const onEditButtonClick = () => {
        setEditingUser(savedUser);
        setEditModeEnabled(true);
    };

    const handleShowModal = () => {
        setDeleteUserModalActive(true);
    };

    const handleCloseModal = () => {
        setDeleteUserModalActive(false);
    };

    const handleDeleteButtonClick = () => {
        props.deleteUser(props.user.id);
        setDeleteUserModalActive(false);
    };

    const renderEditModeCells = () =>
        <>
            <td>
                <input type="text"
                       value={editingUser.name}
                       onChange={e => setEditingUser({...editingUser, name: e.target.value})}
                       onKeyPress={onEnterPress}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.email}
                       onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                       onKeyPress={onEnterPress}/>
            </td>
            <td>
                <table>
                    <tr>
                        <td><strong>Street: </strong></td>
                        <td>
                            <input type="text"
                                   value={editingUser.address.street}
                                   onChange={e => setEditingUser({
                                       ...editingUser,
                                       address: {...editingUser.address, street: e.target.value}
                                   })}
                                   onKeyPress={onEnterPress}/>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Suite: </strong></td>
                        <td>
                            <input type="text"
                                   value={editingUser.address.suite}
                                   onChange={e => setEditingUser({
                                       ...editingUser,
                                       address: {...editingUser.address, suite: e.target.value}
                                   })}
                                   onKeyPress={onEnterPress}/>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>City: </strong></td>
                        <td>
                            <input type="text"
                                   value={editingUser.address.city}
                                   onChange={e => setEditingUser({
                                       ...editingUser,
                                       address: {...editingUser.address, city: e.target.value}
                                   })}
                                   onKeyPress={onEnterPress}/>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Zip: </strong></td>
                        <td>
                            <input type="text"
                                   value={editingUser.address.zipcode}
                                   onChange={e => setEditingUser({
                                       ...editingUser,
                                       address: {...editingUser.address, zipcode: e.target.value}
                                   })}
                                   onKeyPress={onEnterPress}/>
                        </td>
                    </tr>
                </table>
            </td>
            <td>
                <input type="text"
                       value={editingUser.phone}
                       onChange={e => setEditingUser({...editingUser, phone: e.target.value})}
                       onKeyPress={onEnterPress}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.website}
                       onChange={e => setEditingUser({...editingUser, website: e.target.value})}
                       onKeyPress={onEnterPress}/>
            </td>
            <td>
                <input type="text"
                       value={editingUser.company.name}
                       onChange={e => setEditingUser({
                           ...editingUser,
                           company: {...editingUser.company, name: e.target.value}
                       })}
                       onKeyPress={onEnterPress}/>
            </td>
            <td>
                <button className="btn btn-sm btn-light fa fa-check mr-2" onClick={onSaveButtonClick}/>
                <button type="button" className="btn btn-sm btn-light fa fa-times" onClick={onCancelButtonClick}/>
            </td>
        </>
    ;

    const renderReadOnlyModeCells = () =>
        <>
            <td>{savedUser.name}</td>
            <td><a href={`mailto:${savedUser.email}`}>{savedUser.email}</a></td>
            <td>
                {savedUser.address.street} {savedUser.address.suite}<br/>
                {savedUser.address.city}, {savedUser.address.zipcode}
            </td>
            <td>{savedUser.phone}</td>
            <td><a href={`http://${savedUser.website}`}>{savedUser.website}</a></td>
            <td>{savedUser.company.name}</td>
            <td>
                <button className="btn btn-sm btn-light fa fa-pencil mr-2" onClick={onEditButtonClick}/>
                <button className="btn btn-sm btn-light fa fa-trash" onClick={handleShowModal}/>
                <Modal show={deleteUserModalActive} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete user?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{props.user.name}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleDeleteButtonClick}>OK</Button>
                        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </td>
        </>;

    return (
        <tr>
            {editModeEnabled ? renderEditModeCells() : renderReadOnlyModeCells()}
        </tr>
    );
}

export default GridRow;