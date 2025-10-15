import { IAppearance } from "./appearance.interfaces";
import { AppearanceModel } from "./appearance.model"

const findAppearanceByUserId = async(id : String) => {
    const result = await AppearanceModel.findOne({userId : id});
    return result;
};


const updateAppearanceByUserID = async(id : string , updatedData : Partial<IAppearance>) => {

    const result = await AppearanceModel.findOneAndUpdate({userId : id} , updatedData , {new : true , runValidators : true});
    return result;
}

export const apperanceServices = {
    findAppearanceByUserId,
    updateAppearanceByUserID
}