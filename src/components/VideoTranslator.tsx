import React, { useState, useRef, useEffect } from 'react';
import { Camera, Video, RefreshCw, Check, AlertCircle, Sliders } from 'lucide-react';
import type { LibrasSignSample } from '../types';
import { SAMPLE_SIGNS } from '../data/mockData';

interface VideoTranslatorProps {
  confidence: number;
  isTranslating: boolean;
  onSelectSample: (sample: LibrasSignSample) => void;
  onTriggerTranslation: () => void;
}

export const VideoTranslator: React.FC<VideoTranslatorProps> = ({
  confidence,
  isTranslating,
  onSelectSample,
  onTriggerTranslation,
}) => {
  const [useWebcam, setUseWebcam] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSignId, setActiveSignId] = useState('saudacao');

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleWebcam = async () => {
    if (useWebcam) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setUseWebcam(false);
      setWebcamError(null);
    } else {
      try {
        setWebcamError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' },
          audio: false,
        });
        streamRef.current = stream;
        setUseWebcam(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err: any) {
        console.warn('Webcam permission denied or unavailable:', err);
        setWebcamError('Câmera indisponível ou permissão negada.');
        setUseWebcam(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handlePickSign = (sample: LibrasSignSample) => {
    setActiveSignId(sample.id);
    onSelectSample(sample);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between min-w-0">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 shrink-0">
        <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span>Tradução em Tempo Real (Libras para Português)</span>
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

      {/* Video Container Area: Pure, clean photography matching the reference photo */}
      <div className="relative flex-1 w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] bg-slate-950 rounded-xl overflow-hidden shadow-inner flex items-center justify-center group border border-slate-800/20">
        {useWebcam ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
        ) : (
          /* Realist interpreter photo matching the exact woman in Libras from the prompt */
          <div className="relative w-full h-full">
            <img
              src="/interpreter.jpg"
              alt="Intérprete de Libras sinalizando"
              className="w-full h-full object-cover filter contrast-[1.02] brightness-98"
            />
            {/* Subtle soft vignette on edges for control contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/25 pointer-events-none" />
          </div>
        )}

        {/* Center-Bottom Overlay Controls matching the reference image */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center items-center gap-4 pointer-events-none z-10">
          <div className="pointer-events-auto flex items-center gap-4 bg-black/45 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-1.5 text-[11px] font-medium text-white/95 hover:text-white transition-colors cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-[#356294] group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Ajustar Câmera</span>
            </button>

            <span className="w-px h-4 bg-white/20" />

            <button
              onClick={onTriggerTranslation}
              className="flex items-center gap-1.5 text-[11px] font-medium text-white/95 hover:text-white transition-colors cursor-pointer group"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isTranslating
                    ? 'bg-red-600 animate-pulse ring-2 ring-red-400'
                    : 'bg-[#356294] group-hover:bg-blue-600'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-white" />
              </div>
              <span>{isTranslating ? 'Gravando...' : 'Gravar Sinais'}</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Camera Switcher (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-10">
          <button
            onClick={toggleWebcam}
            className="px-2.5 py-1 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/90 hover:text-white text-[10px] font-medium rounded-lg border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-blue-300" />
            <span>{useWebcam ? 'Usar Demonstração' : 'Minha Webcam'}</span>
          </button>
        </div>

        {/* Settings Panel Modal */}
        {showSettings && (
          <div className="absolute top-14 right-4 w-56 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-slate-200 z-20 text-slate-800 text-xs animate-fadeIn">
            <div className="flex items-center justify-between font-bold pb-2 mb-2 border-b border-slate-100">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#356294]" />
                Ajustes de Câmera
              </span>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Qualidade do Feed</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs">
                  <option>1080p HD (60fps)</option>
                  <option>720p Padrão</option>
                  <option>Econômico</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-600">Espelhar Imagem</span>
                <input type="checkbox" defaultChecked className="rounded text-[#356294] cursor-pointer" />
              </div>
            </div>
          </div>
        )}

        {/* Webcam Error Warning */}
        {webcamError && (
          <div className="absolute inset-x-4 top-4 bg-amber-600/90 text-white text-xs p-2.5 rounded-lg backdrop-blur-md flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{webcamError}</span>
            </div>
            <button
              onClick={() => setWebcamError(null)}
              className="text-white hover:underline text-[11px] cursor-pointer"
            >
              OK
            </button>
          </div>
        )}
      </div>

      {/* Sleek Single-Line Gesture Selector Bar */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between shrink-0">
        <span className="text-[11px] font-semibold text-slate-500 shrink-0">
          Simular Sinais:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {SAMPLE_SIGNS.map((sign) => {
            const isSelected = sign.id === activeSignId;
            return (
              <button
                key={sign.id}
                onClick={() => handlePickSign(sign)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#356294] text-white border-[#356294] shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5" />}
                <span>{sign.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
