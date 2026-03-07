import Subject from '../models/subject.js';
import User from '../models/user.js';

export const getSubjects = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const school_year = user.school_year;

    const year = school_year <= 9 ? 9 : Math.min(school_year, 12);

    const subjects = await Subject.findAll({ where: { year } });
    res.status(200).json({ success: true, subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching subjects' });
  }
};
