import React, {useState} from 'react';
import axios from 'axios';
import GridCell from "./GridCell";

function App() {
    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
        })
            .then((response) => {
                setUsers(response.data);
            });
    };

    return (
        <div className="container-fluid">
            <h2>Users</h2>

            <button className="btn btn-primary mb-3"
                    onClick={loadUsers}>
                Load Users
            </button>

            <table className="table table-bordered">
                {
                    users.length !== 0 &&
                    <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Street</th>
                        <th>Suite</th>
                        <th>City</th>
                        <th>Zip</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company</th>
                    </tr>
                    </thead>
                }

                <tbody>
                {
                    users.map(user =>
                        <tr key={user.id}>
                            <GridCell readOnly={true}
                                      text={user.id}/>
                            <GridCell readOnly={false}
                                      text={user.name}/>
                            <GridCell readOnly={false}
                                      text={user.username}/>
                            <GridCell readOnly={false}
                                      text={user.email}/>
                            <GridCell readOnly={false}
                                      text={user.address.street}/>
                            <GridCell readOnly={false}
                                      text={user.address.suite}/>
                            <GridCell readOnly={false}
                                      text={user.address.city}/>
                            <GridCell readOnly={false}
                                      text={user.address.zipcode}/>
                            <GridCell readOnly={false}
                                      text={user.phone}/>
                            <GridCell readOnly={false}
                                      text={user.website}/>
                            <GridCell readOnly={false}
                                      text={user.company.name}/>
                            <button>edit</button>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default App;