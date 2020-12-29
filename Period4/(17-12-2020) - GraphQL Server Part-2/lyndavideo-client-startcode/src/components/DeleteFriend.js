import "../Friend.css"
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const DELETE_FRIEND = gql`
  mutation deleteFriend($id:ID!){
    deleteFriend(id:$id){
    firstName
    lastName
  }
}
`

export default function DeleteFriend() {
    const [id, setId] = useState("")
    const [deleteFriend, { loading, error, data }] = useMutation(DELETE_FRIEND);

    const friendRemove = () => {
        if (id === "" || id.length !== 24) {
            alert("Please use a valid ID on 24 characters")
        } else {
            deleteFriend({ variables: { id: id } })

        }
    }

    if (loading) return (<h3>Loading...</h3>)
    if (error) return <p> {JSON.stringify(error)}</p>

    return (
        <div>
            <div className="blocks">
                ID:<input type="txt" value={id} onChange={e => { setId(e.target.value) }} />
                &nbsp; <button onClick={friendRemove}>Delete Friend</button>
                <br />
            </div>
            <div className="blocks">
                {
                    data ?
                        <table id="Deleted_friend" border='10' bordercolor='#4caf50'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.deleteFriend.firstName}</td>
                                    <td>{data.deleteFriend.lastName}</td>
                                    <td>Deleted</td>
                                </tr>
                            </tbody>
                        </table>
                        :
                        <p>Type an ID of a friend you want to delete.</p>
                }
            </div>
        </div>
    );
}