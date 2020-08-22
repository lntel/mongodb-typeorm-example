import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/user";

import { hashSync } from 'bcrypt'
import { Length } from "class-validator";

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

    @Mutation(() => User)
    async register(
        @Arg('options') options: UserRegisterInput
    ) {

        const emailExists = await User.findOne({ emailAddress: options.emailAddress.toLowerCase() })

        const user = await User.create({
            username: options.username.toLowerCase(),
            password: hashSync(options.password, 10),
            emailAddress: options.emailAddress.toLowerCase()
        }).save();

        return user;
    }

    @Mutation(() => Boolean)
    async delete(
        @Arg('_id') _id: String
    ) {
        

        return true;
    }

}