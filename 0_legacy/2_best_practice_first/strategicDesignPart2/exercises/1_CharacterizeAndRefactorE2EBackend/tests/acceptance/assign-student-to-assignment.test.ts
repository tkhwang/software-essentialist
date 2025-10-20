import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import request from 'supertest';
import { app } from '../../src';
import { resetDatabase } from '../fixtures/reset';
import { Class, StudentAssignment } from '@prisma/client';
import { aClassRoom, anAssignment, anEnrolledStudent, aStudent, aStudentAssignemt } from '../fixtures';
import { Assignment, Student } from '../fixtures/types';

const feature = loadFeature(path.join(__dirname, '../features/assign-student-to-assignment.feature'));

defineFeature(feature, (test) => {
    afterEach(async () => {
        await resetDatabase();
    });

    test("Assign a student to an assignment", ({ given, when, then }) => {
        let requestBody: any = {};
        let response: any = {};
        let student: Student;
        let assignment: Assignment;

        beforeAll(async () => {
            await resetDatabase();
        });

        given("There is an existing student enrolled to a class with an assignment", async () => {
            const classRoomBuilder = aClassRoom().withName("Math");

            const enrollmentResult = await anEnrolledStudent()
                .from(classRoomBuilder)
                .and(aStudent())
                .build();

            const assignmentResult = await anAssignment()
                .from(classRoomBuilder)
                .build();

            assignment = assignmentResult.assignment;
            student = enrollmentResult.student;
        })

        when("I assign the student the assignment", async () => {
            requestBody = {
                studentId: student.id,
                assignmentId: assignment.id,
            };

            response = await request(app).post("/student-assignments").send(requestBody);
        })

        then("the student should be assigned to the assignment", () => {
            expect(response.status).toBe(201);
            expect(response.body.data.studentId).toBeTruthy();
            expect(response.body.data.assignmentId).toBeTruthy();
            expect(response.body.data.studentId).toBe(requestBody.studentId);
            expect(response.body.data.assignmentId).toBe(requestBody.assignmentId);
        })
    });

    test("Fail to assign a student to an assignment when the student is not enrolled to the class", ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: any = {};
        let assignment: Assignment;
        let student: Student;

        given("A student is not enrolled to a class", async () => {
            student = await aStudent().build();
        })

        and("an assignment exists for the class", async () => {
            const builderResult = await anAssignment()
                .from(aClassRoom().withName("Math"))
                .build();

            assignment = builderResult.assignment;
        })

        when("I assign him to the assignment", async () => {
            requestBody = {
                studentId: student.id,
                assignmentId: assignment.id
            }

            response = await request(app)
                .post("/student-assignments")
                .send(requestBody);
        })

        then("The student should not be assigned to the assignment", async () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe("StudentNotEnrolled");
        })
    })

    test("Already assigned the assignment to the student", async ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: any = {};
        let studentAssignment: StudentAssignment;

        given("a student was already assigned an assignment", async () => {
            const classRoomBuilder = await aClassRoom().withName("Math");

            studentAssignment = await aStudentAssignemt()
                .from(anAssignment().from(classRoomBuilder))
                .and(anEnrolledStudent()
                    .from(classRoomBuilder)
                    .and(aStudent().withName("Khalil"))
                )
                .build();
        })


        when("I attempt to assign the assignment to him again", async () => {
            requestBody = {
                studentId: studentAssignment.studentId,
                assignmentId: studentAssignment.assignmentId,
            }

            response = await request(app)
                .post("/student-assignments")
                .send(requestBody)
        })

        then("it should fail", () => {
            expect(response.status).toBe(409);
            expect(response.body.error).toBe("AlreadyAssignedAssignmentToStudent");
        })
    })
});
