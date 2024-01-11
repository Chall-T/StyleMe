import { prisma } from "../database"
import { Session } from "./sessions"
export interface UserCreate {
    firstName: string
    lastName?: string
    email: string
    verified?: boolean
    password: string
    salt: string
}
export interface User {
    firstName: string
    lastName: string
    email: string
    verified: boolean
    password: string
    salt: string
    sessions: Array<Session>
    createdAt: Date
    updatedAt: Date
}
const selectWithNoPassword = {
    firstName: true,
    lastName: true,
    email: true,
    verified: true,
    createdAt: true,
    updatedAt: true
}

export const createUser = async(userData: UserCreate) => {
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