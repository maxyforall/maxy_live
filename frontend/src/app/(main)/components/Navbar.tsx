"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../providers/UserProvider";


export default function Navbar() {
    const [showNav, setShowNav] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);

    // Use the user context instead of local state
    const { user, setUser } = useUser();
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if we're at the top
            setIsAtTop(currentScrollY < 50);

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                // Scrolling down
                setShowNav(false);
            } else {
                // Scrolling up
                setShowNav(true);
            }

            setLastScrollY(currentScrollY);
        };

        // Close user menu when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest('.user-menu-container')) {
                setUserMenuOpen(false);
            }
        };

        // Prevent body scroll when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [lastScrollY, mobileMenuOpen]);



    const handleLogout = () => {
        // Use the comprehensive logout utility with refreshUserState
        const { refreshUserState } = useUser();
        import('../utils/auth').then(({ logoutUser }) => {
            logoutUser(setUser, '/sign-in', refreshUserState);
            setUserMenuOpen(false);
            setMobileMenuOpen(false); // Close mobile menu after logout
        });
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Function to close both menus when clicking on links
    const closeAllMenus = () => {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`px-6 py-3 fixed w-full z-50 transition-all duration-300
                    ${showNav ? "translate-y-0" : "-translate-y-full"}
                    ${isAtTop ? "bg-transparent" : "bg-[#0a0a0a] backdrop-blur-md"}
                `}
                style={isAtTop ? { background: "none", boxShadow: "none", border: "none" } : {}}
            >
                <div className="flex items-center justify-between max-w-9xl mx-auto w-full">
                    {/* Left - Logo */}
                    <div className="flex items-center flex-1 justify-start">

                        <Link href="/" className="cursor-pointer" onClick={closeAllMenus}>
                            <Image
                                src="/brand/maxy_W.png"
                                alt="Maxy Logo"
                                width={90}   // mobile size
                                height={16}
                                priority
                                className="w-[50px] h-auto md:w-[70px] md:h-auto"
                            />

                        </Link>
                    </div>

                    {/* Center - Nav Links (Hidden on mobile) */}
                    <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-base text-[#f7f7f7] px-5">
                        <Link href="/productivity" className="hover:opacity-80 cursor-pointer" onClick={closeAllMenus}>Productivity</Link>
                        <Link href="/lifestyle" className="hover:opacity-80 cursor-pointer" onClick={closeAllMenus}>Lifestyle</Link>
                        {/* <Link href="/corex" className="hover:opacity-80 cursor-pointer" onClick={closeAllMenus}>Corex</Link>
                        <Link href="/woc" className="hover:opacity-80 cursor-pointer" onClick={closeAllMenus}>WoC</Link> */}
                    </div>

                    {/* Right - About, Connect & User (Hidden on mobile) */}
                    <div className="hidden md:flex items-center flex-1 justify-end gap-4 text-base text-[#f7f7f7]">
                        <Link href="/about" className="hover:opacity-80 cursor-pointer" onClick={closeAllMenus}>About</Link>
                        <Link href="/support" className="hover:opacity-80 cursor-pointer" onClick={closeAllMenus}>Support</Link>
                        {/* <Link href="/contact" className="px-3 py-1.4 border-[0.1px] cursor-pointer rounded-[30px] hover:bg-white hover:text-black transition" onClick={closeAllMenus}>
                            Connect
                        </Link> */}

                        {/* User Menu Container */}
                        <div className="relative user-menu-container">
                            <button
                                onClick={toggleUserMenu}
                                className={`mt-2 cursor-pointer transition-all duration-200 transform  ${userMenuOpen ? 'scale-105 opacity-90' : 'hover:opacity-80'
                                    }`}
                            >
                                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 min-w-[16px] min-h-[16px]">
                                    <Image
                                        src="/account/user_maxy.png"
                                        alt="User"
                                        fill
                                        className="object-contain rounded-full"
                                    />
                                </div>
                            </button>

                            {/* User Dropdown Menu with Enhanced Animations */}
                            <div className={`absolute right-0 top-full mt-3 w-80 bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#151515] 
                                border border-gray-600/50 rounded-xl shadow-3xl backdrop-blur-sm overflow-hidden
                                transition-all duration-300 ease-out transform origin-top-right
                                ${userMenuOpen
                                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                {user ? (
                                    // Logged in user menu
                                    <div className="animate-fadeIn">
                                        {/* User Info Header */}
                                        <div className="px-6 py-4 bg-gradient-to-r  from-gray-800/30 to-gray-700/20 border-b border-gray-600/30">
                                            <div className="flex items-center gap-4">
                                                <div className="relative rounded-2xl bg-[#2a2a2a] p-2">
                                                    {(user.firstName[0] + user.lastName[0]).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-semibold text-lg truncate">{user.firstName + ' ' + user.lastName}</p>
                                                    <p className="text-gray-300 text-sm truncate">{'@' + user.maxy_id}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-3">
                                            <Link
                                                href="/account"
                                                onClick={closeAllMenus}
                                                className="flex items-center gap-4 px-6 py-3 text-white hover:bg-gray-700/40 transition-all duration-200 group"
                                            >
                                                <div className="w-8 h-8 bg-gray-600/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                                                    <Image src="/account/profile_maxy.png" alt="Account" width={18} height={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="font-medium">Account</span>
                                                    <p className="text-gray-400 text-xs">Manage Maxy account</p>
                                                </div>
                                            </Link>

                                            {/* Sign Out button removed and moved to Account settings page */}
                                        </div>
                                    </div>
                                ) : (
                                    // Not logged in menu
                                    <div className="py-4 animate-fadeIn">
                                        <div className="px-6 py-3 border-b border-gray-600/30">
                                            <div className="flex items-center gap-6">
                                                {/* Maxy Logo */}
                                                <img
                                                    src="/brand/W_logo.png"
                                                    alt="Maxy Logo"
                                                    className="h-9 w-9 object-contain"
                                                />

                                                {/* Welcome Text */}
                                                <div>
                                                    <h6 className="text-white font-semibold text-lg">Welcome to Maxy</h6>
                                                    <p className="text-gray-400 text-sm">Sign in to access your account</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-3 space-y-1">
                                            <Link
                                                href="/sign-up"
                                                onClick={closeAllMenus}
                                                className="flex items-center gap-4 px-6 py-3 text-white hover:bg-blue-500/10 transition-all duration-200 group"
                                            >
                                                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-200">
                                                    <Image src="/account/register_maxy.png" alt="Register" width={18} height={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="font-medium">Create Account</span>
                                                    <p className="text-gray-400 text-xs">Join the community</p>
                                                </div>
                                            </Link>

                                            {/* Line ~420 - Remove incorrect onClick handler */}
                                            <Link
                                                href="/sign-in"
                                                onClick={closeAllMenus}  // Only close menu, don't call handleLogin
                                                className="flex items-center justify-start gap-4 px-6 py-3 bg-green-500/10 hover:bg-green-500/30 transition-colors duration-200 w-full"
                                            >
                                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-200">
                                                    <Image src="/account/login_maxy.png" alt="Login" width={18} height={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="font-medium">Sign In</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hamburger Icon - Visible on Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative z-50 cursor-pointer"
                        >
                            {mobileMenuOpen ? (
                                <Image src="/generalicons/close.svg" alt="Close Menu" width={28} height={28} />
                            ) : (
                                <Image src="/generalicons/menu.svg" alt="Open Menu" width={28} height={28} />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Full Screen Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-[#0a0a0a] text-white z-40 transition-all duration-300 ease-in-out ${mobileMenuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
            >
                {/* Backdrop (only visible when menu is open) */}
                {mobileMenuOpen && (
                    <div
                        onClick={closeMobileMenu}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
                    />
                )}

                {/* Mobile Menu - Right Side Drawer */}
                <div
                    className={`md:hidden fixed inset-0 w-full 
    bg-[#0a0a0a]/70 backdrop-blur-lg text-white z-40 
    transition-transform duration-300 ease-in-out
    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
  `}
                >

                    {/* Menu Content Container */}
                    <div className="flex flex-col h-full pt-20 px-8">
                        {/* Main Navigation Links */}
                        <div className="flex-1 flex flex-col justify-center space-y-8">
                            <div className="space-y-6">
                                <Link
                                    href="/productivity"
                                    onClick={closeAllMenus}
                                    className="block text-lg font-medium hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-2"
                                >
                                    Productivity
                                </Link>
                                <Link
                                    href="/lifestyle"
                                    onClick={closeAllMenus}
                                    className="block text-lg font-medium hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-2"
                                >
                                    Lifestyle
                                </Link>
                                {/* <Link
                                    href="/corex"
                                    onClick={closeAllMenus}
                                    className="block text-lg font-medium hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-2"
                                >
                                    Corex
                                </Link>
                                <Link
                                    href="/woc"
                                    onClick={closeAllMenus}
                                    className="block text-lg font-medium hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-2"
                                >
                                    WoC
                                </Link> */}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-700/50 mb-6 mt-4"></div>

                            {/* Secondary Links */}
                            <div className="space-y-4 mb-4">
                                <Link
                                    href="/about"
                                    onClick={closeAllMenus}
                                    className="block text-lg hover:text-gray-300 transition-colors duration-200"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/support"
                                    onClick={closeAllMenus}
                                    className="block text-lg hover:text-gray-300 transition-colors duration-200"
                                >
                                    Support
                                </Link>
                            </div>
                        </div>

                        {/* User Section at Bottom */}
                        <div className="pb-16">
                            <div className="border-t border-gray-700/50 pt-6">
                                {user ? (
                                    // Logged in user section
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl">
                                            {user.avatar ? (
                                                <Image
                                                    src={user.avatar}
                                                    alt="User Avatar"
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full ring-2 ring-gray-500/30"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2a2a2a] text-white font-semibold text-lg ring-2 ring-gray-500/30">
                                                    {(user.firstName[0] + user.lastName[0]).toUpperCase()}
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <p className="text-white font-semibold text-lg">{user.firstName + ' ' + user.lastName}</p>
                                                <p className="text-gray-400 text-sm">{'@' + user.maxy_id}</p>
                                            </div>
                                        </div>


                                        <div className="space-y-2">
                                            <Link
                                                href="/account"
                                                onClick={closeAllMenus}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/40 transition-colors duration-200"
                                            >
                                                <Image src="/account/profile_maxy.png" alt="Account" width={20} height={20} />
                                                <span className="text-lg">Account</span>
                                            </Link>
                                            {/* Sign Out button removed and moved to Account settings page */}
                                        </div>
                                    </div>
                                ) : (
                                    // Not logged in section
                                    <div className="space-y-4">
                                        <div className="text-center mb-6">
                                            <h5 className="text-white font-semibold text-2xl mb-2">Welcome to Maxy</h5>
                                            <p className="text-gray-400">Sign in to access your account</p>
                                        </div>

                                        <div className="space-y-3">
                                            <Link
                                                href="/sign-up"
                                                onClick={closeAllMenus}
                                                className="w-3/4 mx-auto flex items-center justify-center gap-3 p-4 
           rounded-full transition-colors duration-200 bg-blue-500/20 
           hover:bg-blue-500/30"

                                            >
                                                <Image src="/account/register_maxy.png" alt="Register" width={20} height={20} />
                                                <span className="text-lg font-medium">Create Account</span>
                                            </Link>

                                            <Link
                                                href="/sign-in"
                                                className="w-3/4 mx-auto flex items-center justify-center gap-3 p-4 
           rounded-full transition-colors duration-200 bg-green-500/20 
           hover:bg-green-500/30"


                                            >
                                                <Image src="/account/login_maxy.png" alt="Login" width={20} height={20} />
                                                <span className="text-lg font-medium">Sign In</span>
                                            </Link>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
}