import {User}  from "../models/User.model.js";// Importing the user model using ES6

export const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await User.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
};
