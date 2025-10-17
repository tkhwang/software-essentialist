import { prisma } from '../database';
import { Errors, ServiceError } from '../errors';

export class StudentService {
    async createStudent(name: string) {
        return prisma.student.create({
            data: {
                name
            }
        });
    }

    async getStudents() {
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

    async getStudentById(id: string) {
        const student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });

        if (!student) {
            throw new ServiceError(Errors.StudentNotFound);
        }

        return student;
    }

    async getSubmittedAssignments(studentId: string) {
        await this.ensureStudentExists(studentId);

        return prisma.studentAssignment.findMany({
            where: {
                studentId,
                status: 'submitted'
            },
            include: {
                assignment: true
            }
        });
    }

    async getGradedAssignments(studentId: string) {
        await this.ensureStudentExists(studentId);

        return prisma.studentAssignment.findMany({
            where: {
                studentId,
                status: 'submitted',
                grade: {
                    not: null
                }
            },
            include: {
                assignment: true
            }
        });
    }

    private async ensureStudentExists(studentId: string) {
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            throw new ServiceError(Errors.StudentNotFound);
        }
    }
}
