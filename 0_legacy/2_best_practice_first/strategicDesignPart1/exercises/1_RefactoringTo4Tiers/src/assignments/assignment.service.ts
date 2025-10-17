import { ErrorExceptionType, ServiceError } from '../common/error/errors';
import { AssignmentRepository } from './assignment.repository';
import { AssignStudentDTO } from './dto/assign-student.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

export class AssignmentService {
    constructor(private readonly assignmentRepository: AssignmentRepository) { }

    async createAssignment(createAssignmentDto: CreateAssignmentDto) {
        const { classId, title } = createAssignmentDto;
        return this.assignmentRepository.create(classId, title);
    }

    async getAssignmentById(assignStudentDto: AssignStudentDTO) {
        const { studentId, assignmentId } = assignStudentDto;

        const assignment = await this.assignmentRepository.findByIdWithDetails(assignmentId);
        if (!assignment) throw new ServiceError(ErrorExceptionType.AssignmentNotFound);


        return assignment;
    }
}
