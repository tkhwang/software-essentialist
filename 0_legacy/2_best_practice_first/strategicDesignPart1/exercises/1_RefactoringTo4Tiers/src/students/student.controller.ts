import { Router, Request, Response } from 'express';
import { ErrorExceptionType, ServiceError, getHttpStatusForError } from '../common/error/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../utils';
import { StudentService } from './student.service';

export class StudentController {
    public readonly router = Router();
    private readonly studentService: StudentService;

    constructor(studentService: StudentService) {
        this.studentService = studentService;
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/', this.createStudent);
        this.router.get('/', this.getStudents);
        this.router.get('/:id', this.getStudentById);
        this.router.get('/:id/assignments', this.getStudentAssignments);
        this.router.get('/:id/grades', this.getStudentGrades);
    }

    private createStudent = async (req: Request, res: Response) => {
        if (isMissingKeys(req.body, ['name'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { name } = req.body;
            const student = await this.studentService.createStudent(name);
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private getStudents = async (req: Request, res: Response) => {
        try {
            const students = await this.studentService.getStudents();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private getStudentById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const student = await this.studentService.getStudentById(id);
            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private getStudentAssignments = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const studentAssignments = await this.studentService.getSubmittedAssignments(id);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private getStudentGrades = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const studentAssignments = await this.studentService.getGradedAssignments(id);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
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
