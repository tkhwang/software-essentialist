import { ErrorExceptionType, ServiceError } from '../common/error/errors';
import { ClassRepository } from './class.repository';
import { StudentRepository } from '../students/student.repository';
import { AssignmentRepository } from '../assignments/assignment.repository';
import { CreateClassDto } from './dto/create-class.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';

export class ClassService {
    constructor(
        private readonly classRepository: ClassRepository,
        private readonly studentRepository: StudentRepository,
        private readonly assignmentRepository: AssignmentRepository
    ) { }

    async createClass(createClassDto: CreateClassDto) {
        return this.classRepository.create(createClassDto.name);
    }

    async enrollStudent(enrollStudentDto: EnrollStudentDto) {
        const { studentId, classId } = enrollStudentDto;
        const [student, cls] = await Promise.all([
            this.studentRepository.findById(studentId),
            this.classRepository.findById(classId)
        ]);

        if (!student) {
            throw new ServiceError(ErrorExceptionType.StudentNotFound);
        }

        if (!cls) {
            throw new ServiceError(ErrorExceptionType.ClassNotFound);
        }

        const duplicatedClassEnrollment = await this.classRepository.findEnrollment(studentId, classId);

        if (duplicatedClassEnrollment) {
            throw new ServiceError(ErrorExceptionType.StudentAlreadyEnrolled);
        }

        return this.classRepository.createEnrollment(studentId, classId);
    }

    async getClassAssignments(classId: string) {
        const cls = await this.classRepository.findById(classId);

        if (!cls) {
            throw new ServiceError(ErrorExceptionType.ClassNotFound);
        }

        return this.assignmentRepository.findByClassIdWithDetails(classId);
    }
}
