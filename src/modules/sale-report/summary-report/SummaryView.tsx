import { Table, TableHeader, TableCell, TableRow } from "@/components/ui/table";
import api from "@/api";

export const SummaryView = () => {
  const { data: SaleData } = api.saleReport.summaryReport.useQuery();

  return (
    <div className="flex items-top justify-center h-screen bg-gray-100">
      <div className="p-4 space-y-3">
        <h2 className="w-96 font-bold text-xl font-black text-center">
          Summary Report
        </h2>
        <div className="border rounded-md w-96 shadow-md">
          <Table className="table-auto border-collapse border rounded-md bg-teal-100">
            <TableHeader className="border-b">
              <TableRow>
                <TableCell className="font-bold border-r border-gray-300">
                  Total Quantity
                </TableCell>
                <TableCell>{SaleData?.totalQuantity || 0}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold border-r border-gray-300">
                  Total Revenue
                </TableCell>
                <TableCell>
                  {SaleData?.totalRevenue?.toFixed(2) || "0.00"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold border-r border-gray-300">
                  Total Profit
                </TableCell>
                <TableCell>
                  {SaleData?.totalProfit?.toFixed(2) || "0.00"}
                </TableCell>
              </TableRow>
              <TableRow className="font-bold">
                <TableCell className="font-bold border-r border-gray-300">
                  Grand Total
                </TableCell>
                <TableCell>
                  {(
                    (SaleData?.totalProfit || 0) + (SaleData?.totalRevenue || 0)
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
