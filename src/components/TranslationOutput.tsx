import React, { useState, useRef } from 'react';
import { Copy, Check, Mic, UploadCloud, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TranslationOutputProps {
  text: string;
  confidence: number;
  onTextChange: (newText: string) => void;
  onSignalAgain: () => void;
  onFileUpload: (file: File) => void;
}

export const TranslationOutput: React.FC<TranslationOutputProps> = ({
  text,
  confidence,
  onTextChange,
  onSignalAgain,
  onFileUpload,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Copy text to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  // Speak Portuguese text using native browser SpeechSynthesis (TTS)
  const handleSpeakTTS = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta sintetizador de voz (TTS).');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith('pt') || v.lang.includes('BR'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Handle file upload simulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileUpload(file);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileUpload(file);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col min-w-0">
      {/* Header matching reference: "Texto Traduzido   45%" */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
        <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-800 tracking-tight">
          Texto Traduzido
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">
            {confidence}%
          </span>
          <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#356294] rounded-full transition-all duration-500"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Big Translation Text Box - Takes natural expansive space */}
      <div className="relative mb-3 flex-1 flex flex-col min-h-[170px]">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Aguardando sinais..."
          className="w-full h-full p-4 text-slate-800 font-medium text-base sm:text-[17px] leading-relaxed bg-white border border-slate-300 rounded-xl resize-none focus:outline-none focus:border-[#356294] focus:ring-2 focus:ring-[#356294]/20 transition-all placeholder:text-slate-400 shadow-2xs"
        />
        {isSpeaking && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-[#356294] rounded-full text-[10px] font-semibold animate-pulse border border-blue-200">
            <Volume2 className="w-3 h-3" />
            <span>Falando...</span>
          </div>
        )}
      </div>

      {/* Action Buttons matching reference */}
      <div className="space-y-2.5 mb-4 shrink-0">
        {/* Button 1: Sinalizar Novamente (Solid Slate Blue) */}
        <button
          onClick={onSignalAgain}
          className="w-full h-11 px-4 bg-[#356294] hover:bg-[#2b517a] active:bg-[#203c5b] text-white font-medium text-xs sm:text-sm rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 opacity-80" />
          <span>Sinalizar Novamente</span>
        </button>

        {/* Button 2: Copiar Texto (Outlined Slate Blue) */}
        <button
          onClick={handleCopy}
          className={`w-full h-11 px-4 font-medium text-xs sm:text-sm rounded-lg border transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
            copied
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-white hover:bg-slate-50 text-[#356294] border-[#356294]/70 hover:border-[#356294]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Texto Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 opacity-80" />
              <span>Copiar Texto</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Section: Falar (TTS) & Enviar Vídeo - Integrated harmoniously without giant white voids */}
      <div className="pt-3.5 border-t border-slate-100 shrink-0">
        <label className="block text-xs font-semibold text-slate-700 mb-2 text-center">
          Falar (TTS)
        </label>

        <div className="grid grid-cols-2 gap-3">
          {/* Left Button: Gravar / Active */}
          <button
            onClick={handleSpeakTTS}
            className={`h-16 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer text-center shadow-2xs ${
              isSpeaking
                ? 'bg-[#356294] text-white ring-4 ring-blue-200 animate-pulse'
                : 'bg-[#356294] hover:bg-[#2b517a] text-white'
            }`}
            title="Ouvir a tradução com voz sintetizada em português"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-semibold leading-tight">Gravar</span>
            <span className="text-[10px] text-blue-200 font-medium">
              {isSpeaking ? 'Falando...' : 'Active'}
            </span>
          </button>

          {/* Right Button: Enviar Vídeo (File upload) */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`h-16 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer text-center ${
              dragOver
                ? 'border-[#356294] bg-blue-50/80 text-[#356294]'
                : 'border-blue-300 hover:border-[#356294] bg-blue-50/20 hover:bg-blue-50/50 text-slate-700'
            }`}
            title="Clique ou arraste um vídeo em Libras para processamento"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*"
              className="hidden"
            />
            <div className="w-6 h-6 rounded-full bg-blue-100/80 flex items-center justify-center text-[#356294]">
              <UploadCloud className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold leading-tight text-slate-800">
              Enviar Vídeo
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              File upload
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
