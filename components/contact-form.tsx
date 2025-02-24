'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { RefObject, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { sendMessage } from '@/utils/actions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

// Define type from schema
type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  recaptchaRef?: RefObject<ReCAPTCHA>;
}

export function ContactForm({ onSuccess, recaptchaRef }: ContactFormProps) {
  const internalRecaptchaRef = useRef<ReCAPTCHA | null>(null);
  const resolvedRecaptchaRef = recaptchaRef ?? internalRecaptchaRef;
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const RECAPTCHA_TIMEOUT = 10000;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);

    try {
      if (!resolvedRecaptchaRef.current) {
        toast.error('ReCAPTCHA not initialized. Please refresh the page.');
        return;
      }

      // Simplified reCAPTCHA execution
      const recaptchaToken = await resolvedRecaptchaRef.current.executeAsync().catch((error) => {
        console.error('ReCAPTCHA error:', error);
        throw new Error('ReCAPTCHA verification failed');
      });

      if (!recaptchaToken) {
        throw new Error('ReCAPTCHA verification failed');
      }

      // Rest of submission logic
      const response = await sendMessage(values, recaptchaToken);

      if (response.success) {
        toast.success("Message sent successfully! I'll get back to you soon. 📧");
        form.reset();
        resolvedRecaptchaRef.current.reset();
        onSuccess?.();
      } else {
        toast.error(response.message || 'Unable to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Unable to verify request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Your name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Your email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  type='tel'
                  placeholder='Your phone number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Write your message here...'
                  className='min-h-[100px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add reCAPTCHA */}

        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
}
