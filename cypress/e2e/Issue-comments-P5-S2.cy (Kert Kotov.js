import CommentsIssueModal from '../pages/CommentsIssueModal';

describe('Issue comments creating, editing and deleting', () => {
    const commentsIssueModal = new CommentsIssueModal();

    beforeEach(() => {
        cy.visit('/');
        cy.url().should('include', '/project/board');
        cy.contains('This is an issue of type: Task.').should('be.visible').click();
    });

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        commentsIssueModal.addComment(comment);
        commentsIssueModal.verifyCommentExists(comment);
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const updatedComment = 'TEST_COMMENT_EDITED';

        commentsIssueModal.editComment(previousComment, updatedComment);
        commentsIssueModal.verifyCommentEdited(updatedComment);
    });

    it('Should delete a comment successfully', () => {
        commentsIssueModal.deleteComment();
        commentsIssueModal.verifyCommentDeleted();
    });
});
