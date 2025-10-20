export interface Student {
    id: string;
    name: string;
    email: string;
}

export interface ClassRoom {
    id: string;
    name: string;
}

export interface EnrolledStudent {
    studentId: string;
    classId: string;
}
