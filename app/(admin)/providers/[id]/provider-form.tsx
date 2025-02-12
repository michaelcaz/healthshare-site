"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { toast } from "../../../../components/ui/use-toast"

const providerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  website_url: z.string().url("Please enter a valid URL"),
  trust_score: z.number().min(1).max(100),
  features: z.array(z.string()).default([]),
  risks: z.array(z.string()).default([]),
})

type ProviderFormValues = z.infer<typeof providerSchema>

interface ProviderFormProps {
  provider?: any // Replace with proper Provider type
}

export function ProviderForm({ provider }: ProviderFormProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: provider?.name || "",
      description: provider?.description || "",
      website_url: provider?.website_url || "",
      trust_score: provider?.trust_score || 50,
      features: provider?.features || [],
      risks: provider?.risks || [],
    },
  })

  async function onSubmit(data: ProviderFormValues) {
    setIsLoading(true)

    try {
      if (provider) {
        // Update existing provider
        const { error } = await supabase
          .from("providers")
          .update(data)
          .eq("id", provider.id)

        if (error) throw error

        toast({
          title: "Provider updated",
          description: "Provider has been updated successfully.",
        })
      } else {
        // Create new provider
        const { error } = await supabase
          .from("providers")
          .insert([data])

        if (error) throw error

        toast({
          title: "Provider created",
          description: "New provider has been created successfully.",
        })
      }

      router.refresh()
      router.push("/providers")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form form={form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The name of the healthcare sharing ministry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the provider.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormDescription>
                The provider's official website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trust_score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trust Score</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number" 
                  min="1" 
                  max="100"
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Score from 1-100 indicating provider reliability.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : provider ? "Update Provider" : "Create Provider"}
        </Button>
      </form>
    </Form>
  )
} 