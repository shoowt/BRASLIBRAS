import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, ArrowRightLeft } from 'lucide-react';

interface TextToLibrasViewProps {
  onBackToCamera?: () => void;
}

export const TextToLibrasView: React.FC<TextToLibrasViewProps> = ({ onBackToCamera }) => {
  const [inputText, setInputText] = useState('Olá! Como posso ajudar você hoje no atendimento?');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'0.75x' | '1.0x' | '1.25x'>('1.0x');
  const [activeGlossIndex, setActiveGlossIndex] = useState(0);

  const glosses = [
    { pt: 'Olá', gloss: 'OI / OLÁ', time: '0.0s' },
    { pt: 'Como posso', gloss: 'PODER-COMO', time: '0.8s' },
    { pt: 'ajudar', gloss: 'AJUDAR', time: '1.4s' },
    { pt: 'você', gloss: 'VOCÊ', time: '2.0s' },
    { pt: 'hoje', gloss: 'HOJE', time: '2.5s' },
    { pt: 'no atendimento', gloss: 'ATENDIMENTO', time: '3.1s' },
  ];

  const presets = [
    'Bom dia! Por favor, aguarde um momento.',
    'Qual é o seu número de documento ou CPF?',
    'Seu pedido foi confirmado com sucesso.',
    'Obrigada pela paciência e tenha um bom dia!',
  ];

  const handlePlaySimulation = () => {
    setIsPlaying(true);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= glosses.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setActiveGlossIndex(0);
      } else {
        setActiveGlossIndex(current);
      }
    }, 700);
  };

  const handleSpeakTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(inputText);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-4 xl:gap-5 min-h-0 animate-fadeIn">
      {/* Central Avatar / Video Simulation */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between min-w-0">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-800 tracking-tight">
              Avatar 3D Virtual &bull; Síntese de Libras
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Modo: Texto &rarr; Libras
            </span>
          </div>
        </div>

        {/* 3D Avatar Viewport */}
        <div className="relative flex-1 w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-slate-800">
          {/* Avatar representation image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/interpreter.jpg"
              alt="Avatar Virtual de Libras"
              className={`w-full h-full object-cover filter contrast-[1.05] brightness-95 transition-transform duration-500 ${
                isPlaying ? 'scale-[1.02]' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

            {/* Avatar 3D Grid & HUD effect */}
            <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[11px] text-emerald-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Geração Neural &bull; 60 FPS</span>
            </div>

            {/* Active Gloss floating subtitle */}
            <div className="absolute bottom-16 inset-x-4 flex flex-col items-center pointer-events-none">
              <div className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center shadow-xl">
                <span className="text-[10px] text-blue-300 font-bold block uppercase tracking-wider mb-0.5">
                  Glosa Ativa (Libras)
                </span>
                <span className="text-base sm:text-lg font-black text-yellow-300 tracking-wide">
                  [{glosses[activeGlossIndex]?.gloss || 'AGUARDANDO'}]
                </span>
              </div>
            </div>

            {/* Video / Playback Controls Overlay */}
            <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                <button
                  onClick={handlePlaySimulation}
                  className="p-1.5 bg-[#356294] hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
                  title={isPlaying ? 'Pausar' : 'Reproduzir Sinalização'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveGlossIndex(0);
                  }}
                  className="p-1.5 hover:bg-white/20 text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Speed controls */}
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-xl border border-white/15">
                {(['0.75x', '1.0x', '1.25x'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                      speed === s
                        ? 'bg-[#356294] text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gloss sequence timeline */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0 mr-2">
            Glosas Mapeadas:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {glosses.map((item, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                  idx === activeGlossIndex
                    ? 'bg-[#2d588f] text-white border-[#2d588f] shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {item.gloss}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Text Input and Controls */}
      <div className="w-full lg:w-[350px] xl:w-[380px] shrink-0 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Texto em Português</h3>
            <button
              onClick={handleSpeakTTS}
              className="text-xs text-[#2d588f] hover:text-blue-700 flex items-center gap-1 font-semibold cursor-pointer"
              title="Ouvir em áudio"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ouvir</span>
            </button>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="w-full p-3 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2d588f] focus:ring-2 focus:ring-[#2d588f]/20 resize-none font-medium"
            placeholder="Digite o texto em português para sinalizar em Libras..."
          />

          <button
            onClick={handlePlaySimulation}
            disabled={isPlaying}
            className="mt-3 w-full h-11 bg-[#2d588f] hover:bg-[#1e3a8a] disabled:bg-slate-300 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>{isPlaying ? 'Sinalizando em Libras...' : 'Converter e Sinalizar em Libras'}</span>
          </button>

          {/* Quick Presets */}
          <div className="mt-5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Frases Prontas para Teste:
            </span>
            <div className="space-y-1.5">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(preset)}
                  className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 text-xs text-slate-700 hover:text-blue-900 transition-all cursor-pointer"
                >
                  &bull; {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {onBackToCamera && (
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={onBackToCamera}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Voltar para Modo Câmera &rarr; Texto</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
