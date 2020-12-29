import "../Friend.css"
import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

const ADD_FRIEND = gql`
  mutation createFriend($firstName: String $lastName: String $gender: Gender $email: String $age: Int){
    createFriend(input: {firstName: $firstName, lastName: $lastName, gender: $gender, email: $email, age: $age}){ 
      id
      firstName
      lastName
      gender
      age
      email
  }
}
`

const AddFriend = ({ initialFriend, allowEdit }) => {
  const EMPTY_FRIEND = { firstName: "", lastName: "", gender: "OTHER", email: "", age: "" };
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND };
  const [friendToADD, { data }] = useMutation(ADD_FRIEND);

  const [friend, setFriend] = useState({ ...newFriend })
  const [readOnly, setReadOnly] = useState(!allowEdit)

  const handleChange = (event) => {
    const id = event.target.id;
    friend[id] = event.target.value;
    setFriend({ ...friend })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(JSON.stringify({ variables: friend }))
    if (friend.firstName.length !== 0 || friend.lastName.length !== 0) {
      friendToADD({ variables: { firstName: friend.firstName, lastName: friend.lastName, gender: friend.gender, age: parseInt(friend.age), email: friend.email } })
    } else {
      alert("Please input a firstname, lastname and a gender")
    }
    setFriend({ ...EMPTY_FRIEND })
  }

  return (
    <div>
      <div className="blocks">
        <form onSubmit={handleSubmit}>
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
            </select>
          </label>
          <br />
          <label>
            Email <br />
            <input readOnly={readOnly} type="text" id="email" value={friend.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Age <br />
            <input readOnly={readOnly} type="number" id="age" value={friend.age} onChange={handleChange} />
          </label>
          <br /><br />
          {!readOnly && <input type="submit" value="Submit" />}
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
                  <td>{data.createFriend.id}</td>
                  <td>{data.createFriend.firstName}</td>
                  <td>{data.createFriend.lastName}</td>
                  <td>{data.createFriend.gender}</td>
                  <td>{data.createFriend.email}</td>
                  <td>{data.createFriend.age}</td>
                </tr>
              </tbody>
            </table>
            :
            <p>Fill out the form to create a friend.</p>
        }
      </div>
    </div>
  );
}

export default AddFriend;
