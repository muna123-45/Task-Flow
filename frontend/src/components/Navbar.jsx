import { CheckSquare } from "lucide-react";
import {Link} from "react-router-dom";

function Navbar(){
    return (
        <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
            {/* logo */}
            <Link to="/" className="flex items-center gap-2">
                <div className="rounded-lg bg-violet-600 p-2 text-white">
                    <CheckSquare size={24}/>
                </div>
                <span className="text-2xl font-bold text-slate-900">
                    Task<span className="text-violet-600">Flow</span>
                </span>
            </Link>

            {/* Navigation Link */}
            <div className="hidden items-center gap-8 md:flex">
                <Link to="/" className="text-sm font-medium text-slate-600 hover:text-violet-600">Home</Link>
                <a href="#features" className="text-sm font-medium text-slate-600 hover:text-violet-600">Features</a>
                <a href="#about" className="text-sm font-medium text-slate-600 hover:text-violet-600">About</a>
            </div>

            {/* Authenication buttons */}
            <div className="flex items-center gap-3">
                <Link to="/login" className="rounded-lg px-4 py-2 font-medium text-slate-700 transition hover:bg-violet-300">Login</Link>
                <Link to="/register" className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-700">Register</Link>
            </div>
        </nav>
        
    );
}
export default Navbar;