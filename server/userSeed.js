import User from "./models/User.js"
import bcrypt from 'bcrypt'
import connectToDatabase from "./db/db.js";
const userRegister = async () => {
    try {
        connectToDatabase();
        const user = await User.findOne({ role: 'admin' });
        if (!user) {
            const hasPassword = await bcrypt.hash("admin", 10);
            const newUser = new User({
                name: "Admin",
                email: "admin@gmail.com",
                password: hasPassword,
                role: "admin"
            })
            await newUser.save();

        }
    } catch (error) {
        console.log(error)
    }
}
export default userRegister;