import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertCircle, CheckCircle2, Shield, Wifi } from 'lucide-react';
import { playSuccess, playKeyboard, playClick } from './AudioSynth';

// 🔧 SOLO CAMBIA ESTO: ve a https://formspree.io, crea una cuenta gratis,
//    crea un nuevo form con tu email y pega tu ID aquí:
const FORMSPREE_ID = 'xojolyvn'; // ← ej: "xpzvwrqb"

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const TerminalContact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [activeStep, setActiveStep] = useState<keyof FormState>('name');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Initializing secure transmission link...',
    'Uptime protocol active. Port: 3000 secure.',
    'Enter transmission details to send direct payload.',
  ]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const historyContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [activeStep]);

  const handleInputChange = (field: keyof FormState, value: string) => {
    playKeyboard();
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: keyof FormState) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      advanceStep(field);
    }
  };

  const advanceStep = (currentField: keyof FormState) => {
    const val = form[currentField].trim();

    if (!val) {
      setError(`El campo [${currentField.toUpperCase()}] no puede estar vacío.`);
      return;
    }

    if (currentField === 'email' && !/\S+@\S+\.\S+/.test(val)) {
      setError('Formato de correo electrónico inválido.');
      return;
    }

    playClick();

    setTerminalHistory(prev => [
      ...prev,
      `guest@transceiver:~$ set ${currentField.toUpperCase()} = "${val}"`,
      `[OK] Campo ${currentField.toUpperCase()} registrado.`,
    ]);

    if (currentField === 'name') setActiveStep('email');
    else if (currentField === 'email') setActiveStep('subject');
    else if (currentField === 'subject') setActiveStep('message');
    else if (currentField === 'message') {
      setTerminalHistory(prev => [
        ...prev,
        'Ready for transceiver dispatch. Click [DISPATCH TRANSMISSION] below.',
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Por favor, rellena todos los campos antes de transmitir.');
      return;
    }

    setLoading(true);
    playClick();
    setTerminalHistory(prev => [
      ...prev,
      '>>> SECURING ENCRYPTION TUNNEL...',
      '>>> COMPRESSING SUB-SPACE DATA...',
      '>>> TRANSMITTING TELEMETRY...',
    ]);

    try {
      // ✅ Aquí es donde realmente se envía el email vía Formspree
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Error en la transmisión.');
      }

      setDone(true);
      playSuccess();
      setTerminalHistory(prev => [
        ...prev,
        '==========================================',
        ' TRANSMISSION COMPLETED SUCCESSFULLY!      ',
        ' El mensaje ha sido despachado con éxito.  ',
        ' Me pondré en contacto contigo lo antes posible. ',
        '==========================================',
      ]);
    } catch (err: any) {
      setError(err.message || 'Error al enviar. Inténtalo de nuevo.');
      setTerminalHistory(prev => [
        ...prev,
        `[ERROR] Fallo en la transmisión: ${err.message}`,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetTerminal = () => {
    playClick();
    setForm({ name: '', email: '', subject: '', message: '' });
    setActiveStep('name');
    setDone(false);
    setError('');
    setTerminalHistory([
      'Enlace de transmisión segura re-inicializado.',
      'Listo para nuevos comandos.',
    ]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0f0f0f] rounded-2xl border border-white/15 shadow-2xl relative overflow-hidden flex flex-col h-[480px]">

      {/* Terminal Window Header Bar */}
      <div className="bg-[#151515] px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          <span className="text-xs font-mono text-white/50 pl-2">guest@transceiver:~ - SSL Enabled</span>
        </div>
        <div className="flex items-center space-x-1">
          <Wifi size={12} className="text-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-400">CONNECT_OK</span>
        </div>
      </div>

      {/* Terminal Output history */}
      <div 
        ref={historyContainerRef}
        className="flex-1 p-5 font-mono text-xs text-white/70 overflow-y-auto space-y-2 select-text custom-scrollbar"
      >
        {terminalHistory.map((line, idx) => (
          <div
            key={idx}
            className={`leading-relaxed ${
              line.startsWith('>>>') ? 'text-fuchsia-400'
              : line.startsWith('[SATELLITE') ? 'text-cyan-400'
              : line.startsWith('[ERROR]') ? 'text-red-400'
              : line.includes('SUCCESSFULLY') ? 'text-cyan-300 font-bold'
              : 'text-white/60'
            }`}
          >
            {line}
          </div>
        ))}

        {/* Active inputs */}
        {!done && (
          <div className="space-y-3 mt-4">
            {activeStep === 'name' && (
              <div className="flex items-center space-x-1">
                <span className="text-cyan-400">guest@transceiver:~$</span>
                <span className="text-white/40">enter_name --field = </span>
                <input
                  ref={(el) => { inputRef.current = el; }}
                  type="text"
                  placeholder="Tu Nombre"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, 'name')}
                  className="flex-1 bg-transparent border-none outline-none text-cyan-300 pl-1 placeholder:text-white/20"
                />
              </div>
            )}

            {activeStep === 'email' && (
              <div className="flex items-center space-x-1">
                <span className="text-cyan-400">guest@transceiver:~$</span>
                <span className="text-white/40">enter_email --dest = </span>
                <input
                  ref={(el) => { inputRef.current = el; }}
                  type="email"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, 'email')}
                  className="flex-1 bg-transparent border-none outline-none text-cyan-300 pl-1 placeholder:text-white/20"
                />
              </div>
            )}

            {activeStep === 'subject' && (
              <div className="flex items-center space-x-1">
                <span className="text-cyan-400">guest@transceiver:~$</span>
                <span className="text-white/40">enter_subject --topic = </span>
                <input
                  ref={(el) => { inputRef.current = el; }}
                  type="text"
                  placeholder="Asunto"
                  value={form.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, 'subject')}
                  className="flex-1 bg-transparent border-none outline-none text-cyan-300 pl-1 placeholder:text-white/20"
                />
              </div>
            )}

            {activeStep === 'message' && (
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-cyan-400">guest@transceiver:~$</span>
                  <span className="text-white/40">enter_message --content:</span>
                </div>
                <textarea
                  ref={(el) => { inputRef.current = el; }}
                  placeholder="Escribe tu mensaje aquí..."
                  value={form.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full bg-[#151515] border border-white/10 rounded-lg p-2.5 outline-none text-cyan-300 placeholder:text-white/20 resize-none h-16 mt-1 font-mono text-xs"
                />
                <div className="text-[10px] text-white/30 text-right">Presiona el botón de abajo para enviar</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mx-4 mb-2 p-2 bg-red-950/40 border border-red-500/20 rounded flex items-center space-x-2 text-red-400 text-[11px] font-mono animate-bounce">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="bg-[#151515] border-t border-white/10 px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {!done ? (
          <>
            <div className="flex items-center space-x-2">
              <Shield size={14} className="text-cyan-500" />
              <span className="text-[10px] font-mono text-white/40 uppercase">SSL-Encryption Active</span>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto">
              {activeStep !== 'message' ? (
                <button
                  onClick={() => advanceStep(activeStep)}
                  className="w-full sm:w-auto px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-mono font-bold tracking-wider cursor-pointer"
                >
                  CONTINUAR [ENTER]
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black rounded-lg text-xs font-mono font-bold tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-103 transition-transform disabled:opacity-50"
                >
                  <Send size={12} />
                  <span>{loading ? 'TRANSMITIENDO...' : 'DESPACHAR MENSAJE'}</span>
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center w-full">
            <span className="text-cyan-400 text-[11px] font-mono flex items-center space-x-1">
              <CheckCircle2 size={12} />
              <span>Transmisión en órbita</span>
            </span>
            <button
              onClick={resetTerminal}
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-lg text-xs font-mono font-bold uppercase cursor-pointer"
            >
              Nuevo Mensaje
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
