import express, { Router, Request, Response, RequestHandler } from 'express';
import { createBorrowing, updateBorrowingReturn } from '../operations/borrowings-crud';

const router: Router = express.Router();

// CRUD Operations
router.post('/', createBorrowing as RequestHandler);
router.put('/:borrowing_id/return', updateBorrowingReturn as RequestHandler);

export default router;