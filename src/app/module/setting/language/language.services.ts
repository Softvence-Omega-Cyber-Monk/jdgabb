import { languageModel } from "./language.model";



const findLanguageByUserId = async(id : String) => {
    const result = await languageModel.findOne({userId : id});
    return result;
};


const updateLanguageByUserID = async(id : string , updatedData : Partial<typeof languageModel>) => {

    const result = await languageModel.findOneAndUpdate({userId : id} , updatedData , {new : true , runValidators : true});
    return result;
}

export const collabrationServices = {
    findLanguageByUserId,
    updateLanguageByUserID
}