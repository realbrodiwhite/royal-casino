
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, CalendarIcon, Palette, Eye, Phone } from 'lucide-react'; // Added more icons

const profileDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[0-9\s-()xX]*$/, "Invalid phone number format (digits, spaces, hyphens, parens, 'x' allowed)"),
  birthDate: z.date({
    required_error: "Birthdate is required.",
    invalid_type_error: "That's not a valid date!",
  }),
  sex: z.enum(["male", "female", "other", "prefer_not_to_say"], {
    required_error: "Please select your sex.",
  }),
  hairColor: z.enum(["black", "brown", "blonde", "red", "gray", "blue", "green", "pink", "purple", "other_hair"], {
    required_error: "Please select your hair color.",
  }),
  eyeColor: z.enum(["brown", "blue", "green", "hazel", "gray", "amber", "other_eye"], {
    required_error: "Please select your eye color.",
  }),
});

export type ProfileDetailsFormData = z.infer<typeof profileDetailsSchema>;

const hairColorOptions = [
  { value: "black", label: "Black" },
  { value: "brown", label: "Brown" },
  { value: "blonde", label: "Blonde" },
  { value: "red", label: "Red" },
  { value: "gray", label: "Gray/White" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "pink", label: "Pink" },
  { value: "purple", label: "Purple" },
  { value: "other_hair", label: "Other" },
];

const eyeColorOptions = [
  { value: "brown", label: "Brown" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "hazel", label: "Hazel" },
  { value: "gray", label: "Gray" },
  { value: "amber", label: "Amber" },
  { value: "other_eye", label: "Other" },
];

const sexOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
];


export default function ProfileDetailsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ProfileDetailsFormData>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: { // Set default values to avoid uncontrolled component warnings
      firstName: "",
      lastName: "",
      phone: "",
      // birthDate: undefined, // Let zod handle required error
      // sex: undefined,
      // hairColor: undefined,
      // eyeColor: undefined,
    },
  });

  const onSubmit: SubmitHandler<ProfileDetailsFormData> = (data) => {
    console.log("Profile Details Data:", data);
    // In a real app, save this data to Firebase/backend here
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
              Tell us a bit more about yourself to personalize your experience.
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
                        <FormControl>
                          <Input placeholder="John" {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
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
                        <FormControl>
                          <Input placeholder="Doe" {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4" /> Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(123) 456-7890" {...field} className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
                      </FormControl>
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
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-input border-border text-foreground hover:text-foreground",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sex</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-input border-border text-foreground">
                            <SelectValue placeholder="Select your sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sexOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hairColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Palette className="mr-2 h-4 w-4" /> Hair Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-input border-border text-foreground">
                              <SelectValue placeholder="Select hair color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hairColorOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
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
                          <FormControl>
                            <SelectTrigger className="bg-input border-border text-foreground">
                              <SelectValue placeholder="Select eye color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {eyeColorOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

