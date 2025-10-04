// src/models/enums.js
module.exports = {
  Roles: Object.freeze({ Admin: 'Admin', Manager: 'Manager', Employee: 'Employee' }),
  ExpenseStatus: Object.freeze({ Draft: 'Draft', Pending: 'Pending', Approved: 'Approved', Rejected: 'Rejected' }),
  InstanceState: Object.freeze({ Open: 'Open', Approved: 'Approved', Rejected: 'Rejected' }),
  StepState: Object.freeze({ Open: 'Open', Approved: 'Approved', Rejected: 'Rejected' }),
  RuleType: Object.freeze({ Single: 'Single', Percentage: 'Percentage', Specific: 'Specific', Hybrid: 'Hybrid' })
};
