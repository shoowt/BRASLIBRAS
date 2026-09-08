import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../types';

interface AuthCardProps {
  onLogin: (user: User) => void;
  initialMode?: 'login' | 'register';
  isModal?: boolean;
  onClose?: () => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  onLogin,
  initialMode = 'login',
  isModal = false,
  onClose,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Sem validação bloqueante para apresentação em aula:
  // Se o usuário digitar algo, usa os dados digitados.
  // Se deixar em branco e clicar em Entrar ou Cadastrar, entra direto com Mariana Silva!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalName = name.trim() || 'Mariana Silva';
    const finalEmail = email.trim() || 'mariana.silva@librasflow.com';

    onLogin({
      name: finalName,
      email: finalEmail,
      avatarUrl: '/interpreter.jpg',
    });
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[380px] bg-white rounded-2xl shadow-[0_15px_45px_-10px_rgba(0,0,0,0.1)] border border-slate-200/90 px-8 py-9 sm:py-10 flex flex-col items-center relative transition-all duration-300">
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          ✕
        </button>
      )}

      {/* Brand Logo Header matching reference */}
      <div className="mb-7 flex flex-col items-center">
        <Logo size="lg" className="mb-1" />
      </div>

      {/* Heading matching reference */}
      <h2 className="text-[22px] sm:text-[23px] font-semibold text-slate-800 text-center tracking-tight mb-7">
        {mode === 'login' ? 'Acesse sua Conta' : 'Crie sua Conta'}
      </h2>

      {/* Main Form - No blocking validation, just instant seamless submit */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Mariana Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#356294] focus:ring-2 focus:ring-[#356294]/20 transition-all shadow-2xs placeholder:text-slate-400"
            />
          </div>
        )}

        {/* E-mail Field */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            E-mail
          </label>
          <input
            type="text"
            placeholder="mariana.silva@librasflow.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-3.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#356294] focus:ring-2 focus:ring-[#356294]/20 transition-all shadow-2xs placeholder:text-slate-400"
          />
        </div>

        {/* Senha Field */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3.5 pr-10 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#356294] focus:ring-2 focus:ring-[#356294]/20 transition-all shadow-2xs placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 stroke-[1.8]" />
              ) : (
                <Eye className="w-4 h-4 stroke-[1.8]" />
              )}
            </button>
          </div>
        </div>

        {mode === 'register' && (
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Confirmar Senha
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-11 px-3.5 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#356294] focus:ring-2 focus:ring-[#356294]/20 transition-all shadow-2xs placeholder:text-slate-400"
            />
          </div>
        )}

        {/* Submit Button: Clicar aqui entra instantaneamente */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-11 px-4 bg-[#356294] hover:bg-[#2b517a] active:bg-[#203c5b] text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{mode === 'login' ? 'Entrar' : 'Cadastrar'}</span>
            <ArrowRight className="w-4 h-4 opacity-80" />
          </button>
        </div>
      </form>

      {/* Auxiliary Links matching reference */}
      <div className="mt-5 w-full flex flex-col items-center gap-2 text-center text-xs">
        {mode === 'login' ? (
          <>
            <button
              type="button"
              onClick={() => setMode('register')}
              className="text-[#356294] hover:text-[#203c5b] font-medium transition-colors cursor-pointer"
            >
              Registrar-se
            </button>
            <button
              type="button"
              onClick={() => setForgotModal(true)}
              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              Esqueci minha senha
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setMode('login')}
            className="text-[#356294] hover:text-[#203c5b] font-medium transition-colors cursor-pointer"
          >
            Já tem uma conta? Entrar
          </button>
        )}
      </div>

      {/* Modal Esqueci Minha Senha */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center border border-slate-100 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-800 mb-2">Recuperar Senha</h3>
            <p className="text-xs text-slate-600 mb-4">
              Informe seu e-mail cadastrado para enviarmos um link de redefinição imediato.
            </p>
            {forgotSent ? (
              <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-lg border border-emerald-200 mb-4">
                ✓ Enviamos as instruções para o seu e-mail!
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <input
                  type="email"
                  placeholder="mariana.silva@librasflow.com"
                  value={forgotEmail || 'mariana.silva@librasflow.com'}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#356294]"
                />
                <button
                  onClick={() => setForgotSent(true)}
                  className="w-full h-10 bg-[#356294] hover:bg-[#2b517a] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Enviar Link de Recuperação
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setForgotModal(false);
                setForgotSent(false);
              }}
              className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
