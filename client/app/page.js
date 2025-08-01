import Link from "next/link";
import TableData from "@/components/tabledata";
import { Suspense } from "react";
import NavBar from "@/components/navbar"
import Menu from "@/components/menu"
  
export default function Home() {
  return (
    <div>
       <NavBar/>
  <div className="w-screen py-5 flex justify-center flex-col items-center">
    <div className="flex items-center justify-between gap-1 mb-5">
    </div>    
    <div className="overflow-x-auto">
          <Menu/>
    </div>  
  </div>
    </div>
); 
}
