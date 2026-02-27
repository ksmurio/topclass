import sequelize from 'sequelize';
import User from '../models/user.js';
import notes from '../models/notes.js'

const saveNotes = async (req, res) => {
    const note = req.body;
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const creator_id = decoded.id;
        const user = await User.findByPk(creator_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const note = await notes.create(req.value)
    }catch(error){
        return res.status(500).json({success:false, message: 'Error creating note', error: error.message});
    }
}

export { saveNotes }