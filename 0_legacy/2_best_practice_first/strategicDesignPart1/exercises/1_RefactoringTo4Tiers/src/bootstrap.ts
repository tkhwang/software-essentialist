import { createApp } from './app';
import { StudentController } from './students/student.controller';
import { AssignmentController } from './assignments/assignment.controller';
import { ClassController } from './classes/class.controller';
import { StudentAssignmentController } from './student-assignment/student-assignment.controller';
import { StudentRepository } from './students/student.repository';
import { AssignmentRepository } from './assignments/assignment.repository';
import { ClassRepository } from './classes/class.repository';
import { StudentAssignmentRepository } from './student-assignment/student-assignment.repository';
import { StudentService } from './students/student.service';
import { AssignmentService } from './assignments/assignment.service';
import { ClassService } from './classes/class.service';
import { StudentAssignmentService } from './student-assignment/student-assignment.service';
import { ErrorExceptionHandler } from './common/error/error-handler';

const studentRepository = new StudentRepository();
const assignmentRepository = new AssignmentRepository();
const classRepository = new ClassRepository();
const studentAssignmentRepository = new StudentAssignmentRepository();

const studentService = new StudentService(studentRepository, studentAssignmentRepository);
const assignmentService = new AssignmentService(assignmentRepository);
const classService = new ClassService(classRepository, studentRepository, assignmentRepository);
const studentAssignmentService = new StudentAssignmentService(
    studentAssignmentRepository,
    studentRepository,
    assignmentRepository
);

// Error handler
const errorExceptionHandler = new ErrorExceptionHandler();

// Controllers
const controllers = {
    studentController: new StudentController(studentService, errorExceptionHandler),
    assignmentController: new AssignmentController(assignmentService, errorExceptionHandler),
    classController: new ClassController(classService, errorExceptionHandler),
    studentAssignmentController: new StudentAssignmentController(studentAssignmentService, errorExceptionHandler)
};

const app = createApp(controllers);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export { app };
