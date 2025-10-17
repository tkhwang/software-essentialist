import { InvalidRequestBodyException } from "../../common/exception/exceptions";
import { isMissingKeys } from "../../utils";

export class CreateAssignmentDto {
    constructor(public classId: string, public title: string) { }

    static fromRequest(body: unknown): CreateAssignmentDto {
        const requiredKeys = ['classId', 'title'];

        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { classId, title } = body as { classId: string, title: string };

        return new CreateAssignmentDto(classId, title);
    }
}
