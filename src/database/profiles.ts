import { prisma } from "../database"
import { Session } from "./sessions"
import { Prisma } from '@prisma/client';


export const createProfile = async(profileData: Prisma.ProfileUncheckedCreateInput) => {
    try{
        const user = await prisma.profile.create({
            data: profileData,
        })
        return user
    }catch(error){
        return error
    }
}
const includeAll = {
    silhouette: true,
    gender: true,
    styles: true
}
export const getProfileByUserId = (userId: string) => prisma.profile.findUnique({where: {userId}, include: includeAll})
export const getProfileById = (id: string) => prisma.profile.findUnique({where: {id}})

export const updateProfileById = (id: string, profile: Prisma.ProfileUpdateInput) => prisma.profile.update({where:{id}, data: profile, include: includeAll})

export const updateProfileByUserId = (id: string, profile: Prisma.ProfileUpdateInput) => prisma.profile.update({where:{userId: id}, data: profile, include: includeAll})


export const addStyleToProfileByUserId = (id: string, styleId: number) => prisma.profile.update({
    where:{userId: id}, 
    data: {
        styles: {
            connect: {id: styleId} 
        }
    }, 
    include: includeAll
});


export const removeStyleToProfileByUserId = async (userId: string, styleId: number) => {
    try {
      const updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          styles: {
            disconnect: {
              id: styleId,
            },
          },
        }, 
        include: includeAll
      });
      return updatedProfile
    } catch (error) {
      console.error(error);
    }
};








export const getAllGenders = async() => prisma.gender.findMany();
export const getAllSilhouettes = async() => prisma.silhouette.findMany();
export const getAllStyles = async() => prisma.style.findMany();

export const createGender = async(genderData: Prisma.GenderUncheckedCreateInput) => {
    try{
        const gender = await prisma.gender.create({data: genderData,})
        return gender
    }catch(error){
        return error
    }
}
export const createSilhouette = async(silhouetteData: Prisma.SilhouetteUncheckedCreateInput) => {
    try{
        const silhouette = await prisma.silhouette.create({data: silhouetteData,})
        return silhouette
    }catch(error){
        return error
    }
}
export const createStyle = async(styleData: Prisma.StyleUncheckedCreateInput) => {
    try{
        const style = await prisma.style.create({data: styleData,})
        return style
    }catch(error){
        return error
    }
}