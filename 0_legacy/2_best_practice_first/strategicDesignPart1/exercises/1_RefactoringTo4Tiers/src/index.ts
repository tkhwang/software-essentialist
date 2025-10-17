import express from 'express';
import { StudentController } from './students/student.controller';
import { AssignmentController } from './assignments/assignment.controller';
import { ClassController } from './classes/class.controller';
import { StudentAssignmentController } from './student-assignment/student-assignment.controller';

const cors = require('cors');
export const app = express();

app.use(express.json());
app.use(cors());

const studentController = new StudentController();
const assignmentController = new AssignmentController();
const classController = new ClassController();
const studentAssignmentController = new StudentAssignmentController();

app.use('/students', studentController.router);
app.use('/assignments', assignmentController.router);
app.use('/classes', classController.router);
app.use('/student-assignments', studentAssignmentController.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
