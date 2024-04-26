"use client";
import axios from "axios";
import React, { useState } from 'react';
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Music2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";


const Muzik = () => {
  const router = useRouter();
  const [music, setmusic] = useState<[string]>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
     setmusic(undefined);
    
      const response = await axios.post('/api/muzik', values);

      setmusic(response.data.audio);
      form.reset();
    } catch ( error: any) {
    //TODO: Open Pro Modal  
      console.log(error);
    } finally {
      router.refresh();

    } 
  };

  return (
    <div>
      <Heading
        title="Müzik Üretme"
        description="Promptunuzu müziğe dönüştürün."
        icon={Music2Icon}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='rounded=lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 '>
              <FormField 
              name="prompt"
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-10'>
                  <FormControl className='m-0 p-0'>
                    <Input 
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    placeholder='Keman solo
                    '{...field}
                    />

                  </FormControl>
                </FormItem>
              )}
              />
              <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                Üret
              </Button>
            </form>

          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted"
            >
              <Loader />
              </div>
          )}
          {!music && !isLoading && (
            <Empty label="Henüz bir müzik oluşturulmadı"/>
          )}
          
      {music && (
        <audio controls className="w-full mt-8">
          <source src={Array.isArray(music) ? music[0] : music} />
        </audio>
      )}
      </div>
       
        
      </div>
      
    </div>
  );
};

export default Muzik;
