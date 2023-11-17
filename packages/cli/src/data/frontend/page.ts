// react clerk auth pages /  modified pages
export const react_index_tsx = `
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Card from "./components/Card";

function Home() {
  return (
    <div className="ml-5 mt-8">
      <p className="text-dark-100 font-poppins ">Home Page</p>
      <SignedIn>
        <a href="/dashboard" className="text-dark-100 underline font-poppins">
          Dashboard
        </a>
      </SignedIn>
      <SignedOut>
        <a
          href="/sign-in"
          className="text-dark-100 underline font-poppins pr-4"
        >
          Sign-up
        </a>
        <a href="/sign-up" className="text-dark-100 underline font-poppins">
          Sign-in
        </a>
      </SignedOut>
      <Card />
    </div>
  );
}

export default Home;
`;

export const react_dashboard_tsx = `
import { UserButton } from "@clerk/clerk-react";

function Dashboard() {
  return (
    <div className="px-7 py-4">
      <UserButton />
      <span className="text-dark-100 font-poppins">Dashboard</span>
    </div>
  );
}

export default Dashboard;
`;

export const react_sign_in_tsx = `
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}

export default SignInPage;
`;

export const react_sign_up_tsx = `
import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}

export default SignUpPage;
`;

export const react_Auth_app_tsx = `
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Dashboard from "./dashboard";
import Home from "./index";
import SignInPage from "./auth/sign-in";
import SignUpPage from "./auth/sign-up";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey as string}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
`;
