import SubjectGrade from "../models/subject_grades.js";
import User from "../models/user.js";

const updateGlobalAverage = async (user_id) => {
  let counter = 0;
  let sumGrades = 0;
  try {
    const grades = await SubjectGrade.findAll({ where: { user_id } });
    grades.forEach((element) => {                      
      const gradeValue = parseFloat(element.grade);    
      if (!isNaN(gradeValue)) {                          
        counter += 1;
        sumGrades += gradeValue;
      }
    });
    const average = counter > 0 ? (sumGrades / counter).toFixed(2) : 0;
    await User.update({ global_average: average }, { where: { id: user_id } });
    console.log('Global average updated:', average);
  } catch (error) {
    console.error('Error updating global average:', error);
  }
};
const addGrade = async (req, res) => {
  const { subject_id, grade } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    await SubjectGrade.create({
      user_id: user.id,
      subject_id,
      grade,
    });
    await updateGlobalAverage(user.id);
    return res
      .status(201)
      .json({ success: true, message: "Grade added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error adding grade" });
  }
};

export { addGrade };
