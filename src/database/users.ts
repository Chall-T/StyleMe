import { prisma } from "../database"
import { Prisma } from '@prisma/client';

const selectWithNoPassword = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    verified: true,
    createdAt: true,
    updatedAt: true
}
export const createUser = async(userData: Prisma.UserCreateInput) => {
    try{
        const user = await prisma.user.create({
            data: userData,
        })
        return user
    }catch(error){
        return error
    }
}
export const getUserByEmail = (email: string) => prisma.user.findUnique({where: {email}})
export const getUserById = (id: string) => prisma.user.findUnique({where: {id}})

export const getUserByEmailNoPassword = (email: string) => prisma.user.findUnique({where: {email}, select: selectWithNoPassword})
export const getUserByIdNoPassword = (id: string) => prisma.user.findUnique({where: {id}, select: selectWithNoPassword})