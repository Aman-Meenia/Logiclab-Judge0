"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordPage = () => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const params = useParams<{ token: string }>();
  const { token } = params;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    axios
      .post(`${domain}/api/forget-password`, {
        password: data.password,
        token: token[0],
      })
      .then((res) => {
        toast.success(res?.data?.message || "Password reset successfully!", {
          position: "top-center",
          style: { background: "#333", color: "#fff" },
        });
        form.reset();
        router.push("/login");
      })
      .catch((err) => {
        const errorMsg =
          err?.response?.data?.message ||
          "Unable to process your request. Please try again.";
        toast.error(errorMsg, {
          position: "top-center",
          style: { background: "#333", color: "#fff" },
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-60px)] bg-gray-100 dark:bg-[rgba(13,17,23)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Reset Your Password
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full sm:w-2/3 mx-auto space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
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
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
//
// const ResetPasswordPage = () => {
//   const domain = process.env.NEXT_PUBLIC_DOMAIN;
//   const params = useParams<{ token: string }>();
//   const { token } = params;
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//
//   const form = useForm({
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//   });
//
//   const onSubmit = async (data: {
//     password: string;
//     confirmPassword: string;
//   }) => {
//     axios
//       .post(`${domain}/api/forget-password-email`, {
//         password: data.password,
//         token: token,
//       })
//       .then((res) => {
//         toast.success(res?.data?.message, {
//           position: "top-center",
//           style: {
//             background: "#333",
//             color: "#fff",
//           },
//         });
//         form.reset();
//       })
//       .catch((err) => {
//         console.log(err?.response?.data);
//         if (err?.response?.status == 500) {
//           toast.error(
//             "Unable to process your request at moment. Please try in a moment.",
//             {
//               position: "top-center",
//               style: {
//                 background: "#333",
//                 color: "#fff",
//               },
//             },
//           );
//           return;
//         }
//         toast.error(
//           err?.response?.data?.message ||
//             "Unable to process your request at moment. Please try in a moment.",
//           {
//             position: "top-center",
//             style: {
//               background: "#333",
//               color: "#fff",
//             },
//           },
//         );
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };
//
//   return (
//     <>
//       <div className="flex justify-center items-center min-h-[calc(100vh-60px)] bg-gray-100  dark:bg-[rgba(13,17,23)]">
//         <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//               Reset Your Password
//             </h2>
//           </div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="w-full sm:w-2/3 mx-auto space-y-8"
//             >
//               <FormField
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>New Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter new password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm New Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Confirm new password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex justify-center">
//                 <Button
//                   className="w-full max-w-[300px]"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Resetting
//                     </>
//                   ) : (
//                     "Reset Password"
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// };
//
// export default ResetPasswordPage;
