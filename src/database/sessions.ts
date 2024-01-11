import { prisma } from "../database"


export interface Session {
    id: string
    userId: string
    ipAddress: string
    userAgent: string
}

export const createSession = async(sessionData: Session) => {
    try{
        const session = await prisma.session.create({
            data: sessionData,
        })
        return session
    }catch(error){
        return error
    }
}
export const getSessionById = (id: string) => prisma.session.findUnique({where: {id}})

export const getSessionsByUserId = (userId: string) => prisma.session.findMany({where: {userId}})
