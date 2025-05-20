import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ChevronDown, Menu, X, Home, ClipboardList, Info, UserIcon, LogOut, History, UserCircle} from "lucide-react"
import {Button} from "./ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./ui/dropdown-menu";
import {cn} from "../lib/utils";
import {useMainContext} from "../context/MainContext";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const {user, setUser} = useMainContext();

    return (
        <nav className="bg-background border-b sticky top-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex  h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className={"h-[36px] flex justify-center items-center"}>
                                <img className={"h-full scale-down"} alt={"logo"} src={"/assets/logo.png"}/>
                                <span className={"text-xl font-bold"}>ERGONOMIA</span>
                            </div>
                        </Link>
                    </div>
                    
                    <span className={"flex-grow"}></span>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Link
                            to="/"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                        >
                            <Home className="mr-2 h-4 w-4"/>
                            Home
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    <ClipboardList className="mr-2 h-4 w-4"/>
                                    Evaluations
                                    <ChevronDown className="ml-1 h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                <DropdownMenuItem asChild>
                                    <Link to="/evaluations/owas" className="w-full">
                                        OWAS
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link
                            to="/about"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                        >
                            <Info className="mr-2 h-4 w-4"/>
                            About
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    <UserIcon className="mr-2 h-4 w-4"/>
                                    {/* User Profile */}
                                    {user ? user.email : "User"}
                                    {/* Dropdown arrow */}
                                    <ChevronDown className="ml-1 h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {user && (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link to="/user/profile" className="w-full flex items-center">
                                                <UserCircle className="mr-2 h-4 w-4"/>
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/user/history" className="w-full flex items-center">
                                                <History className="mr-2 h-4 w-4"/>
                                                Evaluation History
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center text-destructive"
                                                          onClick={() => {
                                                              // Handle logout logic here
                                                              console.log("Logout clicked");
                                                              // clear user session or redirect to login page
                                                              window.location.href = '/Home'; // Redirect to login page
                                                              sessionStorage.removeItem("user");
                                                              sessionStorage.removeItem("token");
                                                              setUser(null);
                                                          }}>
                                            <LogOut className="mr-2 h-4 w-4"/>
                                            Logout
                                        </DropdownMenuItem>
                                    </>
                                )}
                                {!user && (
                                    <DropdownMenuItem asChild>
                                        <Link to="/signin" className="w-full flex items-center">
                                            <UserCircle className="mr-2 h-4 w-4"/>
                                            Sign In
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                            {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Home className="mr-2 h-4 w-4"/>
                        Home
                    </Link>

                    <div className="space-y-1 pl-3">
                        <div className="flex items-center px-3 py-2 text-sm font-medium">
                            <ClipboardList className="mr-2 h-4 w-4"/>
                            Evaluations
                        </div>
                        <Link
                            to="/evaluations/owas"
                            className="block pl-8 pr-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            OWAS
                        </Link>
                        <Link
                            to="/evaluations/rula"
                            className="block pl-8 pr-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            RULA
                        </Link>
                        <Link
                            to="/evaluations/reba"
                            className="block pl-8 pr-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            REBA
                        </Link>
                    </div>

                    <Link
                        to="/about"
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Info className="mr-2 h-4 w-4"/>
                        About
                    </Link>

                    <div className="space-y-1 pl-3">
                        <div className="flex items-center px-3 py-2 text-sm font-medium">
                            <UserIcon className="mr-2 h-4 w-4"/>
                            {/* User Profile */}
                            {user ? user.email : "User"}
                        </div>
                        {user && (
                            <>
                                <Link
                                    to="/user/profile"
                                    className="flex items-center pl-8 pr-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <UserCircle className="mr-2 h-4 w-4"/>
                                    Profile
                                </Link>
                                <Link
                                    to="/user/history"
                                    className="flex items-center pl-8 pr-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <History className="mr-2 h-4 w-4"/>
                                    Evaluation History
                                </Link>
                                <Link
                                    to="/"
                                    className="flex items-center pl-8 pr-3 py-2 text-destructive rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => {
                                        // Handle logout logic here
                                        console.log("Logout clicked");
                                        // clear user session or redirect to login page
                                        window.location.href = '/Home'; // Redirect to login page
                                        sessionStorage.removeItem("user");
                                        sessionStorage.removeItem("token");
                                        setUser(null);
                                    }}
                                >
                                    <LogOut className="mr-2 h-4 w-4"/>
                                    Logout
                                </Link>
                            </>
                        )}
                        {!user && (
                            <Link
                                to="/signin"
                                className="flex items-center pl-8 pr-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <UserCircle className="mr-2 h-4 w-4"/>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;






