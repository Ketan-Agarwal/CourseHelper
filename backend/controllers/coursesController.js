const db = require("../db/db");
const { authenticateToken } = require("../middlewares/authMiddleware");


const getAllCourses = async (req, res) => {
 
    const result = await db.query('SELECT * FROM public.courses');
    res.json(result.rows);

}

const addCourse = async (req, res) => {
    const { courseName, courseCode, credits, profName, description, imageURL } = req.body;
    if (!courseName || !courseCode || !credits || !profName || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required' , data: courseCode});
      }
        const result = await db.query(
            'INSERT INTO courses ("courseName", "imageURL", "courseCode", "profName", "credits", "description") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [courseName, imageURL, courseCode, profName, credits, description]
        );
        res.json(result.rows[0]);
    
}

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { courseName, imageURL, courseCode, profName, credits, description } = req.body;
    try {
        const result = await db.query(
            'UPDATE public.courses SET "courseName" = $1, "imageURL" = $2, "courseCode" = $3, "profName" = $4, credits = $5, description = $6 WHERE id = $7 RETURNING *',
            [courseName, imageURL, courseCode, profName, credits, description, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM public.courses WHERE id = $1', [id]);
        res.send('Course deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getAllCourses,
    addCourse: [authenticateToken, addCourse],
    updateCourse: [authenticateToken, updateCourse],
    deleteCourse: [authenticateToken, deleteCourse],
  };