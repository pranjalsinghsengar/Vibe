import User from "../routes/user/model/index.js"
export const authorizeMasterAdminUser = async (req, res, next) => {

    try {
        const user_data = await User.findOne({ id: req.user.user_id })

        if (user_data.userType == "masteradmin")
            next()
        else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No permission ",
            });
        }

    } catch (error) {
        res.status(201).json({
            success: false,
            message: "Unauthorized: Invalid token1",
        });
    }


}

export const authorizeSuperAdminUser = async (req, res, next) => {

    try {
        console.log(">>>>>user28", req.user)
        const user_data = await User.findOne({ id: req.user.user_id })
        console.log(">>>>>29", user_data)
        if (user_data.userType == "superadmin")
            next()
        else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No permission ",
            });
        }

    } catch (error) {
        res.status(201).json({
            success: false,
            message: "Unauthorized: Invalid token1",
        });
    }


}