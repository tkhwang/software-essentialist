import express from 'express';
import { studentController } from './students/student.controller';
import { assignmentController } from './assignments/assignment.controller';
import { classController } from './classes/class.controller';
import { studentAssignmentController } from './student-assignment/student-assignment.controller';

const cors = require('cors');
export const app = express();

app.use(express.json());
app.use(cors());

app.use('/students', studentController.router);
app.use('/assignments', assignmentController.router);
app.use('/classes', classController.router);
app.use('/student-assignments', studentAssignmentController.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
