import { Router, Request, Response, NextFunction } from 'express';
import { ErrorExceptionType } from '../common/error/errors';
import { isMissingKeys, parseForResponse } from '../utils';
import { StudentAssignmentService } from './student-assignment.service';
import { ErrorExceptionHandler } from '../common/error/error-handler';

export class StudentAssignmentController {
    public readonly router = Router();
    private readonly studentAssignmentService: StudentAssignmentService;
    private readonly errorHandler: ErrorExceptionHandler;

    constructor(studentAssignmentService: StudentAssignmentService, errorHandler: ErrorExceptionHandler) {
        this.studentAssignmentService = studentAssignmentService;
        this.errorHandler = errorHandler;
        this.registerRoutes();
        this.setupErrorHandler();
    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler.handle);
    }

    private registerRoutes() {
        this.router.post('/', this.assignStudent);
        this.router.post('/submit', this.submitAssignment);
        this.router.post('/grade', this.gradeAssignment);
    }

    private assignStudent = async (req: Request, res: Response, next: NextFunction) => {
        if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { studentId, assignmentId } = req.body;
            const studentAssignment = await this.studentAssignmentService.assignStudentToAssignment(studentId, assignmentId);
            res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
        } catch (error) {
            next(error);
        }
    };

    private submitAssignment = async (req: Request, res: Response, next: NextFunction) => {
        if (isMissingKeys(req.body, ['id'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { id } = req.body;
            const studentAssignmentUpdated = await this.studentAssignmentService.markAsSubmitted(id);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    };

    private gradeAssignment = async (req: Request, res: Response, next: NextFunction) => {
        if (isMissingKeys(req.body, ['id', 'grade'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        const { id, grade } = req.body;

        if (!['A', 'B', 'C', 'D'].includes(grade)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const studentAssignmentUpdated = await this.studentAssignmentService.gradeAssignment(id, grade);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    };
}
