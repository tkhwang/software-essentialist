import { Router, Request, Response } from 'express';
import { prisma } from '../database';
import { Errors } from '../errors';
import { isMissingKeys, parseForResponse } from '../utils';

export class StudentAssignmentController {
    public readonly router = Router();

    constructor() {
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/', this.assignStudent);
        this.router.post('/submit', this.submitAssignment);
        this.router.post('/grade', this.gradeAssignment);
    }

    private assignStudent = async (req: Request, res: Response) => {
        try {
            if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

            const { studentId, assignmentId } = req.body;

            const student = await prisma.student.findUnique({
                where: {
                    id: studentId
                }
            });

            if (!student) {
                return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
            }

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
    };

    private submitAssignment = async (req: Request, res: Response) => {
        try {
            if (isMissingKeys(req.body, ['id'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

            const { id } = req.body;

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
    };

    private gradeAssignment = async (req: Request, res: Response) => {
        try {
            if (isMissingKeys(req.body, ['id', 'grade'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

            const { id, grade } = req.body;

            if (!['A', 'B', 'C', 'D'].includes(grade)) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

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
    };
}

export const studentAssignmentController = new StudentAssignmentController();
