import React, {useState} from 'react';
import axios from 'axios';
import GridRow from "./GridRow";
import AddUserModal from "./AddUserModal";
import {v4 as uuidv4} from 'uuid';

function App() {
    const userNamePropertyName = 'name';
    const userEmailPropertyName = 'email';
    const userPhonePropertyName = 'phone';
    const userWebsitePropertyName = 'website';
    const userCompanyPropertyName = 'company';

    const emptyFilters = {
        [userNamePropertyName]: '',
        [userEmailPropertyName]: '',
        [userPhonePropertyName]: '',
        [userWebsitePropertyName]: '',
        [userCompanyPropertyName]: ''
    };

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddUserModalActive, setIsAddUserModalActive] = useState(false);
    const [filters, setFilters] = useState(emptyFilters);
    const [filteredUsers, setFilteredUsers] = useState(users);

    const loadUsers = () => {
        setIsLoading(true);
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
        })
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
                setIsLoading(false);
            });
    };

    const renderLoadUsersButton = () =>
        <button className="btn btn-primary mb-3" onClick={loadUsers}>
            {isLoading
                ?
                <>
                    <span className="spinner-border spinner-border-sm"/>
                    Loading...
                </>
                : 'Load Users'}
        </button>;

    const renderAddUserButton = () =>
        <>
            <button className="btn btn-primary mr-2 mb-3" onClick={handleShowModal}>Add User</button>
            <button className="btn btn-secondary mb-3" onClick={resetFilters}>Reset all filters</button>
            <AddUserModal addUser={addUser}
                          isAddUserModalActive={isAddUserModalActive}
                          handleCloseModal={handleCloseModal}/>
        </>;

    const handleShowModal = () => {
        setIsAddUserModalActive(true);
    };

    const addUser = (name, email, companyName) => {
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
                    name: companyName
                }
            });
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handleCloseModal = () => {
        setIsAddUserModalActive(false);
    };

    const deleteUser = (userId) => {
        const updatedUsers = users.filter(el => el.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const resetFilters = () => {
        setFilters(emptyFilters);
        setFilteredUsers(users);
    };

    const isTextEmpty = (text) =>
        text === null ||
        text === undefined ||
        text.trim() === '';

    const filterMatches = (filterText, value) => {
        if (isTextEmpty(filterText))
            return true;

        if (isTextEmpty(value))
            return false;

        return value.toLowerCase().includes(filterText.trim().toLowerCase());
    };

    const filterUsers = (property, value) => {
        const updatedFilters = {...filters};
        updatedFilters[property] = value;
        setFilters(updatedFilters);

        const filteredUsers = users.filter(user => {
            if (!filterMatches(updatedFilters.name, user.name))
                return false;

            if (!filterMatches(updatedFilters.email, user.email))
                return false;

            if (!filterMatches(updatedFilters.phone, user.phone))
                return false;

            if (!filterMatches(updatedFilters.website, user.website))
                return false;

            if (!filterMatches(updatedFilters.company, user.company.name))
                return false;
            return true;
        });
        setFilteredUsers(filteredUsers);
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
                        <th>
                            Name
                            <div className="text-nowrap">
                                <input type="text"
                                       value={filters.name || ''}
                                       onChange={e => filterUsers(userNamePropertyName, e.target.value)}/>
                                <i className="fa fa-filter ml-2"/>
                            </div>
                        </th>
                        <th>
                            Email
                            <div className="text-nowrap">
                                <input type="text"
                                       value={filters.email || ''}
                                       onChange={e => filterUsers(userEmailPropertyName, e.target.value)}/>
                                <i className="fa fa-filter ml-2"/>
                            </div>
                        </th>
                        <th>
                            Address
                            <div className="text-nowrap">
                                <input type="text"/>
                                <i className="fa fa-filter ml-2"/>
                            </div>
                        </th>
                        <th>
                            Phone
                            <div className="text-nowrap">
                                <input type="text"
                                       value={filters.phone || ''}
                                       onChange={e => filterUsers(userPhonePropertyName, e.target.value)}/>
                                <i className="fa fa-filter ml-2"/>
                            </div>
                        </th>
                        <th>
                            Website
                            <div className="text-nowrap">
                                <input type="text"
                                       value={filters.website || ''}
                                       onChange={e => filterUsers(userWebsitePropertyName, e.target.value)}/>
                                <i className="fa fa-filter ml-2"/>
                            </div>
                        </th>
                        <th>
                            Company
                            <div className="text-nowrap">
                                <input type="text"
                                       value={filters.company || ''}
                                       onChange={e => filterUsers(userCompanyPropertyName, e.target.value)}/>
                                <i className="fa fa-filter ml-2"/>
                            </div>
                        </th>
                        <th>
                        </th>
                    </tr>
                    </thead>
                }
                <tbody>
                {
                    filteredUsers.map(user =>
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