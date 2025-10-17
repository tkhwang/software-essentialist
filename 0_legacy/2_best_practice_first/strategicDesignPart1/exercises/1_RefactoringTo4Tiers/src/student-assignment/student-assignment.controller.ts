import { Router, Request, Response } from 'express';
import { ErrorExceptionType, ServiceError, getHttpStatusForError } from '../common/error/errors';
import { isMissingKeys, parseForResponse } from '../utils';
import { StudentAssignmentService } from './student-assignment.service';

export class StudentAssignmentController {
    public readonly router = Router();
    private readonly studentAssignmentService: StudentAssignmentService;

    constructor(studentAssignmentService: StudentAssignmentService) {
        this.studentAssignmentService = studentAssignmentService;
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/', this.assignStudent);
        this.router.post('/submit', this.submitAssignment);
        this.router.post('/grade', this.gradeAssignment);
    }

    private assignStudent = async (req: Request, res: Response) => {
        if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { studentId, assignmentId } = req.body;
            const studentAssignment = await this.studentAssignmentService.assignStudentToAssignment(studentId, assignmentId);
            res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private submitAssignment = async (req: Request, res: Response) => {
        if (isMissingKeys(req.body, ['id'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { id } = req.body;
            const studentAssignmentUpdated = await this.studentAssignmentService.markAsSubmitted(id);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private gradeAssignment = async (req: Request, res: Response) => {
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
            this.handleError(res, error);
        }
    };

    private handleError(res: Response, error: unknown) {
        if (error instanceof ServiceError) {
            const status = getHttpStatusForError(error.code);
            res.status(status).json({ error: error.code, data: undefined, success: false });
            return;
        }

        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
}
