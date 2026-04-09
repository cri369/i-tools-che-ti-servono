import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateContent } from '@/src/lib/gemini';
import { Wand2, Loader2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CaptionWizard() {
  const [context, setContext] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCaptions = async () => {
    if (!context.trim()) return;
    setLoading(true);
    try {
      const systemPrompt = `Sei un copywriter esperto di social media.
      Genera 3 opzioni di didascalia (caption) per ${platform} basate sul contesto fornito.
      Le caption devono includere:
      - Un gancio iniziale forte.
      - Il corpo del testo con il giusto tono per ${platform}.
      - Emoji pertinenti.
      - 3-5 hashtag mirati.
      Restituisci le 3 opzioni separate da "---". Lingua: Italiano.`;
      
      const result = await generateContent(`Contesto: ${context}`, systemPrompt);
      if (result) {
        setCaptions(result.split('---').map(c => c.trim()).filter(Boolean));
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
          <CardTitle className="font-heading text-3xl uppercase flex items-center gap-2">
            <Wand2 className="text-blue-500" /> Caption Wizard
          </CardTitle>
          <CardDescription className="font-mono text-sm">Didascalie perfette, zero sforzo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            {['Instagram', 'LinkedIn', 'X'].map((p) => (
              <Button 
                key={p}
                variant={platform === p ? 'default' : 'outline'}
                onClick={() => setPlatform(p)}
                className={`rounded-none border-2 border-black flex-1 font-bold ${platform === p ? 'bg-blue-500 text-white' : ''}`}
              >
                {p}
              </Button>
            ))}
          </div>
          <Textarea 
            placeholder="Descrivi cosa succede nel post o l'immagine che caricherai..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="border-2 border-black rounded-none focus-visible:ring-blue-500 min-h-[100px]"
          />
          <Button 
            onClick={generateCaptions} 
            disabled={loading || !context.trim()}
            className="w-full brutal-button bg-blue-500 hover:bg-blue-600 text-white"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
            MAGIA ALLE DIDASCALIE
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {captions.length > 0 && (
          <div className="space-y-4">
            {captions.map((caption, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="brutal-card relative group"
              >
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={() => copyToClipboard(caption, index)}
                  className="absolute top-2 right-2 hover:bg-blue-100"
                >
                  {copiedIndex === index ? <Check className="text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
                <p className="font-sans whitespace-pre-wrap pr-8">{caption}</p>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
