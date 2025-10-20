import { ClassRoomBuilder } from "./class-room.builder";
import { EnrolledStudentBuilder } from "./enrolled-student.builder";
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