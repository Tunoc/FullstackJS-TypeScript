import "../Friend.css"
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const GET_FRIEND = gql`
  query getOneFriend($id:ID!){
  getOneFriend(id:$id){
    id
    firstName
    lastName
    language
    gender
    age
    email
  }
}
`

export default function FindFriend() {
  const [id, setId] = useState("")
  const [getFriend, { loading, error, data }] = useLazyQuery(GET_FRIEND);

  const fetchFriend = async () => {
    if (id === "" || id.length !== 24) {
      alert("Please use a valid ID on 24 characters")
    } else {
      getFriend({ variables: { id: id } })
    }
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return <p> {JSON.stringify(error)}</p>

  return (
    <div>
      <div className="blocks">
        ID:<input type="txt" value={id} onChange={e => { setId(e.target.value) }} />
        &nbsp; <button onClick={fetchFriend}>Find Friend</button>
        <br />
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
                  <td>{data.getOneFriend.id}</td>
                  <td>{data.getOneFriend.firstName}</td>
                  <td>{data.getOneFriend.lastName}</td>
                  <td>{data.getOneFriend.gender}</td>
                  <td>{data.getOneFriend.email}</td>
                  <td>{data.getOneFriend.age}</td>
                </tr>
              </tbody>
            </table>
            :
            <p>Type an ID of a friend you want to find.</p>
        }
      </div>
    </div >)
}
