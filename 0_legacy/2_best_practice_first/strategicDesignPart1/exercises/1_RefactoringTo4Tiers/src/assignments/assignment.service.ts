import { ErrorExceptionType, ServiceError } from '../common/error/errors';
import { AssignmentRepository } from './assignment.repository';

export class AssignmentService {
    constructor(private readonly assignmentRepository: AssignmentRepository) { }

    async createAssignment(classId: string, title: string) {
        return this.assignmentRepository.create(classId, title);
    }

    async getAssignmentById(id: string) {
        const assignment = await this.assignmentRepository.findByIdWithDetails(id);

        if (!assignment) {
            throw new ServiceError(ErrorExceptionType.AssignmentNotFound);
        }

        return assignment;
    }
}
