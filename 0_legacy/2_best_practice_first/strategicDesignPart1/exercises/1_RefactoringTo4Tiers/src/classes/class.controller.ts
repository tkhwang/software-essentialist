import { Router, Request, Response, NextFunction } from 'express';
import { ErrorExceptionType } from '../common/error/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../utils';
import { ClassService } from './class.service';
import { ErrorExceptionHandler } from '../common/error/error-handler';

export class ClassController {
    public readonly router = Router();
    private readonly classService: ClassService;
    private readonly errorHandler: ErrorExceptionHandler;

    constructor(classService: ClassService, errorHandler: ErrorExceptionHandler) {
        this.classService = classService;
        this.errorHandler = errorHandler;
        this.registerRoutes();
        this.setupErrorHandler();
    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler.handle);
    }

    private registerRoutes() {
        this.router.post('/', this.createClass);
        this.router.post('/enrollments', this.enrollStudent);
        this.router.get('/:id/assignments', this.getClassAssignments);
    }

    private createClass = async (req: Request, res: Response, next: NextFunction) => {
        if (isMissingKeys(req.body, ['name'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { name } = req.body;
            const cls = await this.classService.createClass(name);
            res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
        } catch (error) {
            next(error);
        }
    };

    private enrollStudent = async (req: Request, res: Response, next: NextFunction) => {
        if (isMissingKeys(req.body, ['studentId', 'classId'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { studentId, classId } = req.body;
            const classEnrollment = await this.classService.enrollStudent(studentId, classId);
            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            next(error);
        }
    };

    private getClassAssignments = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const assignments = await this.classService.getClassAssignments(id);
            res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
        } catch (error) {
            next(error);
        }
    };
}
