import { Errors, ServiceError } from '../errors';
import { StudentRepository } from './student.repository';
import { StudentAssignmentRepository } from '../student-assignment/student-assignment.repository';

export class StudentService {
    constructor(
        private readonly studentRepository: StudentRepository,
        private readonly studentAssignmentRepository: StudentAssignmentRepository
    ) {}

    async createStudent(name: string) {
        return this.studentRepository.create(name);
    }

    async getStudents() {
        return this.studentRepository.findAllWithDetails();
    }

    async getStudentById(id: string) {
        const student = await this.studentRepository.findByIdWithDetails(id);

        if (!student) {
            throw new ServiceError(Errors.StudentNotFound);
        }

        return student;
    }

    async getSubmittedAssignments(studentId: string) {
        await this.ensureStudentExists(studentId);

        return this.studentAssignmentRepository.findSubmittedByStudent(studentId);
    }

    async getGradedAssignments(studentId: string) {
        await this.ensureStudentExists(studentId);

        return this.studentAssignmentRepository.findGradedByStudent(studentId);
    }

    private async ensureStudentExists(studentId: string) {
        const student = await this.studentRepository.findById(studentId);

        if (!student) {
            throw new ServiceError(Errors.StudentNotFound);
        }
    }
}
