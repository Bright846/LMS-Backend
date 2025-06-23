import Instance from '../Models/InstanceModel.js';
import Course from '../Models/CourseModel.js';

export const createInstance = async (req, res, next) => {
    try {
        const { year, semester, course } = req.body; // course is "CS101"

        // Find the course by its courseId string
        const courseDoc = await Course.findOne({ courseId: course });
        if (!courseDoc) {
            return res.status(400).json({
                status: "error",
                message: "Referenced course does not exist."
            });
        }

        // Now use the ObjectId for the instance
        const newInstance = await Instance.create({
            year,
            semester,
            course: courseDoc._id
        });

        res.status(201).json({
            status: "success",
            message: "Instance Created",
            instance: newInstance,
        });
    } catch (error) {
        next(error);
    }
};

export const getInstancesByYearSemester = async (req, res, next) => {
    try {
        const { year, semester } = req.params;
        const instances = await Instance.find({ year, semester })
            .populate('course'); // This will fetch the full course object

        res.json({ instances });
    } catch (error) {
        next(error);
    }
};


export const getInstanceDetail = async (req, res, next) => {
    try {
        const { year, semester, courseId } = req.params;

        // Find the course document by its courseId
        const course = await Course.findOne({ courseId });
        if (!course) {
            return res.status(404).json({
                status: "error",
                message: "Course not found"
            });
        }

        // Find the instance for the given year, semester, and course ObjectId
        const instance = await Instance.findOne({
            year,
            semester,
            course: course._id
        }).populate('course', 'title courseId description');

        if (!instance) {
            return res.status(404).json({
                status: "error",
                message: "Instance not found"
            });
        }

        res.status(200).json({ instance });

    } catch (error) {
        next(error);
    }
};

export const deleteInstance = async (req, res, next) => {
    try {
        const { year, semester, courseId } = req.params;

        // 1. Find the course by its courseId string
        const course = await Course.findOne({ courseId });
        if (!course) {
            return res.status(404).json({
                status: "error",
                message: "Course not found"
            });
        }

        // 2. Find and delete the instance matching year, semester, and course _id
        const deletedInstance = await Instance.findOneAndDelete({
            year: Number(year),
            semester: Number(semester),
            course: course._id
        });

        if (!deletedInstance) {
            return res.status(404).json({
                status: "error",
                message: "Instance not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Instance deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};