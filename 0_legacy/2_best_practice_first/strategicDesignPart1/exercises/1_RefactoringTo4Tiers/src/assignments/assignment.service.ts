import { prisma } from '../database';
import { Errors, ServiceError } from '../errors';

export class AssignmentService {
    async createAssignment(classId: string, title: string) {
        return prisma.assignment.create({
            data: {
                classId,
                title
            }
        });
    }

    async getAssignmentById(id: string) {
        const assignment = await prisma.assignment.findUnique({
            include: {
                class: true,
                studentTasks: true
            },
            where: {
                id
            }
        });

        if (!assignment) {
            throw new ServiceError(Errors.AssignmentNotFound);
        }

        return assignment;
    }
}
