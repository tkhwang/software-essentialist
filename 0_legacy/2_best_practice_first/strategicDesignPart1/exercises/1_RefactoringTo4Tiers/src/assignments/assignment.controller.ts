import { Router, Request, Response, NextFunction } from 'express';
import { ErrorExceptionType, ServiceError, getHttpStatusForError } from '../common/error/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../utils';
import { AssignmentService } from './assignment.service';
import { ErrorExceptionHandler } from '../common/error/error-handler';

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
        this.router.get('/:id', this.getAssignmentById);
    }

    private createAssignment = async (req: Request, res: Response, next: NextFunction) => {
        if (isMissingKeys(req.body, ['classId', 'title'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const { classId, title } = req.body;
            const assignment = await this.assignmentService.createAssignment(classId, title);
            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    };

    private getAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        try {
            const assignment = await this.assignmentService.getAssignmentById(id);
            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    };
}
