"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import CONSTANT from "@/packages/helpers/src/constants";
import { Button } from "../../atoms/button";

const TransactionView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredTransactions = useMemo(() => {
    return CONSTANT.transactionData.filter((trx) => {
      const matchesSearch =
        trx.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || trx.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Failed":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-ghost-apple text-slate-700 border-slate-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 size={14} />;
      case "Pending":
        return <Clock size={14} />;
      case "Failed":
        return <AlertCircle size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-ghost-apple/70 p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="bg-ghost-apple p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
          <p className="text-slate-500 text-lg">
            Monitor and manage all your incoming and outgoing payments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-xl bg-ghost-apple text-slate-700 hover:bg-ghost-apple transition-colors text-sm font-medium">
            <Download size={16} /> Export CSV
          </Button>
          <Button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-tr from-apple-green via-primary to-kiwi text-white rounded-xl hover:bg-slate-800 transition-all text-sm font-medium">
            New Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-ghost-apple p-5 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Total Balance</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">$45,285.00</h3>
          <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs font-bold">
            <ArrowUpRight size={14} /> +12.5% from last month
          </div>
        </div>
        <div className="bg-ghost-apple p-5 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Total Income</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">$17,020.50</h3>
          <p className="text-slate-400 text-xs mt-2">Across 12 transactions</p>
        </div>
        <div className="bg-ghost-apple p-5 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Total Expenses</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">$3,124.25</h3>
          <div className="flex items-center gap-1 mt-2 text-rose-500 text-xs font-bold">
            <ArrowDownLeft size={14} /> +2.1% increase
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-ghost-apple rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 md:p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 bg-white">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search by ID, name or category..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-ghost-apple border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {["All", "Completed", "Pending", "Failed"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "primary" : "outline"}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1 w-48 rounded-full text-xs font-bold whitespace-nowrap transition-all border`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ghost-apple/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="hover:bg-ghost-apple/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          trx.amount > 0
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {trx.amount > 0 ? (
                          <ArrowUpRight size={18} />
                        ) : (
                          <ArrowDownLeft size={18} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {trx.entity}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {trx.id} • {trx.method}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                      {trx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {new Date(trx.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-bold ${
                        trx.amount > 0 ? "text-emerald-600" : "text-slate-900"
                      }`}
                    >
                      {trx.amount > 0 ? "+" : ""}
                      {trx.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${getStatusStyle(
                        trx.status
                      )}`}
                    >
                      {getStatusIcon(trx.status)}
                      {trx.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-ghost-apple rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-none hover:shadow-sm">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-ghost-apple rounded-full flex items-center justify-center text-slate-300 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No transactions found
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm mt-1">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="p-4 md:p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">
            Showing {filteredTransactions.length} of{" "}
            {CONSTANT.transactionData.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-ghost-apple disabled:opacity-50"
              disabled
            >
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold">
              1
            </button>
            <button className="px-3 py-1 hover:bg-ghost-apple rounded-lg text-xs font-bold text-slate-600">
              2
            </button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-ghost-apple">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionView;
