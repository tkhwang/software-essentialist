import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from '../../src';
import { resetDatabase } from '../fixtures/reset';
import { Class } from '@prisma/client';
import { aClassRoom } from '../fixtures';

const feature = loadFeature(path.join(__dirname, '../features/create-assignment.feature'));

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test("Successfully create an assignment", ({ given, when, then }) => {
        let classRoom: Class;
        let requestBody: any = {};
        let response: any = {};

        given("a class exists", async () => {
            classRoom = await aClassRoom().build();
        });

        when("I create an assignment for the class", async () => {
            response = await request(app).post("/assignments").send({
                classId: classRoom.id,
                title: "Assignment 1",
            });
        });

        then("the assignment should be created successfully", () => {
            expect(response.status).toBe(201);
        });
    });
});