
"use client";

import React, { useState } from 'react'; // Added useState for image preview
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image'; // For image preview

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Keep Label for direct use if needed
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, CalendarIcon, Palette, Eye, Phone, MapPin, Gamepad2, FileText, UploadCloud, UserCircle2 } from 'lucide-react';

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];


const profileDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username cannot exceed 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[0-9\s-()xX]*$/, "Invalid phone number format"),
  birthDate: z.date({
    required_error: "Birthdate is required.",
    invalid_type_error: "That's not a valid date!",
  }).refine(date => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return date <= eighteenYearsAgo;
  }, { message: "You must be at least 18 years old." }),
  sex: z.enum(["male", "female", "other", "prefer_not_to_say"], {
    required_error: "Please select your sex.",
  }),
  hairColor: z.enum(["black", "brown", "blonde", "red", "gray", "blue", "green", "pink", "purple", "other_hair"], {
    required_error: "Please select your hair color.",
  }),
  eyeColor: z.enum(["brown", "blue", "green", "hazel", "gray", "amber", "other_eye"], {
    required_error: "Please select your eye color.",
  }),
  country: z.string().min(1, "Country is required"),
  favoriteGameType: z.enum(["slots", "poker", "bingo", "scratchers", "coin_flip", "other_game", "none"], {
    required_error: "Please select your favorite game type or 'None'.",
  }),
  bio: z.string().max(150, "Bio cannot exceed 150 characters").optional(),
  profilePicture: z
    .custom<File | null>((val) => val === null || val instanceof File, "Invalid file")
    .refine(file => file === null || file.size <= MAX_FILE_SIZE_BYTES, `Max image size is ${MAX_FILE_SIZE_MB}MB.`)
    .refine(
      file => file === null || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    )
    .optional(),
});

export type ProfileDetailsFormData = z.infer<typeof profileDetailsSchema>;

const hairColorOptions = [
  { value: "black", label: "Black" }, { value: "brown", label: "Brown" }, { value: "blonde", label: "Blonde" },
  { value: "red", label: "Red" }, { value: "gray", label: "Gray/White" }, { value: "blue", label: "Blue" },
  { value: "green", label: "Green" }, { value: "pink", label: "Pink" }, { value: "purple", label: "Purple" },
  { value: "other_hair", label: "Other" },
];

const eyeColorOptions = [
  { value: "brown", label: "Brown" }, { value: "blue", label: "Blue" }, { value: "green", label: "Green" },
  { value: "hazel", label: "Hazel" }, { value: "gray", label: "Gray" }, { value: "amber", label: "Amber" },
  { value: "other_eye", label: "Other" },
];

const sexOptions = [
  { value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const countryOptions = [
    { value: "US", label: "United States" }, { value: "CA", label: "Canada" }, { value: "GB", label: "United Kingdom" },
    { value: "AU", label: "Australia" }, { value: "DE", label: "Germany" }, { value: "FR", label: "France" },
    { value: "OTHER_COUNTRY", label: "Other" },
];

const favoriteGameOptions = [
    { value: "slots", label: "Slots" }, { value: "poker", label: "Poker" }, { value: "bingo", label: "Bingo" },
    { value: "scratchers", label: "Scratchers" }, { value: "coin_flip", label: "Coin Flip" },
    { value: "other_game", label: "Other Game Type" }, { value: "none", label: "None Yet" },
];


export default function ProfileDetailsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);

  const form = useForm<ProfileDetailsFormData>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      firstName: "", lastName: "", username: "", phone: "",
      // birthDate, sex, hairColor, eyeColor, country, favoriteGameType handled by zod or undefined
      bio: "", profilePicture: null,
    },
  });

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>, fieldChange: (file: File | null) => void) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      fieldChange(file);
      setProfilePicPreview(URL.createObjectURL(file));
    } else {
      fieldChange(null);
      setProfilePicPreview(null);
    }
  };

  const onSubmit: SubmitHandler<ProfileDetailsFormData> = (data) => {
    console.log("Profile Details Data (with new fields):", data);
    // In a real app, save data and upload profilePicture if present
    // Also, a real app would check username uniqueness against the backend here.
    toast({
      title: "Profile Details Saved!",
      description: "Next, let's verify your ID.",
    });
    router.push('/onboarding/id-verification');
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-16 pt-[88px] sm:pt-[92px] flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg bg-card border-border shadow-xl">
          <CardHeader className="text-center">
            <UserCheck className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4" />
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-headline text-primary">Complete Your Profile (Step 2 of 3)</CardTitle>
            <CardDescription className="text-muted-foreground">
              Tell us a bit more about yourself to personalize your experience and unlock features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl><Input placeholder="John" {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl><Input placeholder="Doe" {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><UserCircle2 className="mr-2 h-4 w-4" /> Username</FormLabel>
                        <FormControl><Input placeholder="PlayerOne25" {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground" /></FormControl>
                        <FormDescription>Your public display name in the casino. Usernames must be unique.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4" /> Phone Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="(123) 456-7890" {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4" /> Birthdate</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal bg-input border-border text-foreground hover:text-foreground", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><UploadCloud className="mr-2 h-4 w-4" /> Profile Picture (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          onChange={(e) => handleProfilePicChange(e, field.onChange)}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground file:text-primary file:font-semibold focus:ring-ring"
                        />
                      </FormControl>
                      <FormDescription>Max {MAX_FILE_SIZE_MB}MB. JPG, PNG, GIF, WEBP.</FormDescription>
                      {profilePicPreview && (
                        <div className="mt-2 border border-dashed border-border p-2 rounded-md w-32 h-32 mx-auto">
                          <Image src={profilePicPreview} alt="Profile preview" width={128} height={128} className="rounded-md object-cover w-full h-full" />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="Select your sex" /></SelectTrigger></FormControl>
                            <SelectContent>{sexOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="Select your country" /></SelectTrigger></FormControl>
                            <SelectContent>{countryOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hairColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Palette className="mr-2 h-4 w-4" /> Hair Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="Select hair color" /></SelectTrigger></FormControl>
                          <SelectContent>{hairColorOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eyeColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Eye className="mr-2 h-4 w-4" /> Eye Color</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="Select eye color" /></SelectTrigger></FormControl>
                          <SelectContent>{eyeColorOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="favoriteGameType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Gamepad2 className="mr-2 h-4 w-4" /> Favorite Game Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-input border-border text-foreground"><SelectValue placeholder="What's your go-to game?" /></SelectTrigger></FormControl>
                        <SelectContent>{favoriteGameOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><FileText className="mr-2 h-4 w-4" /> Short Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us a little about your gaming style or what you enjoy..." {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none" rows={3} />
                      </FormControl>
                      <FormDescription>Max 150 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="default" className="w-full font-semibold py-3" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Next: ID Verification'}
                </Button>
              </form>
            </Form>
          </CardContent>
           <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">Your information helps us verify your account and provide a better experience.</p>
            </CardFooter>
        </Card>
      </main>
      <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border">
        <p>&copy; 2025 Royal Casino. All Rights Reserved. Built By Brodi Inc.</p>
      </footer>
    </div>
  );
}

