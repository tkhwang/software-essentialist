import express from 'express';
import { StudentController } from './students/student.controller';
import { AssignmentController } from './assignments/assignment.controller';
import { ClassController } from './classes/class.controller';
import { StudentAssignmentController } from './student-assignment/student-assignment.controller';

const cors = require('cors');

export interface AppControllers {
    studentController: StudentController;
    assignmentController: AssignmentController;
    classController: ClassController;
    studentAssignmentController: StudentAssignmentController;
}

export function createApp(controllers: AppControllers) {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use('/students', controllers.studentController.router);
    app.use('/assignments', controllers.assignmentController.router);
    app.use('/classes', controllers.classController.router);
    app.use('/student-assignments', controllers.studentAssignmentController.router);

    return app;
}
