
export class ServiceError extends Error {
    constructor(public readonly code: string) {
        super(code);
    }
}

export function getHttpStatusForError(code: string): number {
    switch (code) {
        case ErrorExceptionType.ValidationError:
        case ErrorExceptionType.StudentAlreadyEnrolled:
            return 400;
        case ErrorExceptionType.StudentNotFound:
        case ErrorExceptionType.ClassNotFound:
        case ErrorExceptionType.AssignmentNotFound:
            return 404;
        default:
            return 500;
    }
}

export const ErrorExceptionType = {
    ValidationError: 'ValidationError',
    StudentNotFound: 'StudentNotFound',
    ClassNotFound: 'ClassNotFound',
    AssignmentNotFound: 'AssignmentNotFound',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    StudentAlreadyEnrolled: 'StudentAlreadyEnrolled',
    StudentAssignmentNotFoundException: "StudentAssignmentNotFoundException",

};

