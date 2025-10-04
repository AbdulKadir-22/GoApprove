// src/routes/admin.js
const router = require('express').Router();
const AdminController = require('../controllers/AdminController');
const WorkflowAdminController = require('../controllers/WorkflowAdminController');
// TODO: add auth + RBAC middleware to ensure Admin-only access

// Users
router.post('/users', AdminController.createUser);
router.patch('/users/:id/role', AdminController.updateUserRole);
router.patch('/users/:id/manager', AdminController.setManager);

// Categories
router.post('/categories', AdminController.createCategory);
router.get('/categories', AdminController.listCategories);

// Workflows
router.post('/workflows/:categoryId/versions', WorkflowAdminController.createVersion);
router.post('/workflows/:versionId/steps', WorkflowAdminController.addStep);
router.post('/workflows/:versionId/publish', WorkflowAdminController.publishVersion);

module.exports = router;
