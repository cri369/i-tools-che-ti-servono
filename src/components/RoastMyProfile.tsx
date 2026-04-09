import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateContent } from '@/src/lib/gemini';
import { Flame, Loader2, Ghost } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function RoastMyProfile() {
  const [input, setInput] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRoast = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const systemPrompt = `Sei un comico esperto di "roasting". 
      Il tuo obiettivo è distruggere (in modo divertente e ironico) la bio o il post fornito dall'utente.
      Sii spietato, usa riferimenti alla cultura pop e ai cliché dei social media.
      Non essere offensivo in modo illegale, ma sii molto pungente.
      Restituisci un testo breve (max 3-4 paragrafi) molto cattivo ma esilarante.
      Lingua: Italiano.`;
      
      const result = await generateContent(`Testo da roastare: ${input}`, systemPrompt);
      if (result) setRoast(result);
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
          <CardTitle className="font-heading text-3xl uppercase flex items-center gap-2">
            <Flame className="text-red-600" /> Roast My Profile
          </CardTitle>
          <CardDescription className="font-mono text-sm">Preparati psicologicamente: l'AI non avrà pietà.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Incolla la tua bio o l'ultimo post che ti faceva sentire 'cool'..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-black rounded-none focus-visible:ring-red-600 min-h-[100px]"
          />
          <Button 
            onClick={generateRoast} 
            disabled={loading || !input.trim()}
            className="w-full brutal-button bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Ghost className="mr-2" />}
            Fatti Roastare
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {roast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="brutal-card bg-red-50 border-red-600 text-red-900 relative"
          >
            <div className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rotate-12 font-heading uppercase text-xs">
              Emotional Damage
            </div>
            <p className="font-sans text-lg leading-relaxed whitespace-pre-wrap italic">
              {roast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
