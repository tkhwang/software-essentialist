import { prisma } from '../database';

export class AssignmentRepository {
    create(classId: string, title: string) {
        return prisma.assignment.create({
            data: {
                classId,
                title
            }
        });
    }

    findById(id: string) {
        return prisma.assignment.findUnique({
            where: {
                id
            }
        });
    }

    findByIdWithDetails(id: string) {
        return prisma.assignment.findUnique({
            where: {
                id
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    }

    findByClassIdWithDetails(classId: string) {
        return prisma.assignment.findMany({
            where: {
                classId
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    }
}
