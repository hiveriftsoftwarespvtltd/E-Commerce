import React from "react";

export default function Coupons() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1>Coupons & Discounts</h1>
            <p className="text-gray-600">Manage promotional coupons</p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus w-4 h-4 mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add Coupon
          </button>
        </div>

        {/* Card */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">Coupon Code</th>
                    <th className="text-left py-3 px-4 text-gray-600">Discount</th>
                    <th className="text-left py-3 px-4 text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-gray-600">Expiry Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Usage</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {/* Row Example — SUMMER30 */}
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded">SUMMER30</code>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-copy w-4 h-4"
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">30%</td>
                    <td className="py-3 px-4">Percentage</td>
                    <td className="py-3 px-4">2024-12-31</td>

                    <td className="py-3 px-4">
                      45 / 100
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center rounded-md bg-green-100 text-green-800 px-2 py-0.5 text-xs font-medium">
                        Active
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">

                        {/* Edit */}
                        <button className="hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                          </svg>
                        </button>

                        {/* Delete */}
                        <button className="hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 text-red-600"
                          >
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>

                      </div>
                    </td>
                  </tr>

                  {/* बाकी सभी rows भी ऐसे ही JSX में convert होकर मिलेंगे */}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
