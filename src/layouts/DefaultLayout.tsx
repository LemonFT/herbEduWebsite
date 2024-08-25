import { ReactNode } from "react";

interface TypeProps {
    children: ReactNode;  
}
const DefaultLayout = ({children}: Readonly<TypeProps>) => {
    return ( <div className="flex justify-start w-full h-full">
        <div className="container flex-1 h-full">
            {children}
        </div>
    </div> );
}

export default DefaultLayout;