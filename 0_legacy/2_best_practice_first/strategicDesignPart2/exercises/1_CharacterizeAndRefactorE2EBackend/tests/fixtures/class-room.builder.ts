import { Class } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

export class ClassRoomBuilder {
    private classRoom: Partial<Class>

    constructor() {
        this.classRoom = {
            name: faker.company.buzzNoun()
        }
    }

    withName(name: string): this {
        this.classRoom.name = name;
        return this;
    }

    async build(): Promise<Class> {
        let classRoom = await prisma.class.upsert({
            create: {
                name: this.classRoom.name as string
            },
            update: {
                name: this.classRoom.name as string
            },
            where: {
                name: this.classRoom.name as string
            }
        });

        return classRoom as Class;
    }
}
