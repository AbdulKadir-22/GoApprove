// src/services/AdminService.js
const { User, Company, Category, Enums } = require('../models');
const mongoose = require('mongoose');

module.exports = class AdminService {
     static async createUser({ companyId, name, email, role, managerId = null }) {
        console.log("service");
        console.log(companyId, name, email, role, managerId);
    if (!Object.values(Enums.Roles).includes(role)) throw new Error('Invalid role');
        
        const company = await Company.findById(companyId).lean();
        // console.log(company);
    if (!company) throw new Error('Company not found');
    if (managerId) {
      const mgr = await User.findOne({ _id: managerId, company_id: companyId, role: Enums.Roles.Manager });
      if (!mgr) throw new Error('Manager not found in company');
    }
    const user = await User.create({ company_id: companyId, name, email, role, manager_id: managerId });
    return { id: user._id, name: user.name, email: user.email, role: user.role, manager_id: user.manager_id };
  }

  static async updateUserRole({ companyId, userId, role }) {
    if (!Object.values(Enums.Roles).includes(role)) throw new Error('Invalid role');
    const user = await User.findOneAndUpdate(
      { _id: userId, company_id: companyId },
      { $set: { role } },
      { new: true }
    );
    if (!user) throw new Error('User not found');
    return { id: user._id, role: user.role };
  }

  static async setManager({ companyId, userId, managerId }) {
    const mgr = await User.findOne({ _id: managerId, company_id: companyId, role: Enums.Roles.Manager });
    if (!mgr) throw new Error('Manager not found in company');
    const user = await User.findOneAndUpdate(
      { _id: userId, company_id: companyId },
      { $set: { manager_id: managerId } },
      { new: true }
    );
    if (!user) throw new Error('User not found');
    return { id: user._id, manager_id: user.manager_id };
  }

  static async createCategory({ companyId, name }) {
    const cat = await Category.create({ company_id: companyId, name });
    return { id: cat._id, name: cat.name };
  }

  static async listCategories({ companyId }) {
    const cats = await Category.find({ company_id: companyId }).lean();
    return cats.map(c => ({ id: c._id, name: c.name, active_workflow_version_id: c.active_workflow_version_id }));
  }
};
