import { PrivacyModel } from "./privacy.model";


const findPrivicyByUserId = async(id : String) => {
    const result = await PrivacyModel.findOne({userId : id});
    return result;
};


const updatePrivicyByUserID = async(id : string , updatedData : Partial<typeof PrivacyModel>) => {

    const result = await PrivacyModel.findOneAndUpdate({userId : id} , updatedData , {new : true , runValidators : true});
    return result;
}

export const collabrationServices = {
    findPrivicyByUserId,
    updatePrivicyByUserID
}