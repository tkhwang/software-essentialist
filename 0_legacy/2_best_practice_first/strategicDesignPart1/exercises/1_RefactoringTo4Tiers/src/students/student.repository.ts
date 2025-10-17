import { prisma } from '../database';

export class StudentRepository {
    create(name: string) {
        return prisma.student.create({
            data: {
                name
            }
        });
    }

    findAllWithDetails() {
        return prisma.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            },
            orderBy: {
                name: 'asc'
            }
        });
    }

    findById(id: string) {
        return prisma.student.findUnique({
            where: {
                id
            }
        });
    }

    findByIdWithDetails(id: string) {
        return prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });
    }
}
