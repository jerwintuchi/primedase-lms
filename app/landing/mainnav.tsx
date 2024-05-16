import { Button } from "@/components/ui/button";
import Link from 'next/link';

const MainNav = () => {
    return (
        <nav className="bg-purple-700 text-white p-4 sticky top-0 z-50">
            <div className="flex justify-start">
                <Link href="/landing">
                        <Button variant="ghost" className='hover:bg-purple-500 '>
                            Home
                        </Button>
                </Link>
                <Link href="/landing/about">
                        <Button variant="ghost" className='hover:bg-purple-500 '>
                            About
                        </Button>
                </Link>
                
                <Link href="/sign-in">
                        <Button variant="ghost" className='hover:bg-purple-500 '>
                            Sign In
                        </Button>
                </Link>
            </div>
        </nav>
    );
}

export default MainNav;