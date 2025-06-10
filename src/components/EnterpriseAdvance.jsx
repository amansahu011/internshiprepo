// src/components/EnterpriseAdvanced.js
import React from "react";
import "./advance.css"; // Make sure this CSS file is in the same folder or update the path

function EnterpriseAdvanced() {
  return (
    <section className="enterprise-section">
      <div className="left-box">
        <span className="tag">NOW AVAILABLE</span>
        <h1>Enterprise Advanced</h1>
        <p>
          AI-powered workflows, automation, and agents to transform your
          business
        </p>
        <div className="buttons">
          <a href="#" className="btn learn">
            Learn more
          </a>
          <a href="#" className="btn contact">
            Contact us
          </a>
        </div>
      </div>

      <div className="right-box">
        <ul>
          <li>
            <strong>Unlimited intelligent, no-code apps</strong> with custom dashboards
          </li>
          <li>Connected forms for business processes</li>
          <li>Automated document generation*</li>
          <li>Customized AI agents for specific business needs</li>
          <li>AI-powered metadata extraction*</li>
          <li>Higher API allowances</li>
          <li>Large file uploads up to 500GB</li>
          <li>Compliant long-term data preservation</li>
          <li>
            <em>All Enterprise Plus capabilities included</em>
          </li>
        </ul>
        <p className="note">
          *Additional volume available for purchase.
          <br />
          Box Archive estimated release in Q1 2025.
        </p>
      </div>
    </section>
  );
}

export default EnterpriseAdvanced;
