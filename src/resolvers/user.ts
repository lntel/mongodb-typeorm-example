import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/user";

import { hashSync } from 'bcrypt'
import { Length } from "class-validator";
import { UserResponse } from "../graphql-types/UserResponse";

@InputType()
class UserRegisterInput {

    @Field()
    username: string;

    @Field()
    @Length(6, 100)
    password: string;

    @Field()
    emailAddress: string;

}

@Resolver()
export class UserResolver {

    @Query(() => [User])
    user() {
        return User.find();
    }

    @Query(() => User)
    async userById(
        @Arg('id') id: string
    ) {

        console.log(id)

        return await User.findOne({
            _id: id
        });
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UserRegisterInput
    ) {

        const emailAddress = options.emailAddress.toLowerCase();

        const emailExists = await User.findOne({ emailAddress: emailAddress });

        if(emailExists) {
            return {
                errors: [
                    {
                        path: "email",
                        message: "already exists"
                    }
                ]
            }
        }

        const user = await User.create({
            username: options.username.toLowerCase(),
            password: hashSync(options.password, 10),
            emailAddress: options.emailAddress.toLowerCase()
        }).save();

        return user;
    }

    @Mutation(() => Boolean)
    async delete(
        @Arg('_id') _id: string
    ) {
        
        const result = await User.delete({
            _id: _id
        })

        console.log(result)

        return true;
    }

}