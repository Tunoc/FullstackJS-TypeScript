import "../Friend.css"
import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

const UPDATE_FRIEND = gql`
  mutation updateFriend($id: ID, $firstName: String $lastName: String $gender: Gender $age: Int $email: String){
    updateFriend(input: {id: $id, firstName: $firstName, lastName: $lastName, gender: $gender, age: $age, email: $email}){ 
      id
      firstName
      lastName
      gender
      age
      email
  }
}
`

const UpdateFriend = ({ initialFriend, allowEdit }) => {
    const [friendToUpdate, { data }] = useMutation(UPDATE_FRIEND);
    const EMPTY_FRIEND = { id: "", firstName: "", lastName: "", gender: "", email: "", age: "" }
    let editedFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }

    const [friend, setFriend] = useState({ ...editedFriend })
    const [readOnly, setReadOnly] = useState(!allowEdit)

    const handleChange = (event) => {
        const id = event.target.id;
        friend[id] = event.target.value;
        setFriend({ ...friend })
    }
    function clean(obj) {
        for (let propName in obj) {
            if (obj[propName] === "") {
                delete obj[propName];
            }
        }
        if ('age' in obj) {
            obj.age = parseInt(obj.age);
        }
        return obj
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let tmp = clean(friend)
        // alert(JSON.stringify(tmp))
        friendToUpdate({ variables: tmp })
        setFriend({ ...EMPTY_FRIEND })
    }

    return (
        <div>
            <div className="blocks">
                <form onSubmit={handleSubmit}>
                    <label>
                        ID for user to update<br />
                        <input type="text" readOnly={readOnly} id="id" value={friend.id} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        FirstName<br />
                        <input type="text" readOnly={readOnly} id="firstName" value={friend.firstName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        LastName <br />
                        <input readOnly={readOnly} type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Gender &nbsp;
          <select disabled={readOnly} id="gender" value={friend.gender} onChange={handleChange}>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                            <option value="">---SELECT---</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        E-Mail <br />
                        <input readOnly={readOnly} type="text" id="email" value={friend.email} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Age <br />
                        <input readOnly={readOnly} type="number" id="age" value={friend.age} onChange={handleChange} />
                    </label>
                    <br /><br />
                    {!readOnly && <input type="submit" value="Update" />}
                </form>
            </div>
            <div className="blocks">
                {
                    data ?
                        <table id="Friend_found" border='10' bordercolor='#4caf50'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>E-mail</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.updateFriend.id}</td>
                                    <td>{data.updateFriend.firstName}</td>
                                    <td>{data.updateFriend.lastName}</td>
                                    <td>{data.updateFriend.gender}</td>
                                    <td>{data.updateFriend.email}</td>
                                    <td>{data.updateFriend.age}</td>
                                </tr>
                            </tbody>
                        </table>
                        :
                        <p>Fill out the fields to update a friend.</p>
                }
            </div>
        </div>
    );
}

export default UpdateFriend;
