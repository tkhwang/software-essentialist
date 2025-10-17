import { Router, Request, Response } from 'express';
import { prisma } from '../database';
import { Errors } from '../errors';
import { isMissingKeys, isUUID, parseForResponse } from '../utils';

export class ClassController {
    public readonly router = Router();

    constructor() {
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/', this.createClass);
        this.router.post('/enrollments', this.enrollStudent);
        this.router.get('/:id/assignments', this.getClassAssignments);
    }

    private createClass = async (req: Request, res: Response) => {
        try {
            if (isMissingKeys(req.body, ['name'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

            const { name } = req.body;

            const cls = await prisma.class.create({
                data: {
                    name
                }
            });

            res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    };

    private enrollStudent = async (req: Request, res: Response) => {
        try {
            if (isMissingKeys(req.body, ['studentId', 'classId'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

            const { studentId, classId } = req.body;

            const student = await prisma.student.findUnique({
                where: {
                    id: studentId
                }
            });

            if (!student) {
                return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
            }

            const cls = await prisma.class.findUnique({
                where: {
                    id: classId
                }
            });

            const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
                where: {
                    studentId,
                    classId
                }
            });

            if (duplicatedClassEnrollment) {
                return res.status(400).json({ error: Errors.StudentAlreadyEnrolled, data: undefined, success: false });
            }

            if (!cls) {
                return res.status(404).json({ error: Errors.ClassNotFound, data: undefined, success: false });
            }

            const classEnrollment = await prisma.classEnrollment.create({
                data: {
                    studentId,
                    classId
                }
            });

            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    };

    private getClassAssignments = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!isUUID(id)) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

            const cls = await prisma.class.findUnique({
                where: {
                    id
                }
            });

            if (!cls) {
                return res.status(404).json({ error: Errors.ClassNotFound, data: undefined, success: false });
            }

            const assignments = await prisma.assignment.findMany({
                where: {
                    classId: id
                },
                include: {
                    class: true,
                    studentTasks: true
                }
            });

            res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    };
}
