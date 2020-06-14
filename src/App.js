import React, {useState} from 'react';
import axios from 'axios';
import GridCell from "./GridCell";
import GridRow from "./GridRow";

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
                        <th>Email</th>
                        <th>Street</th>
                        <th>Suite</th>
                        <th>City</th>
                        <th>Zip</th>
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
                                 user={user}/>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default App;