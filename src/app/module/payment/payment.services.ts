import { User } from "../user/userModel";


const extendSubscription = async (userId: string, daysToAdd: number) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const now = new Date();
    let currentExpireDate: Date;

    if (user.subscriptionTypeDate && user.subscriptionTypeDate > now) {
       
        currentExpireDate = user.subscriptionTypeDate;
    } else {
        
        currentExpireDate = now;
    }

   
    const newExpireDate = new Date(currentExpireDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    user.subscriptionTypeDate = newExpireDate;

    await user.save();

    console.log("New subscription expire date:", user.subscriptionTypeDate);
    return user.subscriptionTypeDate;
};
