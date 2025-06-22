'use client'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { accessToken, refreshToken } = await loginUser(data.username, data.password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/admin");
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-5">
      <a href="/" className="bg-blue-200 shadow-xl rounded-full px-3 py-1 font-bold"> Vault Home</a>
      <img src="/dtu.png" alt="DTU Logo" className="w-40 h-auto rounded-full"/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-lg shadow-xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center ">Admin Login</h1>

        <div className="mb-4">
          <input
            {...register("username")}
            className="w-full p-2 shadow-md  rounded-xl focus:outline-none"
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 shadow-md  rounded-xl focus:outline-none"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-200 shadow-md text-zinc font-semibold px-6 py-2 my-6 rounded-full hover:bg-slate-300 transition disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
