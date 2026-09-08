import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, BookOpen, GraduationCap, HelpCircle } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onOpenDictionary: () => void;
  onOpenLearn: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  onOpenDictionary,
  onOpenLearn,
  onOpenHelp,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-200/90 shadow-2xs sticky top-0 z-30">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: BRASLIBRAS Logo */}
        <div className="flex items-center gap-6">
          <Logo size="md" />
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <button
            className="h-full inline-flex items-center text-sm font-semibold text-[#356294] border-b-2 border-[#356294] px-1 cursor-pointer transition-colors"
          >
            Home
          </button>
          <button
            onClick={onOpenDictionary}
            className="h-full inline-flex items-center text-sm font-medium text-slate-600 hover:text-[#356294] border-b-2 border-transparent hover:border-slate-300 px-1 transition-colors cursor-pointer"
          >
            Dicionário
          </button>
          <button
            onClick={onOpenLearn}
            className="h-full inline-flex items-center text-sm font-medium text-slate-600 hover:text-[#356294] border-b-2 border-transparent hover:border-slate-300 px-1 transition-colors cursor-pointer"
          >
            Aprender
          </button>
          <button
            onClick={onOpenHelp}
            className="h-full inline-flex items-center text-sm font-medium text-slate-600 hover:text-[#356294] border-b-2 border-transparent hover:border-slate-300 px-1 transition-colors cursor-pointer"
          >
            Ajuda
          </button>
        </nav>

        {/* Right: User Profile Chip */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-100 group-hover:ring-[#356294]/30 transition-all">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left hidden sm:block">
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 leading-none">
                  Perfil
                </span>
                <span className="block text-xs font-bold text-slate-800 leading-tight">
                  {user.name}
                </span>
              </div>

              <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-fadeIn">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-800">{user.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenDictionary();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>Dicionário Libras</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenLearn();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    <span>Guia de Aprendizado</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenHelp();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span>Ajuda & Suporte</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sair da Conta (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
