import { Router, Request, Response, NextFunction } from 'express';
import { ErrorExceptionType } from '../common/error/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../utils';
import { StudentService } from './student.service';
import { ErrorExceptionHandler } from '../common/error/error-handler';

export class StudentController {
    public readonly router = Router();
    private readonly studentService: StudentService;
    private readonly errorHandler: ErrorExceptionHandler;

    constructor(studentService: StudentService, errorHandler: ErrorExceptionHandler) {
        this.studentService = studentService;
        this.errorHandler = errorHandler;
        this.registerRoutes();
        this.setupErrorHandler();
    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler.handle);
    }

    private registerRoutes() {
        this.router.post('/', this.createStudent);
        this.router.get('/', this.getStudents);
        this.router.get('/:id', this.getStudentById);
        this.router.get('/:id/assignments', this.getStudentAssignments);
        this.router.get('/:id/grades', this.getStudentGrades);
    }

    private createStudent = async (req: Request, res: Response, next: NextFunction) => {
        if (isMissingKeys(req.body, ['name'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { name } = req.body;
            const student = await this.studentService.createStudent(name);
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    };

    private getStudents = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const students = await this.studentService.getStudents();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            next(error);
        }
    };

    private getStudentById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const student = await this.studentService.getStudentById(id);
            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    };

    private getStudentAssignments = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const studentAssignments = await this.studentService.getSubmittedAssignments(id);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    };

    private getStudentGrades = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const studentAssignments = await this.studentService.getGradedAssignments(id);
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    };
}
