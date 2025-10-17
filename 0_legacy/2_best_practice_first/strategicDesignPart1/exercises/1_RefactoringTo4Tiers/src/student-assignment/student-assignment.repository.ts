import { prisma } from '../database';

export class StudentAssignmentRepository {
    create(studentId: string, assignmentId: string) {
        return prisma.studentAssignment.create({
            data: {
                studentId,
                assignmentId
            }
        });
    }

    findById(id: string) {
        return prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });
    }

    updateStatus(id: string, status: string) {
        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                status
            }
        });
    }

    updateGrade(id: string, grade: string) {
        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade
            }
        });
    }

    findSubmittedByStudent(studentId: string) {
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

    findGradedByStudent(studentId: string) {
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
}
