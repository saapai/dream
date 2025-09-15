import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Github, Figma, ExternalLink, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'progress';
  content: string;
  timestamp: Date;
  jobId?: string;
  status?: 'running' | 'completed' | 'error';
  links?: {
    github?: string;
    figma?: string;
    vercel?: string;
  };
}

interface JobProgress {
  id: string;
  status: string;
  logs: string[];
  plan?: any;
  output?: any;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Welcome to AI Dreamer! 🚀\n\nI'm your AI product engineer. Describe any website you'd like to build, and I'll create it from scratch and deploy it live for you.\n\nTry something like:\n• \"Create a portfolio website for a software engineer\"\n• \"Build a landing page for my startup with dark theme\"\n• \"Make a restaurant website with menu and reservations\"",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pollJobProgress = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      const job: JobProgress = await response.json();
      
      // Update progress message
      setMessages(prev => prev.map(msg => 
        msg.jobId === jobId ? {
          ...msg,
          content: `${msg.content.split('\n')[0]}\n\n${job.logs.join('\n')}`,
          status: job.status as any
        } : msg
      ));

      if (job.status === 'succeeded') {
        // Add completion message with links
        const completionMessage: Message = {
          id: Date.now().toString(),
          type: 'assistant',
          content: `✨ **Project Complete!** ✨\n\nYour website has been successfully created and deployed. Here are your links:`,
          timestamp: new Date(),
          status: 'completed',
          links: {
            github: job.output?.repo?.pr_url,
            vercel: job.output?.deploy?.production_url || job.output?.deploy?.preview_url,
            figma: job.output?.figma?.url
          }
        };
        
        setMessages(prev => [...prev, completionMessage]);
        setIsLoading(false);
      } else if (job.status === 'failed') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'assistant',
          content: `❌ **Project Failed**\n\nSomething went wrong. Please try again or contact support.`,
          timestamp: new Date(),
          status: 'error'
        }]);
        setIsLoading(false);
      } else if (job.status === 'running') {
        // Continue polling
        setTimeout(() => pollJobProgress(jobId), 2000);
      }
    } catch (error) {
      console.error('Error polling job:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          design_choice: {
            mode: 'preset',
            key: 'minimal',
            tokens: {
              '--bg': '#ffffff',
              '--fg': '#111111',
              '--muted': '#6b7280',
              '--primary': '#2563eb',
              '--accent': '#7c3aed',
              '--radius': '12px'
            }
          }
        }),
      });

      const job = await response.json();
      
      const progressMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'progress',
        content: `🚀 **Creating your website...**\n\nInitializing project...`,
        timestamp: new Date(),
        jobId: job.id,
        status: 'running'
      };

      setMessages(prev => [...prev, progressMessage]);
      
      // Start polling for progress
      setTimeout(() => pollJobProgress(job.id), 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: `❌ **Error**\n\nSorry, something went wrong. Please try again.`,
        timestamp: new Date(),
        status: 'error'
      }]);
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';
    
    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
      >
        <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
            {isUser ? (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                U
              </div>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          {/* Message Content */}
          <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
            <div
              className={`px-4 py-3 rounded-2xl ${
                isUser
                  ? 'bg-blue-500 text-white'
                  : message.type === 'progress'
                  ? 'bg-amber-50 border border-amber-200 text-amber-900'
                  : 'bg-gray-100 text-gray-900'
              } ${message.status === 'error' ? 'bg-red-50 border border-red-200 text-red-900' : ''}`}
            >
              {/* Status Icon */}
              {message.type === 'progress' && (
                <div className="flex items-center mb-2">
                  {message.status === 'running' && <Clock className="w-4 h-4 mr-2 animate-spin" />}
                  {message.status === 'completed' && <CheckCircle className="w-4 h-4 mr-2 text-green-600" />}
                  {message.status === 'error' && <AlertCircle className="w-4 h-4 mr-2 text-red-600" />}
                  <span className="text-sm font-medium">
                    {message.status === 'running' && 'In Progress'}
                    {message.status === 'completed' && 'Completed'}
                    {message.status === 'error' && 'Failed'}
                  </span>
                </div>
              )}
              
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {/* Links */}
              {message.links && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {message.links.vercel && (
                    <a
                      href={message.links.vercel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Website
                    </a>
                  )}
                  {message.links.github && (
                    <a
                      href={message.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </a>
                  )}
                  {message.links.figma && (
                    <a
                      href={message.links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Figma className="w-4 h-4 mr-2" />
                      Design
                    </a>
                  )}
                </div>
              )}
            </div>
            
            <span className="text-xs text-gray-500 mt-1">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Dreamer</h1>
              <p className="text-sm text-gray-600">Your AI Product Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the website you want to build..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-32"
                rows={1}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-blue-500 text-white p-3 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}