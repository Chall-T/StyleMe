import { prisma } from "../database"
import { Session } from "./sessions"

export interface Profile {
    id?: string
    userId: string
    name: string
    gender: number
    silhouette: number
    accessories?: boolean
    budget?: number
    season?: number
    styles: Array<number>
}
export interface ProfileUpdate {
    name?: string
    gender?: number
    silhouette?: number
    accessories?: boolean
    budget?: number
    season?: number
    styles?: Array<number>
}

export const createProfile = async(profileData: Profile) => {
    try{
        const user = await prisma.profile.create({
            data: profileData,
        })
        return user
    }catch(error){
        return error
    }
}
export const getProfileByUserId = (userId: string) => prisma.profile.findUnique({where: {userId}})
export const getProfileById = (id: string) => prisma.profile.findUnique({where: {id}})

export const updateProfileById = (id: string, profile: ProfileUpdate) => prisma.profile.update({where:{id}, data: profile})

export const updateProfileByUserId = (id: string, profile: ProfileUpdate) => prisma.profile.update({where:{userId: id}, data: profile})