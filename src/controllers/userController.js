import userService from "../services/userService";


const register = async (req, res) => {
    // const { email, password, phoneNumber, lastName, firstName } = req.body;
    // if (!email || !password || !phoneNumber || !lastName || !firstName)
    //     return res
    //         .status(400)
    //         .json("email, password, phoneNumber,name are required!");
    // const hashPassword = await bcrypt.hash(password, 10);
    // console.log("🚀 ~ file: userController.js:12 ~ register ~ hashPassword:", hashPassword)

    const respond = await userService.createUser(req.body);
    if (respond.error)
        return res.status(400).json(respond);

    return res.status(201).json(respond)
};

// async (req, res) => {
//     try {
//         const data = await db.User.findAll();
//         return res.status(200).json(data);
//     } catch (e) {
//         console.log("🚀 ~ file: root.js:16 ~ router.get ~ e:", e)
//     }
// }

export default {
    register
}