import express from 'express';
import { StudentController } from './students/student.controller';
import { AssignmentController } from './assignments/assignment.controller';
import { ClassController } from './classes/class.controller';
import { StudentAssignmentController } from './student-assignment/student-assignment.controller';
import { StudentService } from './students/student.service';
import { AssignmentService } from './assignments/assignment.service';
import { ClassService } from './classes/class.service';
import { StudentAssignmentService } from './student-assignment/student-assignment.service';

const cors = require('cors');
export const app = express();

app.use(express.json());
app.use(cors());

const studentController = new StudentController(new StudentService());
const assignmentController = new AssignmentController(new AssignmentService());
const classController = new ClassController(new ClassService());
const studentAssignmentController = new StudentAssignmentController(new StudentAssignmentService());

app.use('/students', studentController.router);
app.use('/assignments', assignmentController.router);
app.use('/classes', classController.router);
app.use('/student-assignments', studentAssignmentController.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
