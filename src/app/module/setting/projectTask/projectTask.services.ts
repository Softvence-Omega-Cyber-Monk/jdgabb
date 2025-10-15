import { ProjectTaskModel } from "./projectTask.model";


const findProjectTaskByUserId = async(id : String) => {
    const result = await ProjectTaskModel.findOne({userId : id});
    return result;
};


const updateProjectTaskByUserID = async(id : string , updatedData : Partial<typeof ProjectTaskModel>) => {

    const result = await ProjectTaskModel.findOneAndUpdate({userId : id} , updatedData , {new : true , runValidators : true});
    return result;
}

export const projectTaskServices = {
    findProjectTaskByUserId,
    updateProjectTaskByUserID
}