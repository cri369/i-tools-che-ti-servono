import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateContent } from '@/src/lib/gemini';
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ViralHookSmith() {
  const [topic, setTopic] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateHooks = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const systemPrompt = `Sei un esperto di social media marketing virale (TikTok, Reels, Shorts). 
      Il tuo compito è generare 5 "hook" (ganci) irresistibili per un video basato sul tema fornito dall'utente.
      Gli hook devono essere:
      1. Provocatori o curiosi.
      2. Brevi e diretti.
      3. In grado di fermare lo scrolling.
      4. In italiano.
      Restituisci solo una lista numerata di 5 hook, senza introduzioni.`;
      
      const result = await generateContent(`Tema: ${topic}`, systemPrompt);
      if (result) {
        const lines = result.split('\n').filter(line => line.trim() && /^\d\./.test(line));
        setHooks(lines.map(l => l.replace(/^\d\.\s*/, '')));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="brutal-card">
        <CardHeader>
          <CardTitle className="font-heading text-3xl uppercase">Viral Hook Smith</CardTitle>
          <CardDescription className="font-mono text-sm">Crea ganci che fermano lo scrolling in pochi secondi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Di cosa parla il tuo video? (es. 'Come cucinare la pasta perfetta' o '3 segreti per viaggiare gratis')"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border-2 border-black rounded-none focus-visible:ring-viral-neon min-h-[100px]"
          />
          <Button 
            onClick={generateHooks} 
            disabled={loading || !topic.trim()}
            className="w-full brutal-button bg-viral-neon hover:bg-viral-neon/90 text-black"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
            GENERA GANCI
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {hooks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4"
          >
            {hooks.map((hook, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="brutal-card flex justify-between items-center group hover:bg-viral-neon/10 transition-colors"
              >
                <p className="font-bold text-lg italic">"{hook}"</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(hook, index)}
                  className="hover:bg-black hover:text-white rounded-none border border-transparent hover:border-black"
                >
                  {copiedIndex === index ? <Check className="text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
