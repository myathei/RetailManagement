import { ColumnDef } from "@tanstack/react-table"
import type { SaleType } from "@/api/sale-report/type"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<SaleType>[] = [
    {
        accessorKey: "No",
        header: () => <div className="text-left">No</div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.index + 1}</div>
        },
    },
    {
        accessorKey: "productName",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },
    {
        accessorKey: "totalQuantity",
        header: () => <div className="text-left">Total Quantity</div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.getValue("totalQuantity")}</div>
        },
    },
    {
        accessorKey: "totalPrice",
        header: () => <div className="text-left">Total Price</div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.getValue("totalPrice")}</div>
        },
    },
    {
        accessorKey: "totalProfit",
        header: () => <div className="text-left">Total Profit</div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.getValue("totalProfit")}</div>
        },
    },
    {
      accessorKey: "saleDate",
      header: () => <div className="text-left">Sale Date</div>,
      cell: ({ row }) => {
          return <div className="text-left">{row.getValue("saleDate")}</div>
      },
  },
]

