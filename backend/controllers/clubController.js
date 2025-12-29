import { DataTypes } from "sequelize";
import Club from "../models/club.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const create_club = async (req, res) => {
  const { clubname, password, description, clubtype, isPrivate } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  if (!clubname || !description || !clubtype) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }


  if (isPrivate && !password) {
    return res.status(400).json({
      success: false,
      message: "Password required for private clubs",
    });
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

    const club = await Club.create({
      name: clubname,
      description: description,
      club_type: clubtype,
      creator_id: creator_id,
      password: isPrivate ? password : null,
      is_private: isPrivate || false,
    });

    await club.addMember(user);

    res.status(201).json({
      success: true,
      message: "Club created successfully",
      club: club,
    });
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({
      success: false,
      message: "Error creating club: " + error.message,
    });
  }
};

const show_clubs = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_Id = decoded.id;

    const clubs = await Club.findAll({
      where: { creator_id: user_Id },
    });

    res.status(200).json({ success: true, message: "Clubs searching successfully", clubs });
  
  } catch (error) {
    console.error("Error searching for clubs:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error searching for clubs: " + error.message,
      });
  }
};

const load_club = async (req, res) => {
  try{
    const clubId = req.params.id
    const token  = req.headers.authorization?.split(" ")[1];
    
    if(!token){
      return res.status(401).json({success:false, message: "No token provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const club = await Club.findByPk(clubId, {
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'full_name', 'email']
      },
      {
        model: User,
        as: 'members',
        attributes: ['id', 'username', 'full_name'],
        through: { attributes: [] }
      }
    ]
  }); 

    if(!club){
      return res.status(404).json({success:false, message: "Club not found"});
    }

    let isMember =  club.members.some(member => member.id === userId) || false;

    return res.status(200).json({success:true, message: "Club loaded successfully", club, isMember});

   }catch(error){
    console.error("Error loading club:", error);
    res.status(500).json({success:false, message: "Error loading club: " + error.message});
   }
}

export { create_club, show_clubs, load_club};
