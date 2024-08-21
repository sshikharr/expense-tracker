import MyMenubar1 from "../components/myComponents/Topbar/MyMenubar1";
import { Button } from "../components/ui/button";
import yoyoImage from "../assets/yoyo.jpg";
import yoyoImage2 from "../assets/yoyo2.jpg";
import { ThemeProvider } from "../components/theme-provider";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const myRef = useRef<HTMLDivElement | null>(null);

  function handleScroll() {
    myRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <MyMenubar1 onClick={handleScroll} />
        <div className="md:h-screen md:flex md:flex-row w-screen justify-center mt-4 bg-gradient-to-br from-orange-400 to-purple-400 min-h-screen dark:from-slate-950 dark:to-slate-950 py-8">
          <div className="flex flex-col h-full md:justify-center md:px-10 md:gap-4 md:w-1/2 gap-8 w-full">
            <div className="md:text-5xl font-bold text-4xl">
              <h1 className="text-center md:text-start mt-8">Take control of your expenses</h1>
            </div>
            <div className="break-words">
              <p className="text-center md:text-start mx-2">
                Our expense tracking tool helps you stay on top of your finances and make smarter spending decisions.
              </p>
            </div>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <Button
                className="text-white w-25 dark:text-black"
                onClick={() => {
                  navigate('/signin')
                }}
              >
                Get Started
              </Button>
              <Button variant={"outline"} className="text-black w-25 dark:text-white" onClick={handleScroll}>
                Learn More
              </Button>
            </div>
          </div>

          <div className="md:flex md:flex-row md:justify-center md:w-1/2 flex justify-center mt-10">
            <div className="md:flex md:flex-col md:justify-center w-2/3">
              <img src={yoyoImage} alt="Yoyo" className="xl:h-4/6 shadow-5xl rounded-3xl" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center bg-gray-100 h-auto py-32 gap-10 dark:bg-slate-950" ref={myRef}>
          <div className="text-center md:w-5/12">
            <h1 className="font-normal">Key Features</h1>
            <h1 className="text-5xl font-bold pt-2">Simplify your finances</h1>
            <p className="break-words text-gray-500 mt-2">
              Our expense tracking tool helps you easily categorize and monitor your spending, so you can make more informed financial decisions.
            </p>
          </div>

          <div className="w-full h-auto flex flex-row">
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="w-4/6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-xl">Expense Tracking</h3>
                  <p className="break-words text-gray-600">
                    Easily categorize and monitor your expenses to gain better visibility into your spending.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-xl">Budgeting</h3>
                  <p className="break-words text-gray-600">
                    Set budgets for different expense categories and receive alerts when you're approaching your limits.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-xl">Reporting</h3>
                  <p className="break-words text-gray-600">
                    Generate detailed reports to analyze your spending patterns and make more informed financial decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:flex md:justify-center hidden">
              <img src={yoyoImage2} alt="Yoyo" className="max-h-64 shadow-5xl rounded-3xl" />
            </div>
          </div>
        </div>
        <footer>
          <div className="h-16 flex flex-col justify-center">
            <div className="flex justify-end px-8 gap-6 text-sm">
              <a className="hover:cursor-pointer hover:underline">Developer</a>
              <a className="hover:cursor-pointer hover:underline">Github</a>
            </div>
          </div>
        </footer>
      </ThemeProvider>
    </>
  );
}

export default LandingPage;