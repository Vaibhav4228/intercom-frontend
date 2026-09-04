import { useState, } from 'react';
import type { KeyboardEvent } from 'react';
import { SendHorizonal } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  onAbort?: () => void;
  onPause?: () => void;
  loading?: boolean
   onTakeOverChat: (value: boolean) => void;
}

export function ChatInput({
  onSend,
  onAbort,
  loading,
   onTakeOverChat,
}: ChatInputProps) {
  const [value, setValue] = useState("");


 

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };



  return (
    <div className="w-full px-2 pb-2">
      {/* Container: Changed to rounded-lg, smaller padding, and more subtle border */}
      <div className="relative rounded-lg border border-zinc-700 bg-[#1e1e1e] px-2 py-1.5 flex items-end gap-2 transition-all focus-within:border-zinc-500">
        <textarea
        onBlur={()=>onTakeOverChat(false)}
          rows={2}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={loading ? "Agent is processing..." : "Ask anything..."}
          disabled={loading}
          // Text size lowered to text-xs/sm and padding reduced
          className="flex-1 bg-transparent resize-none outline-none text-[13px] text-zinc-200 placeholder:text-zinc-500 py-1 max-h-40 disabled:opacity-50"
        />

        <div className="flex items-center pb-0.5">
          {loading ? (
            <button
              onClick={onAbort}
              className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-blue-400 transition-all flex items-center justify-center"
              title="Abort"
            >
              <svg
                className="animate-spin h-4 w-4 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          ) : (
            /* Send Button: Icon-only, smaller footprint, standard VS Code Blue or Subtle Purple */
            <button
              onClick={handleSend}
              disabled={!value.trim()}
              className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all text-white shadow-sm"
            >
              <SendHorizonal size={14} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}