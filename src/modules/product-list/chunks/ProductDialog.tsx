import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ReactNode, useState} from "react";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button.tsx";
import { ProductType } from "@/shared/types";
import api from "@/api";
import {useAppDispatch} from "@/store";
import {openLoader, hideLoader} from "@/store/features/loaderSlice.ts";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
    productName: z.string().min(3, "Name must be at least 3 characters long!"),
    stock: z.coerce.number().min(1, "Stock must be at least 1"),
    sellingPrice: z.coerce.number().min(1, "Selling price must be greater than 0"),
    profitPerItem: z.coerce.number().min(1, "Profit price must be greater than 0"),
  });

type ProductCreateUpdateDialogProps = {
    children: ReactNode,
    isEdit: boolean
    editProduct?: ProductType
}


const ProductCreateUpdateDialog = (
    {children, isEdit, editProduct}: ProductCreateUpdateDialogProps) => {

    const dispatch = useAppDispatch();

    const {mutate:addProduct} = api.product.addProduct.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({title: "Error", description: "Error while adding product", variant: "destructive"}),
        onSettled: () => {
            setIsDialogOpen(false);
            form.reset();
            dispatch(hideLoader())
            toast({ title: "Added", description: "Product has been successfully added", variant: "default", duration: 1000});
        },
    })

    const {mutate:updateProduct} = api.product.updateProduct.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({title: "Error", description: "Error while adding product", variant: "destructive"}),
        onSettled: () => {
            setIsDialogOpen(false);
            form.reset();
            dispatch(hideLoader())
            toast({ title: "Updated", description: "Product has been successfully updated", variant: "default",duration: 1000 });
        },
    })

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: isEdit ? editProduct?.productName: '',
            stock: isEdit ? editProduct?.stock:undefined,
            sellingPrice: isEdit ? editProduct?.sellingPrice: undefined,
            profitPerItem: isEdit? editProduct?.profitPerItem : undefined
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        if (isEdit && editProduct) {
            updateProduct(Object.assign(editProduct, values) as ProductType)
        } else {
            addProduct(values)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e)}>
            <DialogTrigger asChild={true}>
                {children}
            </DialogTrigger>
            <DialogContent className={'w-[95vw] sm:w-[400px] max-w-[400px]'}>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Product' : 'Create Product'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product's name..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter product's stock..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sellingPrice"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Selling Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter product's selling price..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profitPerItem"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Profit Per Item</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter product's profit..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className={'flex justify-between items-center mt-4 gap-3'}>
                            <Button className={'w-full'} type={'button'} variant={'destructive'}
                                    onClick={() => setIsDialogOpen(false)}> Close </Button>
                            <Button className={'w-full'} type={'submit'}>Save</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ProductCreateUpdateDialog;