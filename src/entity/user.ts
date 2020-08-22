import { IsEmail, IsString } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @ObjectIdColumn()
    _id: string;

    @Field()
    @Column()
    username: string;

    @Column()
    @IsString()
    password: string;

    @Field()
    @Column()
    @IsEmail()
    emailAddress: string;

}