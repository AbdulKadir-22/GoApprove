// src/controllers/AdminController.js
const AdminService = require('../services/AdminService');

module.exports = class AdminController {
  static async createUser(req, res, next) {
    try {
      console.log("controller");
      const companyId = req.user.email; // from auth middleware
      console.log({...req.body});
      const out = await AdminService.createUser({ ...req.body });
      console.log()
      res.status(201).json(out);
    } catch (e) { next(e); }
  }

  static async updateUserRole(req, res, next) {
    try {
    //   const companyId = req.user.company_id;
      const out = await AdminService.updateUserRole({ company_id:req.body.company_id, userId: req.params.id, role: req.body.role });
      res.json(out);
    } catch (e) { next(e); }
  }

  static async setManager(req, res, next) {
    try {
    //   const companyId = req.user.company_id;
      const out = await AdminService.setManager({ companyId, userId: req.params.id, managerId: req.body.managerId });
      res.json(out);
    } catch (e) { next(e); }
  }

  static async createCategory(req, res, next) {
    try {
    //   const companyId = req.user.company_id;
      const out = await AdminService.createCategory({ companyId, name: req.body.name });
      res.status(201).json(out);
    } catch (e) { next(e); }
  }

  static async listCategories(req, res, next) {
    try {
    //   const companyId = req.user.company_id;
      const out = await AdminService.listCategories({ companyId });
      res.json(out);
    } catch (e) { next(e); }
  }
};
