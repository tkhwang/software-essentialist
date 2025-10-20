import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from '../../src';
import { resetDatabase } from '../fixtures/reset';
import { aClassRoom, anEnrolledStudent, aStudent } from '../fixtures';
import { Class, Student } from '@prisma/client';
import { kMaxLength } from 'buffer';
import { EnrolledStudent } from '../fixtures/types';

const feature = loadFeature(path.join(__dirname, '../features/create-enrollment.feature'));

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test("Successfully enroll a student to a class", ({ given, when, then }) => {
        let response: any = {};
        let student: Student;
        let classRoom: Class;

        given("There is a class and a student", async () => {
            student = await aStudent().build()
            classRoom = await aClassRoom().build()
        });

        when("I enroll the student to the class", async () => {
            response = await request(app).post("/class-enrollments").send({
                studentId: student.id,
                classId: classRoom.id,
            });
        });

        then("the student should be enrolled to the class successfully", async () => {
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.studentId).toBe(student.id);
            expect(response.body.data.classId).toBe(classRoom.id);
        });
    });

    test("Enroll a student to a class that doesn't exist", ({ given, when, then }) => {
        let response: any = {};
        let student: Student;

        given("There is a student", async () => {
            student = await aStudent().build()
        });

        when("I enroll the student to a class that doesn't exist", async () => {
            const wrongClassIdWhichDoesNotExist = "123";
            response = await request(app).post("/class-enrollments").send({
                studentId: student.id,
                classId: wrongClassIdWhichDoesNotExist,
            });
        });

        then("the student should not be enrolled to the class", async () => {
            expect(response.status).toBe(404);
        });
    })


    test("Already enrolled", ({ given, when, then }) => {
        let response: any = {};
        let requestBody: any = {};
        let enrolledStudent: EnrolledStudent;
        let classRoom: Class;

        given("a student is already enrolled to a class", async () => {
            let builderResult = await anEnrolledStudent()
                .from(aClassRoom().withName("Math"))
                .and(aStudent().withEmail("khalil@essentialist.dev").withName("Khalil"))
                .build();

            enrolledStudent = builderResult.enrolledStudent;
            classRoom = builderResult.classRoom;
        });

        when("I enroll the student to the class again", async () => {
            requestBody = {
                studentId: enrolledStudent.studentId,
                classId: enrolledStudent.classId,
            }
            response = await request(app).post("/class-enrollments").send(requestBody);
        });

        then("I should see an error message", async () => {
            expect(response.status).toBe(409);
            expect(response.body.error).toBe("StudentAlreadyEnrolled");
        });
    });
});
