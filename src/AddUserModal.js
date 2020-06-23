import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddUserModal(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleCloseModal = () => {
        props.handleCloseModal();
        setName('');
        setEmail('');
        setCompanyName('');
    };

    const handleAddUser = () => {
        handleCloseModal();
        props.addUser(name, email, companyName);
    };

    return (
        <Modal show={props.isAddUserModalActive} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table>
                    <tbody>
                    <tr>
                        <td><strong>Name*: </strong></td>
                        <td><input type="text" onChange={e => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><strong>Email*: </strong></td>
                        <td><input type="text" onChange={e => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><strong>Company*: </strong></td>
                        <td><input type="text" onChange={e => setCompanyName(e.target.value)}/></td>
                    </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAddUser}
                        disabled={name.trim().length < 3 || email.trim().length < 3 || companyName.trim().length < 3}>
                    OK
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddUserModal;