import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { user, boolUser, User } from "../store/store1";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ThemeProvider } from "../components/theme-provider";
import Topbar from "../components/myComponents/Topbar/Topbar";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
  username: z.string().min(6, {
    message: "Username must contain at least 6 characters",
  }).max(50),
  name: z.string(),
  password: z.string().min(8)
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
});

export function Signup() {
  const navigate = useNavigate();
  const myRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [currentSession, setCurrentSession] = useRecoilState(boolUser);
  const setNewUser = useSetRecoilState(user);
  const signup = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
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

  function addUserToDB(db: IDBDatabase, user: User) {
    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");
    const addRequest = objectStore.add(user);

    addRequest.onsuccess = function () {
      localStorage.setItem("storedUser", JSON.stringify(user));
      setNewUser(user);
      setCurrentSession(true);
      localStorage.setItem("session", "true");
      navigate("/dashboard");
    };

    addRequest.onerror = function (event) {
      console.error("Error adding user:", (event.target as IDBRequest).error);
    };
  }

  function onSubmit(values: z.infer<typeof signupSchema>) {
    const user = {
      username: values.username,
      name: values.name,
      password: values.password,
      transactions: [],
      budget:[]
    };
    const request = indexedDB.open("uuDB11", 1);

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
      const getRequest = index.get(user.username);

      getRequest.onsuccess = function (event) {
        const userAlready = (event.target as IDBRequest).result;
        if (userAlready) {
          if (userAlready.username === user.username) {
            elementRef.current?.classList.remove("hidden");
            elementRef.current?.classList.add("block");
          } else {
            addUserToDB(db, user);
          }
        } else {
          addUserToDB(db, user);
        }
      };
    };
  }
  return (
    <>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Topbar/>
    <div className="w-screen h-svh bg-gradient-to-br from-orange-100 to-purple-100 dark:from-slate-950 dark:to-slate-950">
        <div className="w-full flex flex-col items-center h-4/5 bg-gradient-to-br from-orange-400 to-purple-400 justify-center gap-4 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 ">
        <div className=" flex flex-row justify-center w-full">
            <h1 className="md:text-5xl font-bold text-white text-4xl text-center w-full">
            Take control of your finances 
            </h1>
        </div>
        
        <p className="md:w-5/12 break-words text-center text-gray-100 text-xs w-9/12">
            Unlock the power of our financial dashboard to gain insights, make informed decisions, and achieve your financial goals.
        </p>
        <Button onClick={()=>{
            myRef.current?.scrollIntoView({
            behavior: "smooth"
        })
        }}>Signup</Button>
        </div>
    </div>
    <div className="w-screen flex flex-col items-center gap-2 py-40" ref={myRef}>
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-600 w-2/3 text-center text-xs md:text-base">Get started with our financial dashaboard today.</p>
        </div>
            
            <div className="w-1/2">
            <Form {...signup}>
            <form onSubmit={signup.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={signup.control}
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
                control={signup.control}
                name="name"
                render={({ field }) => (
                    <>
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    </>
                )}
                />

                <FormField
                control={signup.control}
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
                    <p className="hidden" ref={elementRef}>User already exists</p>
                </div>
                <Button type="submit" className="w-full">Register</Button>
            </form>
            <div className="w-full flex flex-row justify-center gap-2 mt-4 text-xs md:text-sm">
                <p className="">Already have an account?</p>
                <a className="underline hover:cursor-pointer" onClick={()=>{
                    navigate('/signin')
                }}>Signin</a>
            </div>
            </Form>
            </div>
    </div>
    </ThemeProvider>
    </>
  )
}