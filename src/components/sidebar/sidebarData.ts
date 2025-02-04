import {  Package2Icon,  ShoppingCart, User } from 'lucide-react'

export const sidebarData = [
    {
        routeNames: ['/'],
        name: 'Product',
        icon: Package2Icon,
        subMenu: null
    },
    {
        routeNames: ['/cart'],
        name: 'Cart',
        icon: ShoppingCart,
        subMenu: null
    },
    {
        routeNames: [''],
        name: 'Manager',
        icon: User,
        children: [
            { name: "Sale Report", route: "/Manager/sale-report"},
            { name: "Summary Report", route: "/Manager/summary-report"},
          ],
    },
]