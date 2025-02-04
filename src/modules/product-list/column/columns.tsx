import { ColumnDef } from "@tanstack/react-table";
import { ProductType } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ProductActions from "../chunks/ProductAction";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "No",
    header: () => <div className="text-left">No</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.index + 1}</div>;
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
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-left">Stock</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("stock")}</div>;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: () => <div className="text-left">Selling Price</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("sellingPrice")}</div>;
    },
  },
  {
    accessorKey: "Action",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const product = row.original as ProductType;
      return <ProductActions product={product} />;
    },
  },
];
