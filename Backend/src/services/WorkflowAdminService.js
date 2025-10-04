// src/services/WorkflowAdminService.js
const {
  Category,
  WorkflowDefinition,
  WorkflowVersion,
  StepDefinition
} = require('../models');
const mongoose = require('mongoose');

module.exports = class WorkflowAdminService {
  static async createVersion({ companyId, categoryId }) {
    const category = await Category.findOne({ _id: categoryId, company_id: companyId });
    if (!category) throw new Error('Category not found');

    let wfDef = await WorkflowDefinition.findOne({ category_id: categoryId });
    if (!wfDef) wfDef = await WorkflowDefinition.create({ category_id: categoryId });

    const latest = await WorkflowVersion.find({ workflow_definition_id: wfDef._id })
      .sort({ version: -1 }).limit(1);
    const nextVersion = latest.length ? latest[0].version + 1 : 1;

    const wfVer = await WorkflowVersion.create({
      workflow_definition_id: wfDef._id,
      version: nextVersion,
      is_active: false
    });
    return { workflow_version_id: wfVer._id, version: wfVer.version, is_active: wfVer.is_active };
  }

  static async addStep({ companyId, versionId, order_index, name, rule_type, rule_params = {}, min_amount = null, max_amount = null }) {
    const wfVer = await WorkflowVersion.findById(versionId).lean();
    if (!wfVer) throw new Error('Workflow version not found');

    // Ensure category belongs to company
    const wfDef = await WorkflowDefinition.findById(wfVer.workflow_definition_id).lean();
    const cat = await Category.findById(wfDef.category_id).lean();
    if (!cat || String(cat.company_id) !== String(companyId)) throw new Error('Forbidden');

    if (wfVer.is_active) throw new Error('Cannot modify active workflow version');

    const step = await StepDefinition.create({
      workflow_version_id: wfVer._id,
      order_index,
      name,
      rule_type,
      rule_params,
      min_amount,
      max_amount
    });
    return { step_id: step._id, order_index: step.order_index, name: step.name };
  }

  static async publishVersion({ companyId, versionId }) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const wfVer = await WorkflowVersion.findById(versionId).session(session);
      if (!wfVer) throw new Error('Workflow version not found');
      const wfDef = await WorkflowDefinition.findById(wfVer.workflow_definition_id).session(session);
      const cat = await Category.findById(wfDef.category_id).session(session);
      if (!cat || String(cat.company_id) !== String(companyId)) throw new Error('Forbidden');

      const stepsCount = await StepDefinition.countDocuments({ workflow_version_id: wfVer._id }).session(session);
      if (!stepsCount) throw new Error('Workflow must have at least one step');

      await WorkflowVersion.updateMany(
        { workflow_definition_id: wfDef._id, is_active: true },
        { $set: { is_active: false } }
      ).session(session);

      wfVer.is_active = true;
      wfVer.published_at = new Date();
      await wfVer.save({ session });

      cat.active_workflow_version_id = wfVer._id;
      await cat.save({ session });

      await session.commitTransaction();
      return { workflow_version_id: wfVer._id, is_active: true, category_id: cat._id };
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }
};
