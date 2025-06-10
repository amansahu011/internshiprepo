import React from 'react';
import './PricingTable.css';

const plans = ['Free', 'Trial', 'Basic', 'Pro', 'Max'];

const PricingTable = () => {
  const features = [
    "Employee limit", "Storage (docs + selfies)", "Activity Audit", "Assign Responsibilities",
    "Admin & user portals, Android app", "Attendance – selfie, geo", "Attendance Regularization",
    "Manual punch override", "Late / absent dashboard", "Organizational Hierarchy",
    "Leave & Holiday", "Customized Leaves for employee level", "Customized working hours /employee",
    "Payroll run", "Custom salary only", "Statutory payroll (PF/ESI/TDS)", "Payslip PDF",
    "Incentive request / history", "Arrear Management", "Scheduling – shifts, set work hours",
    "Customized Dashboard Tiles", "Overtime & short-leave", "Overtime – OT apply & log",
    "TA / Reimburse + GPS calc", "Offline and Online Sync", "Meeting & Field tracking",
    "Multi-branch", "Loan ledger & auto-deduct", "Documents – Offer / Appointment / Confirmation / Policy",
    "On-boarding checklist", "Gate pass / Gate log", "Targets module", "CRM & IMS user sync",
    "Reports (std)", "Reports (advanced, export)", "Export Reports", "Events Notifications",
    "Live Feed", "Announcement", "Termination", "Support Sla"
  ];

  const sampleData = (plan) =>
    features.map((feature, i) => (
      <div key={i} className="cell">{
        i === 0 ? '10' :
        i === 1 ? '100 MB' :
        i === 5 ? '✔' :
        i === 6 ? 'Punch in button' :
        '—'
      }</div>
    ));

  return (
    <div className="pricing-table">
      <div className="column label-column">
        <div className="cell header"></div>
        <div className="cell header"></div>
        <div className="cell header"></div>
        {features.map((label, index) => (
          <div key={index} className="cell">{label}</div>
        ))}
      </div>

      {plans.map((plan, index) => (
        <div className="column" key={index}>
          <div className="cell header">
            {plan}
            <br />
            <button className="buy-button">Buy now</button>
          </div>
          {sampleData(plan)}
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
