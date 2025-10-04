// src/controllers/WorkflowAdminController.js
const WorkflowAdminService = require('../services/WorkflowAdminService');

module.exports = class WorkflowAdminController {
  static async createVersion(req, res, next) {
    try {
      const companyId = req.user.company_id;
      const out = await WorkflowAdminService.createVersion({ companyId, categoryId: req.params.categoryId });
      res.status(201).json(out);
    } catch (e) { next(e); }
  }

  static async addStep(req, res, next) {
    try {
      const companyId = req.user.company_id;
      const out = await WorkflowAdminService.addStep({
        companyId,
        versionId: req.params.versionId,
        ...req.body
      });
      res.status(201).json(out);
    } catch (e) { next(e); }
  }

  static async publishVersion(req, res, next) {
    try {
      const companyId = req.user.company_id;
      const out = await WorkflowAdminService.publishVersion({ companyId, versionId: req.params.versionId });
      res.json(out);
    } catch (e) { next(e); }
  }
};
