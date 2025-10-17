import { InvalidRequestBodyException } from "../../common/exception/exceptions";
import { isMissingKeys } from "../../utils";


export class EnrollStudentDto {
    constructor(public studentId: string, public classId: string) { }

    static fromRequest(body: unknown): EnrollStudentDto {
        const requiredKeys = ['studentId', 'classId'];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { studentId, classId } = body as { studentId: string, classId: string };

        return new EnrollStudentDto(studentId, classId);
    }
}