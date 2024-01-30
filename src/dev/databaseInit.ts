import { createSilhouette, createGender, createStyle } from "../database/profiles";


const createGenders = async()=>{
    try{
        await createGender({
            id: 0,
            name: "Male"
        });
        await createGender({
            id: 1,
            name: "Female"
        });
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}
const createSilhouettes = async()=>{
    try{
        await createSilhouette({
            id: 0,
            name: "Triangle"
        });
        await createSilhouette({
            id: 1,
            name: "Inverted triangle"
        });
        await createSilhouette({
            id: 2,
            name: "Hourglass"
        });
        await createSilhouette({
            id: 3,
            name: "Rectangle"
        });
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}
const styles = [
    { id: 0, name: "00s" },
    { id: 1, name: "20s" },
    { id: 2, name: "30s" },
    { id: 3, name: "40s" },
    { id: 4, name: "50s" },
    { id: 5, name: "60s" },
    { id: 6, name: "70s" },
    { id: 7, name: "80s" },
    { id: 8, name: "90s" },
    { id: 9, name: "Androgynous" },
    { id: 10, name: "Artsy" },
    { id: 11, name: "Ballerina" },
    { id: 12, name: "Basic" },
    { id: 13, name: "Beach" },
    { id: 14, name: "Biker" },
    { id: 15, name: "Boho" },
    { id: 16, name: "Business casual" },
    { id: 17, name: "Casual" },
    { id: 18, name: "Comfy" },
    { id: 19, name: "Country" },
    { id: 20, name: "Dark Academia" },
    { id: 21, name: "Eclectic" },
    { id: 22, name: "Edgy" },
    { id: 23, name: "Elegant" },
    { id: 24, name: "Ethereal" },
    { id: 25, name: "Feminine" },
    { id: 26, name: "Folk" },
    { id: 27, name: "Formal" },
    { id: 28, name: "French" },
    { id: 29, name: "Fun" },
    { id: 30, name: "Funky" },
    { id: 31, name: "Garconne" },
    { id: 32, name: "Geek chic" },
    { id: 33, name: "Girl next door" },
    { id: 34, name: "Glamorous" },
    { id: 35, name: "Goth" },
    { id: 36, name: "Granola" },
    { id: 37, name: "Grunge" },
    { id: 38, name: "Hipster" },
    { id: 39, name: "Kooky" },
    { id: 40, name: "Lagenlook" },
    { id: 41, name: "Masculine" },
    { id: 42, name: "Military" },
    { id: 43, name: "Minimalist" },
    { id: 44, name: "Modest" },
    { id: 45, name: "Prairie" },
    { id: 46, name: "Preppy" },
    { id: 47, name: "Punk" },
    { id: 48, name: "Racy" },
    { id: 49, name: "Rocker" },
    { id: 50, name: "Romantic" },
    { id: 51, name: "Skateboard" },
    { id: 52, name: "Sporty" },
    { id: 53, name: "Street" },
    { id: 54, name: "Toddler" },
    { id: 55, name: "Traditional" },
    { id: 56, name: "Vintage" }
];
const createStyles = async()=>{
    try{
        for (const style of styles) {
            await createStyle(style);
        }
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}
export const createBaseDataToDB =async () => {
    const genders = await createGenders();
    const silhouettes = await createSilhouettes();
    const styles = await createStyles();
}