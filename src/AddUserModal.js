import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddUserModal(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');

    const handleCloseModal = () => {
        props.handleCloseModal();
        setName('');
        setEmail('');
        setCompany('');
    };

    const handleAddUser = () => {
        handleCloseModal();
        props.addUser(name, email, company);
    };

    return (
        <Modal show={props.isAddUserModalActive} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table>
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
                        <td><input type="text" onChange={e => setCompany(e.target.value)}/></td>
                    </tr>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAddUser}
                        disabled={name.trim().length < 3 || email.trim().length < 3 || company.trim().length < 3}>
                    OK
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddUserModal;