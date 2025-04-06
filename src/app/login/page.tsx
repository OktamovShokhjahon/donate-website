import LoginForm from "@/app/components/login-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Bosh sahifaga
          </Link>
        </div>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
          Hisobingizga kiring
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
