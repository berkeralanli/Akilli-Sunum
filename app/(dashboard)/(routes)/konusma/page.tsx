"use client";
import React from 'react';
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const Konusma = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Heading
        title="Konuşma"
        description="En güncel yapay zekayla konuşma modelimiz."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-10">
            <input {...register('prompt')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            placeholder='En etkileyici sunumlar ortalama kaç dakika?'/>
          </div>
          <div className="col-span-12">
            <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              Gönder
            </button>
          </div>
        </form>
      </div>
      <div className='space-y-4 mt-4'>
      Message content
      </div>
    </div>
  );
};

export default Konusma;
