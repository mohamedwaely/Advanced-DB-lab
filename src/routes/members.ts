import express, { Router, Request, Response, RequestHandler } from 'express';
import {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
} from '../operations/members-crud';
import {
    getMembersWhoBorrowedModernEgypt,
    getMembersJoinedBeforeYear,
    getBooksBorrowedByMember
} from '../operations/queries';
import {
    getBooksPerMember,
    getAvgBooksPerMembership,
    getHeavyBorrowers,
    getMembersByType
} from '../operations/aggregations';

const router: Router = express.Router();

// CRUD Operations
router.post('/', createMember as RequestHandler);
router.get('/', getAllMembers as RequestHandler);
router.get('/:member_id', getMemberById as RequestHandler);
router.put('/:member_id', updateMember as RequestHandler);
router.delete('/:member_id', deleteMember as RequestHandler);

// Queries
router.get('/borrowed-modern-egypt', getMembersWhoBorrowedModernEgypt as RequestHandler);
router.get('/joined-before/:year', getMembersJoinedBeforeYear as RequestHandler);
router.get('/:member_id/borrowed-books', getBooksBorrowedByMember as RequestHandler);

// Aggregations
router.get('/books-per-member', getBooksPerMember as RequestHandler);
router.get('/avg-books-per-membership', getAvgBooksPerMembership as RequestHandler);
router.get('/heavy-borrowers/:count', getHeavyBorrowers as RequestHandler);
router.get('/members-by-type', getMembersByType as RequestHandler);

export default router;