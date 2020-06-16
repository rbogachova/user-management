import React, {useState} from 'react';
import axios from 'axios';
import GridRow from "./GridRow";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {v4 as uuidv4} from 'uuid';

function App() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addUserModalActive, setAddUserModalActive] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');

    const loadUsers = () => {
        setIsLoading(true);
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
        })
            .then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            });
    };

    const renderLoadUsersButton = () =>
        <button className="btn btn-primary mb-3" onClick={loadUsers}>
            {isLoading
                ?
                <>
                    <span class="spinner-border spinner-border-sm"/>
                    Loading...
                </>
                : 'Load Users'}
        </button>;

    const renderAddUserButton = () =>
        <>
            <button className="btn btn-primary mr-2 mb-3" onClick={handleShowModal}>Add User</button>
            <Modal show={addUserModalActive} onHide={handleCloseModal}>
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
                    <Button variant="primary" onClick={addUser}
                            disabled={name.trim().length < 3 || email.trim().length < 3 || company.trim().length < 3}>
                        OK
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>;

    const handleShowModal = () => {
        setAddUserModalActive(true);
    };

    const handleCloseModal = () => {
        setAddUserModalActive(false);
    };

    const addUser = () => {
        setAddUserModalActive(false);
        const updatedUsers = [...users];
        updatedUsers.unshift(
            {
                id: uuidv4(),
                name: name,
                email: email,
                address: {
                    street: null,
                    suite: null,
                    city: null,
                    zipcode: null,
                },
                phone: null,
                website: null,
                company: {
                    name: company
                }
            });
        setUsers(updatedUsers);
    };

    const deleteUser = (userId) => {
        const updatedUsers = users.filter(el => el.id !== userId);
        setUsers(updatedUsers);
    };

    return (
        <div className="container-fluid">
            <h2>Users</h2>

            {users.length === 0 ? renderLoadUsersButton() : renderAddUserButton()}

            <table className="table table-bordered">
                {
                    users.length !== 0 &&
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company</th>
                        <th/>
                    </tr>
                    </thead>
                }

                <tbody>
                {
                    users.map(user =>
                        <GridRow key={user.id}
                                 user={user}
                                 deleteUser={deleteUser}/>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default App;