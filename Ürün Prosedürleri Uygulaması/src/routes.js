import ProductEntry from "./components/ProductEntry"
import ProductProcesses from "./components/ProductProcesses"
import ProductOut from "./components/ProductOut"

export const routes = [
    {path:'/user',component:ProductEntry},
    {path:'/',component:ProductProcesses},
    {path:'/ProductOut', component:ProductOut}
]

