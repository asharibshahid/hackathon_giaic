import React, {JSX, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const LOCAL_STORAGE_KEY = 'hpai-chat-history';

const suggestions = ['Explain ROS2', 'What is VLA?', 'Summarize this chapter'];

export default function ChatWidget(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatMessage[];
        setMessages(parsed);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const handleToggle = (): void => setOpen((prev) => !prev);

  const appendMessage = (message: ChatMessage): void => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async (overrideText?: string): Promise<void> => {
    const baseText = overrideText ?? input;
    const trimmed = baseText.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {role: 'user', content: trimmed};
    appendMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({messages: [...messages, userMessage]}),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = (await response.json()) as {reply?: string};
      const replyText = data.reply?.trim() || 'I could not find an answer right now.';
      appendMessage({role: 'assistant', content: replyText});
    } catch (error) {
      console.error(error);
      appendMessage({role: 'assistant', content: 'Sorry, there was a problem reaching the assistant.'});
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const handleSuggestion = (text: string): void => {
    setInput(text);
    void sendMessage(text);
  };

  const headerTitle = useMemo(() => (loading ? 'Project Assistant · thinking…' : 'Project Assistant'), [loading]);

  return (
    <>
      <button type="button" className={styles.fab} onClick={handleToggle} aria-expanded={open}>
        Chat
      </button>

      <div className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        <div className={styles.panelHeader}>
          <div>
            <div className={styles.panelTitle}>{headerTitle}</div>
            <div className={styles.panelSubtitle}>Ask about modules, concepts, or chapters.</div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={handleToggle} aria-label="Close chat">
            ×
          </button>
        </div>

        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyTitle}>Need quick guidance?</div>
              <div className={styles.suggestionRow}>
                {suggestions.map((text) => (
                  <button key={text} type="button" className={styles.suggestion} onClick={() => handleSuggestion(text)}>
                    {text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={`${msg.role}-${index}`} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}>
              <div className={styles.meta}>{msg.role === 'user' ? 'You' : 'Assistant'}</div>
              <div className={styles.bubble}>{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className={`${styles.message} ${styles.assistant}`}>
              <div className={styles.meta}>Assistant</div>
              <div className={styles.bubble}>Thinking…</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about the Physical AI & Humanoid Robotics book..."
            rows={3}
          />
          <button type="button" className={styles.sendBtn} onClick={() => void sendMessage()} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
