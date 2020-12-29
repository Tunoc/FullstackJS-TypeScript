import "../Friend.css"
import React from "react";
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const ALL_FRIENDS = gql`
{
  allFriends{
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

export default function All() {
  // For at gøre det hele userfriendly. Er der skrevet loading, mens den fetcher data. Der kommer til at stå error, 
  // hvis noget gik galt, og dataen, når den er fundet eller ej.
  const { loading, error, data, networkStatus } = useQuery(ALL_FRIENDS, { pollInterval: 60000 });
  // PollIntervallet fetcher data en gang i minuttet, fra vores NoSQL db.

  if (loading) return (<h3>Loading...</h3>)
  if (error) return <p> {JSON.stringify(error)}</p>
  if (!data) return <p>No Data</p>

  return (
    <div className="blocks">
      <table id="AllFriends" border='10' bordercolor='#4caf50'>
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
          {data.allFriends.map(f => {
            return (<tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.firstName}</td>
              <td>{f.lastName}</td>
              <td>{f.gender}</td>
              <td>{f.email}</td>
              <td>{f.age}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}