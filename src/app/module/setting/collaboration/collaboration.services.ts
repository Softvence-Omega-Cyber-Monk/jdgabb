import { CollaborationModel } from "./collaboration.model";


const findCollabrationByUserId = async(id : String) => {
    const result = await CollaborationModel.findOne({userId : id});
    return result;
};


const updateCollabrationByUserID = async(id : string , updatedData : Partial<typeof CollaborationModel>) => {

    const result = await CollaborationModel.findOneAndUpdate({userId : id} , updatedData , {new : true , runValidators : true});
    return result;
}

export const collabrationServices = {
    findCollabrationByUserId,
    updateCollabrationByUserID
}