import { Router, Request, Response } from 'express';
import { Errors, ServiceError, getHttpStatusForError } from '../errors';
import { isMissingKeys, isUUID, parseForResponse } from '../utils';
import { AssignmentService } from './assignment.service';

export class AssignmentController {
    public readonly router = Router();
    private readonly assignmentService: AssignmentService;

    constructor(assignmentService: AssignmentService) {
        this.assignmentService = assignmentService;
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post('/', this.createAssignment);
        this.router.get('/:id', this.getAssignmentById);
    }

    private createAssignment = async (req: Request, res: Response) => {
        if (isMissingKeys(req.body, ['classId', 'title'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        try {
            const { classId, title } = req.body;
            const assignment = await this.assignmentService.createAssignment(classId, title);
            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    private getAssignmentById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        try {
            const assignment = await this.assignmentService.getAssignmentById(id);
            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
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
