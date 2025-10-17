import { Router, Request, Response } from 'express';
import { Errors, ServiceError, getHttpStatusForError } from '../errors';
import { isMissingKeys, isUUID, parseForResponse } from '../utils';
import { ClassService } from './class.service';

export class ClassController {
    public readonly router = Router();
    private readonly classService: ClassService;

    constructor(classService: ClassService) {
        this.classService = classService;
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/', this.createClass);
        this.router.post('/enrollments', this.enrollStudent);
        this.router.get('/:id/assignments', this.getClassAssignments);
    }

    private createClass = async (req: Request, res: Response) => {
        if (isMissingKeys(req.body, ['name'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        try {
            const { name } = req.body;
            const cls = await this.classService.createClass(name);
            res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private enrollStudent = async (req: Request, res: Response) => {
        if (isMissingKeys(req.body, ['studentId', 'classId'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        try {
            const { studentId, classId } = req.body;
            const classEnrollment = await this.classService.enrollStudent(studentId, classId);
            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private getClassAssignments = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        try {
            const assignments = await this.classService.getClassAssignments(id);
            res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private handleError(res: Response, error: unknown) {
        if (error instanceof ServiceError) {
            const status = getHttpStatusForError(error.code);
            res.status(status).json({ error: error.code, data: undefined, success: false });
            return;
        }

        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}
