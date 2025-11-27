import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Section */}
                    <div>
                        <h3 className="text-xl font-bold font-display mb-4">LocalPro Finder</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Anti-Discrimination Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Impact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* For Customers */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">For Customers</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">UC Reviews</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Categories Near You</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* For Partners */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">For Partners</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Register as a Professional</a></li>
                        </ul>
                    </div>

                    {/* Social & Apps */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Social Links</h3>
                        <div className="flex gap-4 mb-6">
                             {/* Mock Social Icons */}
                             <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-secondary transition-colors">t</div>
                             <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-secondary transition-colors">f</div>
                             <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-secondary transition-colors">in</div>
                             <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-secondary transition-colors">ig</div>
                        </div>
                        <h3 className="text-sm font-bold mb-2">Download App</h3>
                         <div className="flex flex-col gap-2">
                            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs flex items-center gap-2 border border-gray-600">
                                <span>Get it on</span> <span className="font-bold text-sm">Google Play</span>
                            </button>
                            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs flex items-center gap-2 border border-gray-600">
                                <span>Download on the</span> <span className="font-bold text-sm">App Store</span>
                            </button>
                         </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
                    © 2024 LocalPro Finder Technologies India Pvt. Ltd.
                </div>
            </div>
        </footer>
    );
};

export default Footer;