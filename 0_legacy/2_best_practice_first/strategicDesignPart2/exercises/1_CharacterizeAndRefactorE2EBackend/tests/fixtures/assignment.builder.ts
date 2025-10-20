import { Assignment } from "@prisma/client";
import { ClassRoomBuilder } from "./class-room.builder";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

export class AssignmentBuilder {
    private assignment: Partial<Assignment>;
    private classRoomBuilder: ClassRoomBuilder | undefined;

    constructor() {
        this.classRoomBuilder = undefined;
        this.assignment = {
            title: faker.lorem.word()
        }
    }

    from(classRoomBuilder: ClassRoomBuilder): this {
        this.classRoomBuilder = classRoomBuilder;
        return this;
    }

    withTitle(title: string): this {
        this.assignment.title = title;
        return this;
    }

    async build() {
        if (this.classRoomBuilder === undefined) throw new Error('classRoomBuilder not defined')
        const classRoom = await this.classRoomBuilder.build();

        this.assignment = await prisma.assignment.create({
            data: {
                title: this.assignment.title as string,
                classId: classRoom.id,
            }
        })

        let assignment = this.assignment as Assignment;

        return { assignment, classRoom }
    }
}