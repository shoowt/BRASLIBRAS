import React, { useState } from 'react';
import { MessageSquare, Send, Volume2, Video, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'client_libras' | 'attendant';
  text: string;
  time: string;
  confidence?: number;
  signGloss?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'attendant',
    text: 'Olá! Bom dia, bem-vindo ao atendimento. Em que posso ajudar você?',
    time: '10:02',
  },
  {
    id: '2',
    sender: 'client_libras',
    text: 'Bom dia! Gostaria de consultar a segunda via do meu boleto.',
    time: '10:03',
    confidence: 96,
    signGloss: 'BOM-DIA / BOLETO / SEGUNDA-VIA / CONSULTAR',
  },
  {
    id: '3',
    sender: 'attendant',
    text: 'Perfeito. Pode me informar o seu CPF ou número da conta, por favor?',
    time: '10:03',
  },
  {
    id: '4',
    sender: 'client_libras',
    text: 'Meu CPF é 123.456.789-00.',
    time: '10:04',
    confidence: 94,
    signGloss: 'MEU / DOCUMENTO / NÚMERO',
  },
];

export const ConversationMode: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'attendant',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Speak attendant response automatically
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(inputText);
      u.lang = 'pt-BR';
      window.speechSynthesis.speak(u);
    }
  };

  const handleSimulateClientSign = (phrase: string, gloss: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'client_libras',
      text: phrase,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: Math.round(Math.random() * 6 + 92),
      signGloss: gloss,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="w-full flex-1 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col min-h-0 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Modo Conversa &bull; Atendimento Contínuo</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-400">
              Intermediação de diálogo em tempo real entre Cliente (Libras) e Atendente (Português)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Sessão #AT-8824 Ativa
          </span>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 min-h-[360px] max-h-[520px]">
        {messages.map((msg) => {
          const isClient = msg.sender === 'client_libras';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isClient ? 'items-start' : 'items-end'} animate-fadeIn`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                {isClient ? (
                  <>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2d588f] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      <Video className="w-3 h-3 text-blue-600" />
                      Cliente em Libras ({msg.confidence}%)
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      <User className="w-3 h-3 text-slate-600" />
                      Atendente
                    </span>
                  </>
                )}
              </div>

              <div
                className={`max-w-[80%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  isClient
                    ? 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                    : 'bg-[#2d588f] text-white rounded-tr-none'
                }`}
              >
                {msg.signGloss && (
                  <div className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded mb-1.5 inline-block">
                    GLOSAS: {msg.signGloss}
                  </div>
                )}
                <p className="font-medium">{msg.text}</p>
              </div>

              <button
                onClick={() => speakText(msg.text)}
                className="mt-1 text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 px-1 cursor-pointer transition-colors"
                title="Reproduzir áudio desta mensagem"
              >
                <Volume2 className="w-3 h-3" />
                <span>Ouvir</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Simulation Bar for Client Signs */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          Simular Fala do Cliente em Libras:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { label: 'Confirmar Dados', text: 'Sim, meus dados estão corretos.', gloss: 'SIM / DADOS / CERTO' },
            { label: 'Pedir 2ª Via', text: 'Pode me enviar por e-mail, por favor?', gloss: 'E-MAIL / ENVIAR / FAVOR' },
            { label: 'Agradecer', text: 'Muito obrigado pela sua atenção!', gloss: 'OBRIGADO / ATENÇÃO' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSimulateClientSign(item.text, item.gloss)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-600 transition-colors cursor-pointer"
            >
              + {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attendant Input Box */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Digite a resposta do atendente em português (e pressione Enter)..."
          className="flex-1 h-11 px-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2d588f] focus:ring-2 focus:ring-[#2d588f]/20 text-slate-800"
        />
        <button
          onClick={handleSendMessage}
          className="h-11 px-4 bg-[#2d588f] hover:bg-[#1e3a8a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Enviar</span>
        </button>
      </div>
    </div>
  );
};
