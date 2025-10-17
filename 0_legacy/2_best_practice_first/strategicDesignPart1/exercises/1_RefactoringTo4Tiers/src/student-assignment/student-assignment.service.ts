import { Errors, ServiceError } from '../errors';
import { StudentAssignmentRepository } from './student-assignment.repository';
import { StudentRepository } from '../students/student.repository';
import { AssignmentRepository } from '../assignments/assignment.repository';

export class StudentAssignmentService {
    constructor(
        private readonly studentAssignmentRepository: StudentAssignmentRepository,
        private readonly studentRepository: StudentRepository,
        private readonly assignmentRepository: AssignmentRepository
    ) {}

    async assignStudentToAssignment(studentId: string, assignmentId: string) {
        await this.ensureStudentExists(studentId);
        await this.ensureAssignmentExists(assignmentId);

        return this.studentAssignmentRepository.create(studentId, assignmentId);
    }

    async markAsSubmitted(id: string) {
        await this.ensureStudentAssignmentExists(id);

        return this.studentAssignmentRepository.updateStatus(id, 'submitted');
    }

    async gradeAssignment(id: string, grade: string) {
        await this.ensureStudentAssignmentExists(id);

        return this.studentAssignmentRepository.updateGrade(id, grade);
    }

    private async ensureStudentExists(studentId: string) {
        const student = await this.studentRepository.findById(studentId);

        if (!student) {
            throw new ServiceError(Errors.StudentNotFound);
        }
    }

    private async ensureAssignmentExists(assignmentId: string) {
        const assignment = await this.assignmentRepository.findById(assignmentId);

        if (!assignment) {
            throw new ServiceError(Errors.AssignmentNotFound);
        }
    }

    private async ensureStudentAssignmentExists(id: string) {
        const studentAssignment = await this.studentAssignmentRepository.findById(id);

        if (!studentAssignment) {
            throw new ServiceError(Errors.AssignmentNotFound);
        }
    }
}
