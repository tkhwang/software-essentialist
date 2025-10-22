
import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from '../../src';
import { resetDatabase } from '../fixtures/reset';

const feature = loadFeature(path.join(__dirname, '../features/create-student.feature'));

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test("Successfuly create a student", ({ given, when, then }) => {
        let requestBody: any = {};
        let response: any = {};

        given(
            /^I want to create a student named "(.*)" and with email "(.*)"$/,
            (name, email) => {
                requestBody = {
                    name,
                    email,
                };
            }
        );

        when("I send a request to create a student", async () => {
            response = await request(app).post("/students").send(requestBody);
        });

        then("the student should be created successfully", () => {
            expect(response.status).toBe(201);
            expect(response.body.data.name).toBe(requestBody.name);
            expect(response.body.data.email).toBe(requestBody.email);
        });
    });

    test("Missing Student Email", ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: any = {};


        given(/^I want to create a student named "(.*)" and no email$/, (name) => {
            requestBody = {
                name,
            };
        });

        when("I send a request to create a student", async () => {
            response = await request(app).post("/students").send(requestBody);
        });

        then("the student should not be created", () => {
            expect(response.status).toBe(400);
            expect(response.body.success).toBeFalsy();
            expect(response.body.error).toBe("ValidationError");
        });

        and("I should receive an error message", () => {
            expect(response.body.error).toBe("ValidationError");
        });
    });
});
