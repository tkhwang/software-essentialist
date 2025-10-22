import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app, Errors } from '../../src';
import { resetDatabase } from '../fixtures/reset';
import { aClassRoom } from '../fixtures';
import { ClassRoom } from '../fixtures/types';
import { Class } from '@prisma/client';

const feature = loadFeature(path.join(__dirname, '../features/create-class-room.feature'));

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test("Sucessfully create a class room", ({ given, when, then }) => {
        let requestBody: any = {};
        let response: any = {};

        given(/^I want to create a class room named "(.*)"$/, (name) => {
            requestBody = {
                name,
            };
        });

        when("I request to create a class room", async () => {
            response = await request(app).post("/classes").send(requestBody);
        });

        then("the class room should be successfully created", () => {
            expect(response.status).toBe(201);
            expect(response.body.data.name).toBe(requestBody.name);
        });
    });

    test("Fail to create a class room", ({ given, when, then }) => {
        let requestBody: any = {};
        let response: any = {};

        given("I want to create a class room with no name", () => {
            requestBody = {};
        });

        when("I send a request to create a class room", async () => {
            response = await request(app).post("/classes").send(requestBody);
        });

        then("the class room should not be created", () => {
            expect(response.status).toBe(400);
            expect(response.body.success).toBeFalsy();
            expect(response.body.error).toBe("ValidationError");
        });
    });

    test("Fail to create a class room with duplicate name", ({ given, when, then }) => {
        let classRoom: Class;
        let requestBody: any = {};
        let response: any = {};

        given(/^there is already a class room named "(.*)"$/, async (name) => {
            classRoom = await aClassRoom().withName(name).build();
            requestBody = { name };
        });

        when("I send a request to create a class room", async () => {
            response = await request(app).post("/classes").send(requestBody);
        });

        then("the class room should not be created", () => {
            expect(response.status).toBe(409)
            expect(response.body.success).toBeFalsy()
            expect(response.body.error).toBe(Errors.ClassAlreadyExists)
        })

    });
});
