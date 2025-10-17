import { prisma } from '../database';
import { Errors, ServiceError } from '../errors';

export class StudentAssignmentService {
    async assignStudentToAssignment(studentId: string, assignmentId: string) {
        await this.ensureStudentExists(studentId);
        await this.ensureAssignmentExists(assignmentId);

        return prisma.studentAssignment.create({
            data: {
                studentId,
                assignmentId
            }
        });
    }

    async markAsSubmitted(id: string) {
        await this.ensureStudentAssignmentExists(id);

        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                status: 'submitted'
            }
        });
    }

    async gradeAssignment(id: string, grade: string) {
        await this.ensureStudentAssignmentExists(id);

        return prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade
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

    private async ensureAssignmentExists(assignmentId: string) {
        const assignment = await prisma.assignment.findUnique({
            where: {
                id: assignmentId
            }
        });

        if (!assignment) {
            throw new ServiceError(Errors.AssignmentNotFound);
        }
    }

    private async ensureStudentAssignmentExists(id: string) {
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });

        if (!studentAssignment) {
            throw new ServiceError(Errors.AssignmentNotFound);
        }
    }
}
