import { ProductivityEnhancements } from "./productivity.model";

const findPrivicyByUserId = async(id : String) => {
    const result = await ProductivityEnhancements.findOne({userId : id});
    return result;
};


const updatePrivicyByUserID = async(id : string , updatedData : Partial<typeof ProductivityEnhancements>) => {

    const result = await ProductivityEnhancements.findOneAndUpdate({userId : id} , updatedData , {new : true , runValidators : true});
    return result;
}

export const productivityServices = {
    findPrivicyByUserId,
    updatePrivicyByUserID
}