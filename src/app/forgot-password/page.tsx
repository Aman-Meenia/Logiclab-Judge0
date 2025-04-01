"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

const ForgotPasswordPage = () => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    // mode: "onTouched",
  });

  const onSubmit = async (data: { email: string }) => {
    // forget-password-email
    setLoading(true);
    axios
      .post(`${domain}/api/forget-password-email`, {
        email: data.email,
      })
      .then((res) => {
        toast.success(res?.data?.message, {
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        form.reset();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        if (err?.response?.status == 500) {
          toast.error(
            "Unable to process your request at moment. Please try in a moment.",
            {
              position: "top-center",
              style: {
                background: "#333",
                color: "#fff",
              },
            },
          );
          return;
        }
        toast.error(
          err?.response?.data?.message ||
            "Unable to process your request at moment. Please try in a moment.",
          {
            position: "top-center",
            style: {
              background: "#333",
              color: "#fff",
            },
          },
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-60px)] bg-gray-100  dark:bg-[rgba(13,17,23)]">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Forgot Password
            </h2>
            <p className="mb-4">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full sm:w-2/3 mx-auto space-y-8"
            >
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  className="w-full max-w-[300px]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
