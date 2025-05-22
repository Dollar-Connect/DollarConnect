import { Children } from "react";
import Navbar from "./navbar";

const Layout = (Children) =>{
  return <div className='min-h-screen bg-base-100'>
    <Navbar/>
    <main>
      {Children}
    </main>
  </div>;
};
export default Layout;