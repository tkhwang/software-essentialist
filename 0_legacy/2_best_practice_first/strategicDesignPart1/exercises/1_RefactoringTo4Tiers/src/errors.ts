export const Errors = {
    ValidationError: 'ValidationError',
    StudentNotFound: 'StudentNotFound',
    ClassNotFound: 'ClassNotFound',
    AssignmentNotFound: 'AssignmentNotFound',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
};

export class ServiceError extends Error {
    constructor(public readonly code: string) {
        super(code);
    }
}

export function getHttpStatusForError(code: string): number {
    switch (code) {
        case Errors.ValidationError:
        case Errors.StudentAlreadyEnrolled:
            return 400;
        case Errors.StudentNotFound:
        case Errors.ClassNotFound:
        case Errors.AssignmentNotFound:
            return 404;
        default:
            return 500;
    }
}
