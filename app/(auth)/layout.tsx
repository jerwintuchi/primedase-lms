import "../globals.css";
import MainNav from "../landing/mainnav";

const AuthLayout = ({ children } : { children : React.ReactNode}) => {
    
    return ( 
    <>
    <MainNav/>
        <div className="h-full flex items-center justify-center bg-yellow-300">
            {children}
        </div> 
    </>
        
    
    );
}
 
export default AuthLayout;