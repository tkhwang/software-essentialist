
import { app } from "..";
import { prisma } from "../database";
import { Errors } from "../errors";
import { isMissingKeys, isUUID, parseForResponse } from "../utils";
import express, { Request, Response } from 'express';



// POST student assigned to assignment
app.post('/student-assignments', async (req: Request, res: Response) => {
    try {
        if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        const { studentId, assignmentId, grade } = req.body;

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }

        // check if assignment exists
        const assignment = await prisma.assignment.findUnique({
            where: {
                id: assignmentId
            }
        });

        if (!assignment) {
            return res.status(404).json({ error: Errors.AssignmentNotFound, data: undefined, success: false });
        }

        const studentAssignment = await prisma.studentAssignment.create({
            data: {
                studentId,
                assignmentId,
            }
        });

        res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }

});

// POST student submitted assignment
app.post('/student-assignments/submit', async (req: Request, res: Response) => {
    try {
        if (isMissingKeys(req.body, ['id'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        const { id } = req.body;

        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });

        if (!studentAssignment) {
            return res.status(404).json({ error: Errors.AssignmentNotFound, data: undefined, success: false });
        }

        const studentAssignmentUpdated = await prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                status: 'submitted'
            }
        });

        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
});

// POST student assignment graded
app.post('/student-assignments/grade', async (req: Request, res: Response) => {
    try {

        if (isMissingKeys(req.body, ['id', 'grade'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        const { id, grade } = req.body;

        // validate grade
        if (!['A', 'B', 'C', 'D'].includes(grade)) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });

        if (!studentAssignment) {
            return res.status(404).json({ error: Errors.AssignmentNotFound, data: undefined, success: false });
        }

        const studentAssignmentUpdated = await prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });

        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
});


