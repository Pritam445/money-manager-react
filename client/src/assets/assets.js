import { Coins, Filter, FunnelPlus, LayoutDashboard, List, Wallet } from 'lucide-react';
import logo from '../assets/favicon.ico';
import login_bg from '../assets/loginbg.jpg'

export const assets = {
    logo,
    login_bg
}

export const SIDEBAR_DATA = [
    {
        id:"01",
        label:"Dashboard",
        path:"/dashboard",
        icon: LayoutDashboard
    },
    {
        id:"02",
        label:"Income",
        path:"/income",
        icon: Wallet
    },
    {
        id:"03",
        label:"Expense",
        path:"/expense",
        icon: Coins
    },
    {
        id:"04",
        label:"Category",
        path:"/category",
        icon: List
    },
    {
        id:"05",
        label:"Filter",
        path:"/filter",
        icon: FunnelPlus
    }
]