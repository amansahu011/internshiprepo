// src/App.js
import React from "react";
import Navbar from "./components/Navbar";
import PricingTable from "./components/PricingTable";
import EnterpriseAdvance from "./components/EnterpriseAdvance";
import Footer from "./components/Footer";
 

function App() {
  return (
    <div className="min-h-screen bg-[#F4F7FE]">
      <Navbar />
      <PricingTable />
      <EnterpriseAdvance />
      <Footer/>
    </div>
  );
}

export default App;
