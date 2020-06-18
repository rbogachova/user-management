import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GridRow from "./GridRow";
import AddUserModal from "./AddUserModal";
import {v4 as uuidv4} from 'uuid';

function App() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddUserModalActive, setIsAddUserModalActive] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const innerHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const offsetHeight = document.documentElement.offsetHeight;

        if ((innerHeight + scrollTop) !== offsetHeight) return;
        setIsLoading(true);
    };

    useEffect(() => {
        if (!isLoading) return;
        loadUsers();
    }, [isLoading]);

    const loadUsers = () => {
        setIsLoading(true);
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
        })
            .then((response) => {
                setUsers([...users, ...response.data]);
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
            <AddUserModal addUser={addUser}
                          isAddUserModalActive={isAddUserModalActive}
                          handleCloseModal={handleCloseModal}/>
        </>;

    const handleShowModal = () => {
        setIsAddUserModalActive(true);
    };

    const addUser = (name, email, company) => {
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

    const handleCloseModal = () => {
        setIsAddUserModalActive(false);
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