import SubjectGrade from '../models/subject_grades.js';
import User from '../models/user.js';

const addGrade = async (req, res) => {
  const { subject_id, grade } = req.body;

  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    const newGrade = await SubjectGrade.create({
      user_id: user.id,
      subject_id: subject_id,
      grade: grade
    });

    res.status(201).json({ success: true, message: 'Grade added successfully', grade: newGrade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding grade' });
  }
};

export { addGrade };