import Course from '../Models/CourseModel.js';

export const createCourse = async (req, res, next) => {
    try {
        const { title, courseId, description, prerequisites = [] } = req.body;

        // Look up ObjectIds for all prerequisite courseIds
        let prerequisiteIds = [];
        if (prerequisites.length > 0) {
            const prereqDocs = await Course.find({ courseId: { $in: prerequisites } });
            if (prereqDocs.length !== prerequisites.length) {
                // Some prerequisites not found
                const foundIds = prereqDocs.map(doc => doc.courseId);
                const missing = prerequisites.filter(cid => !foundIds.includes(cid));
                return res.status(400).json({
                    status: "error",
                    message: `Invalid prerequisite(s): ${missing.join(', ')}`
                });
            }
            prerequisiteIds = prereqDocs.map(doc => doc._id);
        }

        // Create the course with prerequisite ObjectIds
        const newCourse = await Course.create({
            title,
            courseId,
            description,
            prerequisites: prerequisiteIds
        });

        res.status(201).json({
            status: "success",
            message: "Course Created",
            course: newCourse,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).populate('prerequisites', 'title courseId');
        res.status(200).json({ courses });
    } catch (error) {
        next(error);
    }
};


export const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Use findOne with courseId field instead of findById
        const course = await Course.findOne({ courseId: id }).populate('prerequisites', 'title courseId');

        if (!course) {
            return res.status(404).json({
                status: "error",
                message: "Course not found"
            });
        }

        res.status(200).json({ course });
    } catch (error) {
        next(error);
    }
};

export const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params; // This is the courseId from the URL

        // Find the course by courseId
        const course = await Course.findOne({ courseId: id });
        if (!course) {
            return res.status(404).json({
                status: "error",
                message: "Course not found"
            });
        }

        // Check if this course is a prerequisite for any other course
        const isPrerequisite = await Course.findOne({ prerequisites: course._id });
        if (isPrerequisite) {
            return res.status(409).json({
                status: "error",
                message: "Course cannot be deleted because it is a prerequisite for another course."
            });
        }

        // Safe to delete
        await Course.deleteOne({ courseId: id });

        res.status(200).json({
            status: "success",
            message: "Course deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
