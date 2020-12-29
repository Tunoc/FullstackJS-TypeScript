import { Friends } from './dbConnectors';

// resolver map
export const resolvers = {
    Query: {
        //https://www.graphql-tools.com/docs/generate-schema/
        getOneFriend: (root, { id }) => {
            return Friends.findById(id);
        },
    },
    Mutation: {
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                language: input.language,
                age: input.age,
                email: input.email,
                contacts: input.contacts
            });

            newFriend.id = newFriend._id;

            return new Promise((resolve, object) => {
                newFriend.save((err) => {
                    if (err) reject(err)
                    else resolve(newFriend)
                })
            })
        },
        updateFriend: (root, { input }) => {
            return (
                Friends.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, friend) => {
                    if (err) reject(err)
                    else resolve(friend)
                })
            )
        },
        deleteFriend: (root, { id }) => {
            return (
                Friends.remove({ _id: id }, (err) => {
                    if (err) reject(err)
                    else resolve('Successfully deleted friend')
                })
            )
        }
    },
};
