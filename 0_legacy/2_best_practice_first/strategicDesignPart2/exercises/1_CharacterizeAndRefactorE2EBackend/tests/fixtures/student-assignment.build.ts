import { EnrolledStudent } from './types';
import { AssignmentBuilder } from "./assignment.builder";
import { EnrolledStudentBuilder } from "./enrolled-student.builder";
import { prisma } from '../../src/database';
import { StudentAssignment } from '@prisma/client';



export class StudentAssignmentBuilder {
    private enrolledStudentBuilder?: EnrolledStudentBuilder;
    private assignmentBuilder?: AssignmentBuilder;

    from(assignmentBuilder: AssignmentBuilder): this {
        this.assignmentBuilder = assignmentBuilder;
        return this;
    }

    and(enrolledStudentBuilder: EnrolledStudentBuilder): this {
        this.enrolledStudentBuilder = enrolledStudentBuilder;
        return this;
    }

    async build() {
        if (!this.enrolledStudentBuilder) throw new Error("you must defined the enrolled student builder")
        if (!this.assignmentBuilder) throw new Error("you must define the assignment builder")

        let assignment = await this.assignmentBuilder.build();
        let enrolledStudent = await this.enrolledStudentBuilder.build();

        const studentAssignment = await prisma.studentAssignment.create({
            data: {
                studentId: enrolledStudent.student.id,
                assignmentId: assignment.assignment.id
            }
        })

        return studentAssignment as StudentAssignment
    }
}