import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateContent } from '@/src/lib/gemini';
import { Zap, Loader2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';

export default function VibeAnalyzer() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<{ vibe: string, personality: string, score: number, tags: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeVibe = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const systemPrompt = `Sei un esperto di analisi del "vibe" e della personalità digitale. 
      Analizza il testo fornito (una bio, un post, o una descrizione) e restituisci un'analisi divertente e accurata in formato JSON.
      Il JSON deve avere:
      - "vibe": una frase breve che riassume l'energia (es. "Main Character Energy", "Chaos Coded", "Quiet Luxury").
      - "personality": una descrizione di 2-3 frasi dello stile comunicativo.
      - "score": un numero da 1 a 100 che rappresenta quanto è "virale" o "cool" questo vibe.
      - "tags": un array di 3-4 hashtag o parole chiave.
      Sii ironico ma onesto. Lingua: Italiano.`;
      
      const result = await generateContent(`Testo da analizzare: ${input}`, systemPrompt);
      if (result) {
        const cleanJson = result.replace(/```json|```/g, '').trim();
        setAnalysis(JSON.parse(cleanJson));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="brutal-card">
        <CardHeader>
          <CardTitle className="font-heading text-3xl uppercase">Vibe Analyzer</CardTitle>
          <CardDescription className="font-mono text-sm">Analizza la tua bio o i tuoi post per scoprire il tuo vero vibe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Incolla qui la tua bio di Instagram/X o un post che hai scritto..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-black rounded-none focus-visible:ring-viral-pink min-h-[100px]"
          />
          <Button 
            onClick={analyzeVibe} 
            disabled={loading || !input.trim()}
            className="w-full brutal-button bg-viral-pink hover:bg-viral-pink/90 text-white"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Zap className="mr-2" />}
            ANALIZZA IL VIBE
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {analysis && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="brutal-card bg-black text-white space-y-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading text-4xl text-viral-pink uppercase leading-none">{analysis.vibe}</h3>
                <div className="flex gap-2 mt-4">
                  {analysis.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="border-viral-pink text-viral-pink rounded-none">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs opacity-50 uppercase">Punteggio Vibe</p>
                <p className="font-heading text-5xl text-viral-neon">{analysis.score}</p>
              </div>
            </div>

            <p className="font-sans text-lg leading-relaxed border-l-4 border-viral-neon pl-4 italic">
              "{analysis.personality}"
            </p>

            <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black rounded-none">
              <Share2 className="mr-2 w-4 h-4" /> CONDIVIDI IL TUO VIBE
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
