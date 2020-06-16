import React, {useState} from 'react';
import axios from 'axios';
import GridRow from "./GridRow";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function App() {
    const [users, setUsers] = useState([]);
    const [addUserModalActive, setAddUserModalActive] = useState(false);

    const loadUsers = () => {
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
        })
            .then((response) => {
                setUsers(response.data);
            });
    };

    const renderLoadUsersButton = () =>
        <button className="btn btn-primary mb-3" onClick={loadUsers}>Load Users</button>;

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
                            <td><strong>Name: </strong></td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td><strong>Email: </strong></td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td><strong>Address: </strong></td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td><strong>Website: </strong></td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td><strong>Company: </strong></td>
                            <td><input type="text"/></td>
                        </tr>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddUserButtonClick}>OK</Button>
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

    const handleAddUserButtonClick = () => {
        setAddUserModalActive(false);
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
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