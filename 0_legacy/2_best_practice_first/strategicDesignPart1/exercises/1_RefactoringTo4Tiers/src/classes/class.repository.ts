import { prisma } from '../database';

export class ClassRepository {
    create(name: string) {
        return prisma.class.create({
            data: {
                name
            }
        });
    }

    findById(id: string) {
        return prisma.class.findUnique({
            where: {
                id
            }
        });
    }

    findEnrollment(studentId: string, classId: string) {
        return prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });
    }

    createEnrollment(studentId: string, classId: string) {
        return prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    }
}
