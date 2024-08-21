import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

import Topbar from "../components/myComponents/Topbar/Topbar";
import { ThemeProvider } from "../components/theme-provider";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { boolUser, User } from "../store/store1";
import { useRecoilState } from "recoil";

const signinSchema = z.object({
  username: z.string(),
  name: z.string(),
  password: z.string(),
});

function Signin() {
  const navigate = useNavigate();
  const [currentSession, setCurrentSession] = useRecoilState(boolUser);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementRef2 = useRef<HTMLDivElement>(null);
  const signin = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentSession) {
      localStorage.setItem("session", JSON.stringify(currentSession));
    }
  }, [currentSession]);

  function onSubmit(values: z.infer<typeof signinSchema>) {
    const request = indexedDB.open("uuDB5", 1);

    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("users")) {
        const objectStore = db.createObjectStore("users", { keyPath: "username" });
        objectStore.createIndex("username", "username", { unique: true });
      }
    };

    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["users"], "readonly");
      const objectStore = transaction.objectStore("users");
      const index = objectStore.index("username");
      const getRequest = index.get(values.username);

      getRequest.onsuccess = function (event) {
        const user = (event.target as IDBRequest).result;
        if (user) {
          const userInfo: User = {
            username: user.username,
            name: user.name,
            password: user.password,
            transactions: user.transactions,
          };
          if (user.password === values.password) {
            setCurrentSession(true);
            localStorage.setItem("session", JSON.stringify(true));
            localStorage.setItem("storedUser", JSON.stringify(userInfo));
            console.log("User info stored in local storage:", userInfo); // Debug log
            navigate("/dashboard");
          } else {
            elementRef.current?.classList.remove("hidden");
            elementRef.current?.classList.add("block");
          }
        } else {
          elementRef2.current?.classList.remove("hidden");
          elementRef2.current?.classList.add("block");
        }
      };

      getRequest.onerror = function (event) {
        console.error("Error getting user:", (event.target as IDBRequest).error);
      };
    };

    request.onerror = function (event) {
      console.error("Database error:", (event.target as IDBRequest).error);
    };
  }

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Topbar />
        <div className="w-screen flex flex-col items-center gap-2 py-40">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="text-gray-600 w-2/3 text-center text-xs md:text-base">
              Get started with our financial dashboard today.
            </p>
          </div>

          <div className="w-1/2">
            <Form {...signin}>
              <form onSubmit={signin.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={signin.control}
                  name="username"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={signin.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <div className="flex justify-center text-red-600">
                  <p className="hidden" ref={elementRef}>
                    Wrong credentials
                  </p>
                  <p className="hidden" ref={elementRef2}>
                    User not found
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
              <div className="w-full flex flex-row justify-center gap-2 mt-4 text-xs md:text-sm">
                <p>Don't have an account</p>
                <a
                  className="underline hover:cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Signup
                </a>
              </div>
            </Form>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Signin;