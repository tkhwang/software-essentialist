import { Router, Request, Response, NextFunction } from 'express';
import { ErrorExceptionType, ServiceError, getHttpStatusForError } from '../common/error/errors';
import { isUUID, parseForResponse } from '../utils';
import { AssignmentService } from './assignment.service';
import { ErrorExceptionHandler } from '../common/error/error-handler';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AssignStudentDTO } from './dto/assign-student.dto';

export class AssignmentController {
    public readonly router = Router();
    private readonly assignmentService: AssignmentService;
    private readonly errorHandler: ErrorExceptionHandler;

    constructor(assignmentService: AssignmentService, errorHandler: ErrorExceptionHandler) {
        this.assignmentService = assignmentService;
        this.errorHandler = errorHandler;
        this.registerRoutes();
        this.setupErrorHandler();
    }

    private setupErrorHandler() {
        this.router.use(this.errorHandler.handle);
    }

    private registerRoutes() {
        this.router.post('/', this.createAssignment);
        this.router.get('/:id', this.assignStudent);
    }

    private createAssignment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createAssignmentDto = CreateAssignmentDto.fromRequest(req.body);
            const assignment = await this.assignmentService.createAssignment(createAssignmentDto);

            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    };

    private assignStudent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const assignStudentDto = AssignStudentDTO.fromRequest(req.body);
            const assignment = await this.assignmentService.getAssignmentById(assignStudentDto);
            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    };
}
