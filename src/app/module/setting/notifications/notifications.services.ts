import { NotificationModel } from "./notifications.model";




const findNotificationByUserId = async(id : String) => {
    const result = await NotificationModel.findOne({userId : id});
    return result;
};


const updateNotificationByUserID = async(id : string , updatedData : Partial<typeof NotificationModel>) => {

    const result = await NotificationModel.findOneAndUpdate({userId : id} , updatedData , {new : true , runValidators : true});
    return result;
}

export const collabrationServices = {
    findNotificationByUserId,
    updateNotificationByUserID
}