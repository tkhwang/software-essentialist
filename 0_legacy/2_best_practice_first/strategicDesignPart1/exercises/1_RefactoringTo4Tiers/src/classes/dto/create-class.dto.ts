import { InvalidRequestBodyException } from "../../common/exception/exceptions";
import { isMissingKeys } from "../../utils";

export class CreateClassDto {
    constructor(public name: string) { }

    static fromRequest(body: unknown): CreateClassDto {
        const requiredKeys = ['name'];
        const isRequestInvalid =
            !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { name } = body as { name: string };

        return new CreateClassDto(name);
    }
}