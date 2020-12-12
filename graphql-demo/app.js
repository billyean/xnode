const express = require('express');
const app = express();
const {ApolloServer, gql} = require('apollo-server-express');

const users = require('./data').yans;
const cars = require('./data').cars;

const typeDefs = gql`
    type Query {
        users: [User]
        user(id: Int!): User

        cars: [Car]
        car(id: Int!): Car
    }

    type User {
        id: ID!
        name: String!
        cars: [Car]
    }

    type Car {
        id: ID!
        make: String!
        model: String!
        color: String!
        owner: User!
    }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (_, {id}) => users.filter(x => x.id === id)[0],
        cars: () => cars,
        car: (_, {id}) => cars.filter(x => x.id === id)[0]
    },
    Car: {
        owner: parent => users.filter(x => x.id === parent.ownedBy)[0]
    },
    User: {
        cars: parent => cars.filter(x => x.ownedBy === parent.id)
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});
server.applyMiddleware({app});

app.listen(3000, () => console.info('Apollo GraphQLserver is running on port 3000'));