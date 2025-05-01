import express, { Router, Request, Response, RequestHandler } from 'express';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../operations/books-crud';
import { getPopularBooks } from '../operations/aggregations';

const router: Router = express.Router();

// CRUD Operations
router.post('/', createBook as RequestHandler);
router.get('/', getAllBooks as RequestHandler);
router.get('/:book_id', getBookById as RequestHandler);
router.put('/:book_id', updateBook as RequestHandler);
router.delete('/:book_id', deleteBook as RequestHandler);

// Aggregations
router.get('/popular-books', getPopularBooks as RequestHandler);

export default router;