"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import axios from "axios";
import FinancialChart from "./financialChart";

export default function Fetcher() {
  // API key has a cap of 25 uses a day
  const apiKey = "2N29VI95Y8ZCFIIJ"; // Your API Key
  const [symbol, setSymbol] = useState(""); // Example stock symbol
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state to handle UI feedback

  useEffect(() => {
    if (!symbol) return; // Prevent fetching if symbol is not set

    // Function to fetch financial data
    const fetchData = async () => {
      setLoading(true); // Start loading

      //   To pull data from an api and search bar un-comment the two const below
      //   and comment out the example data const

      //   const incomeStatementUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`;
      //   const balanceSheetUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`;

      //  example demo Income Statement data and Balance Sheet data
      const incomeStatementUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo`;
      const balanceSheetUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo`;

      try {
        // Fetching income statement data
        const [incomeRes, balanceRes] = await Promise.all([
          axios.get(incomeStatementUrl),
          axios.get(balanceSheetUrl),
        ]);
        console.log(incomeRes);

        // Data structure based on Alpha Vantage's documentation
        const incomeData = incomeRes.data.quarterlyReports;
        const balanceData = balanceRes.data.quarterlyReports;

        // Process and merge data
        const chartData = incomeData.map((incomeReport) => {
          const balanceReport = balanceData.find(
            (report) =>
              report.fiscalDateEnding === incomeReport.fiscalDateEnding
          );
          return {
            date: incomeReport.fiscalDateEnding,
            netIncome: parseFloat(incomeReport.netIncome),
            totalRevenue: parseFloat(incomeReport.totalRevenue),
            shareholderEquity: balanceReport
              ? parseFloat(balanceReport.totalShareholderEquity)
              : null,
          };
        });

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; // Allows for error handling in the component
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchData();
  }, [symbol, apiKey]); // This will re-fetch when the symbol changes

  return (
    <div className="App w-full flex flex-col items-center justify-center">
      <input
        className="text-center mt-4"
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter Stock Symbol"
      />
      <div className="my-4">
        {loading ? (
          <p>Loading data...</p>
        ) : Array.isArray(data) && data.length > 0 ? (
          <FinancialChart data={data} />
        ) : (
          <p>Please enter a valid stock symbol.</p>
        )}
      </div>
    </div>
  );
}
