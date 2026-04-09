import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateImage } from '@/src/lib/gemini';
import { Image as ImageIcon, Loader2, Download, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MemeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateMeme = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl(null);
    try {
      // Arricchiamo il prompt per assicurarci che l'AI generi un meme con testo leggibile
      const enhancedPrompt = `A funny internet meme about: ${prompt}. The image should have a clear, bold, white impact font text at the top or bottom, typical of classic memes. High quality, viral style.`;
      const url = await generateImage(enhancedPrompt);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `viral-meme-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card className="brutal-card">
        <CardHeader>
          <CardTitle className="font-heading text-3xl uppercase flex items-center gap-2">
            <ImageIcon className="text-viral-pink" /> Meme Visualizer
          </CardTitle>
          <CardDescription className="font-mono text-sm">Crea meme visivi pronti da postare con l'AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Descrivi il meme (es. 'Un gatto che programma in C++')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="border-2 border-black rounded-none focus-visible:ring-viral-pink"
            />
            <Button 
              onClick={handleGenerateMeme} 
              disabled={loading || !prompt.trim()}
              className="brutal-button bg-viral-pink hover:bg-viral-pink/90 text-white"
            >
              {loading ? <Loader2 className="animate-spin" /> : "GENERA"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="brutal-card flex flex-col items-center justify-center py-12 space-y-4"
          >
            <Loader2 className="w-12 h-12 animate-spin text-viral-pink" />
            <p className="font-mono text-sm animate-pulse uppercase">L'AI sta disegnando il tuo capolavoro...</p>
          </motion.div>
        )}

        {imageUrl && !loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="brutal-card p-2 bg-black">
              <img 
                src={imageUrl} 
                alt="Generated Meme" 
                className="w-full h-auto border-2 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={downloadImage}
                className="flex-1 brutal-button bg-viral-neon text-black"
              >
                <Download className="mr-2 w-4 h-4" /> SCARICA MEME
              </Button>
              <Button 
                onClick={handleGenerateMeme}
                variant="outline"
                className="brutal-button bg-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
