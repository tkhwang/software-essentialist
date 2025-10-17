import { prisma } from '../database';
import { Errors, ServiceError } from '../errors';

export class ClassService {
    async createClass(name: string) {
        return prisma.class.create({
            data: {
                name
            }
        });
    }

    async enrollStudent(studentId: string, classId: string) {
        const [student, cls] = await Promise.all([
            prisma.student.findUnique({
                where: {
                    id: studentId
                }
            }),
            prisma.class.findUnique({
                where: {
                    id: classId
                }
            })
        ]);

        if (!student) {
            throw new ServiceError(Errors.StudentNotFound);
        }

        if (!cls) {
            throw new ServiceError(Errors.ClassNotFound);
        }

        const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });

        if (duplicatedClassEnrollment) {
            throw new ServiceError(Errors.StudentAlreadyEnrolled);
        }

        return prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    }

    async getClassAssignments(classId: string) {
        const cls = await prisma.class.findUnique({
            where: {
                id: classId
            }
        });

        if (!cls) {
            throw new ServiceError(Errors.ClassNotFound);
        }

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
