import { AssignmentBuilder } from "./assignment.builder";
import { ClassRoomBuilder } from "./class-room.builder";
import { EnrolledStudentBuilder } from "./enrolled-student.builder";
import { StudentAssignemtBuilder } from "./student-assignment.build";
import { StudentBuilder } from "./student.builder";

export function aClassRoom() {
    return new ClassRoomBuilder();
}

export function aStudent() {
    return new StudentBuilder();
}

export function anEnrolledStudent() {
    return new EnrolledStudentBuilder();
}

export function anAssignment() {
    return new AssignmentBuilder();
}

export function aStudentAssignemt() {
    return new StudentAssignemtBuilder();
}