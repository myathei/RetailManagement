import { ReactNode, useState } from "react";
import { ProductType } from "@/shared/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { hideLoader, openLoader } from "@/store/features/loaderSlice.ts";
import { useToast } from "@/hooks/use-toast.ts";
import api from "@/api";

type CompleteProductProps = {
  children: ReactNode;
  product: ProductType;
};

const CompleteProduct = ({ children, product }: CompleteProductProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✅ API mutation for deleting a product
  const { mutate: deleteProduct } = api.product.deleteProduct.useMutation({
    onMutate: () => dispatch(openLoader()),
    onError: () =>
      toast({ title: "Error", description: "Error while deleting product", variant: "destructive" }),
    onSettled: () => {
      setIsDialogOpen(false);
      dispatch(hideLoader());
      toast({ title: "Deleted", description: "Product has been successfully deleted", variant: "default" });
    },
  });

  // ✅ Handle action based on `isDelete` flag
  const handleAction = () => {
    deleteProduct({ productID: product.productID });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-[400px] max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            Delete Product
            </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p className="text-sm">
            Are you sure you want to delete this product?
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <Button className="w-full" onClick={handleAction} variant={"destructive"}>
              Delete
            </Button>
            <Button className="w-full" onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

};

export default CompleteProduct;
