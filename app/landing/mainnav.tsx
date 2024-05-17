"use client";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

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
                
                <NavigationMenu>
                    <NavigationMenuList className="bg-purple-700">
                        <NavigationMenuItem className="bg-purple-700">
                                <NavigationMenuTrigger className="bg-purple-700 hover:bg-purple-500">
                                    Sign In
                                </NavigationMenuTrigger> 
                                <NavigationMenuContent className="bg-purple-700 border-purple-700">
                                <NavigationMenuLink>
                                    <Link href="/teacher-sign-up">
                                        <Button  className=" bg-yellow-400 hover:bg-yellow-300 hover:text-white">
                                            For Teachers
                                        </Button>
                                    </Link>
                                    <Link href="/sign-in">
                                    <Button  className="bg-purple-700 hover:bg-purple-500 hover:text-white">
                                        For Students
                                    </Button>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>    
            </NavigationMenu>
            </div>
        </nav>
    );
}

export default MainNav;