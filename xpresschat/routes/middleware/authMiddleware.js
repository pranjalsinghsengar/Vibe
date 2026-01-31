import  jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        req.user = decoded; // Store decoded token data in request object
        next(); // Proceed to next middleware
    });
};

 
export const authentication=async(req,res,next)=>{
    try {
        
        try {
          const {api_key}=req.headers;
    const token =api_key 
    console.log("token", token);
    const decoded = jwt.decode(token);
             
            req.whatsapp_account = decoded;
            next();
          } catch (error) {
            res.status(201).json({
              success: false,
              message: "Unauthorized: Invalid Api Key"
            });
          }
        // if(!account){
        //     return res.status(400).json({ message: "Authentication failed" });
        // }
        // else{
            
        //    const configuration_data=await WhatsappAccount.findOne({ id:account });
        //    req.meta_data={
        //     token:configuration_data.meta_api_access_token,
        //     PHONE_NUMBER_ID:configuration_data.PHONE_NUMBER_ID,
        //     tanentId:configuration_data.tenant_id
        //    }
           
        //    next() 
           
        // }
    }
    catch (error) {
        console.error("Error in authentication middleware", error);
        res.status(500).json({ message: "Server Error" });
    }
}
// module.exports = authMiddleware;
export default authMiddleware;