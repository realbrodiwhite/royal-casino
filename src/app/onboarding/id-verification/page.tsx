
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, UploadCloud, RotateCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image'; 
import { cn } from '@/lib/utils';

export default function IdVerificationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an image of your ID to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("ID File for verification:", selectedFile.name);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "ID Submitted for Verification",
        description: "Your ID has been submitted. You'll be notified once it's reviewed. For now, welcome to the casino!",
      });
      router.push('/lobby');
    }, 2000);
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow landing-scroll-container"
      )}>
        <section className="landing-scroll-section"> {/* Ensure this section can center its content */}
          <div className="container mx-auto px-4 py-8 sm:py-10 flex flex-col items-center justify-center h-full">
            <Card className="w-full max-w-md bg-card border-border shadow-xl">
              <CardHeader className="text-center">
                <ShieldCheck className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4" />
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-headline text-primary">ID Verification (Step 3 of 3)</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Upload a clear picture of your government-issued ID to unlock premium features and ensure account security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="idFile" className="text-foreground">Upload ID Document</Label>
                    <Input
                      id="idFile"
                      name="idFile"
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileChange}
                      disabled={isLoading}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground file:text-primary file:font-semibold focus:ring-ring"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Accepted formats: JPG, PNG, WEBP. Max size: 5MB.</p>
                  </div>

                  {previewUrl && selectedFile && (
                    <div className="mt-4 border border-dashed border-border p-3 rounded-md">
                      <p className="text-sm font-medium text-foreground mb-2">Image Preview:</p>
                      <Image
                        src={previewUrl}
                        alt="ID Preview"
                        width={300}
                        height={200}
                        className="rounded-md object-contain max-h-48 w-auto mx-auto"
                        onLoad={() => URL.revokeObjectURL(previewUrl)} 
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-center">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</p>
                    </div>
                  )}

                  <Button type="submit" variant="default" className="w-full font-semibold py-3" disabled={isLoading || !selectedFile}>
                    {isLoading ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Submitting...' : 'Submit for Verification'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex-col items-start text-xs text-muted-foreground space-y-2">
                <p><strong>Why do we need this?</strong> Verifying your ID helps us maintain a secure and fair gaming environment, prevent fraud, and comply with regulations for features like premium currency.</p>
                <p>Your information will be handled securely and used only for verification purposes.</p>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border">
        <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
      </footer>
    </div>
  );
}
