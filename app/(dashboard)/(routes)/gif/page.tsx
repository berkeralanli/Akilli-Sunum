"use client";


import axios from "axios";
import React, { useState } from 'react';
import * as z from "zod";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";


const Video = () => {
  const router = useRouter();
  const [video, setVideo] = useState<[string]>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
     setVideo(undefined);
    
      const response = await axios.post('/api/gif', values);

      setVideo(response.data[0]);
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
        title="Gif Üretme"
        description="Promptunuzu gife dönüştürün."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                    placeholder='Mercanların arasında yüzen sarı bir balık gifi
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
          {!video && !isLoading && (
            <Empty label="Henüz bir video oluşturulmadı"/>
          )}
          
          {video && (
            <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
              <source src={Array.isArray(video) ? video[0] : video} />
            </video>
          )}

      </div>
       
        
      </div>
      
    </div>
  );
};

export default Video;
