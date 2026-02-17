import "sequelize";
import { Club, User } from "../models/index.js"; // importar as conecções que vem do index primeiro pois se importar direto do model pegamos o model antes das associações
import jwt from "jsonwebtoken";

const create_club = async (req, res) => {
  const { clubname, password, description, clubtype, isPrivate } = req.body;
  const clubimage = req.file;
  const token = req.headers.authorization.split(" ")[1];

 
  const isPrivateBoolean = isPrivate === 'true' || isPrivate === true;

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

  if (isPrivateBoolean && !password) {
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
      password: isPrivateBoolean ? password : null,
      is_private: isPrivateBoolean,
      club_image: clubimage ? clubimage.filename : null
    });

    await club.addMember(user);

    return res.status(201).json({
      success: true,
      message: "Club created successfully",
      club: club,
    });
  } catch (error) {
    console.error("Error creating club:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating club: " + error.message,
    });
  }
};


const deleteClub = async (req, res) => {
  try {
    const clubId = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];

    if (!clubId) {
      return res
        .status(404)
        .json({ success: false, message: "No club ID provided" });
    }

    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!club) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const club = await Club.findByPk(clubId);

    if (String(userId) !== String(club.creator_id)) {
      return res.status(403).json({
        success: false,
        message: "Only the creator can delete this club",
      });
    }

    await club.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Club deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting Club" + error.message });
  }
};

const show_clubs = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const clubsCreated = await Club.findAll({ where: { creator_id: userId } });
    const clubsJoined = await Club.findAll({
      include: [
        {
          model: User,
          as: "members",
          where: { id: userId },
          attributes: [],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Clubs searching successfully",
      clubsCreated,
      clubsJoined,
    });
  } catch (error) {
    console.error("Error searching for clubs:", error);
    res.status(500).json({
      success: false,
      message: "Error searching for clubs: " + error.message,
    });
  }
};

const load_club = async (req, res) => {
  try {
    const clubId = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const club = await Club.findByPk(clubId, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "username", "full_name", "email"],
        },
        {
          model: User,
          as: "members",
          attributes: ["id", "username", "full_name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!club) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    let isMember = club.members.some((member) => member.id === userId);
    let isCreator = club.creator_id === userId;

    return res.status(200).json({
      success: true,
      message: "Club loaded successfully",
      club,
      isMember,
      isCreator,
    });
  } catch (error) {
    console.error("Error loading club:", error);
    res.status(500).json({
      success: false,
      message: "Error loading club: " + error.message,
    });
  }
};

const joinClub = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const UserId = decoded.id;

  const clubId = req.params.id;
  if (!clubId) {
    return res
      .status(401)
      .json({ success: false, message: "Error joining in club" });
  }

  try {
    const club = await Club.findByPk(clubId);
    if (!club) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    await club.addMember(UserId);
    return res
      .status(200)
      .json({ success: true, message: "Joined in club successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error joining in club: " + error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const memberId = req.params.memberId;
    const clubId = req.params.id;
    const club = await Club.findByPk(clubId);

    if (!club) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    if (userId !== club.creator_id) {
      return res
        .status(403)
        .json({ success: false, message: "Only creator can delete" });
    }

    if (!memberId) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    await club.removeMember(memberId);
    return res.status(200).json({ success: true, message: "Member deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting user" + error.message });
  }
};

export {
  show_clubs,
  create_club,
  deleteClub,
  load_club,
  joinClub,
  deleteMember,
};
