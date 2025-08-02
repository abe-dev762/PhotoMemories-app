import * as React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
 } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from '@/context/UserAuthContext';


interface UserSignUp {
    email: string;
    password: string;
    confirmedPassword: string;
};


const initialValue: UserSignUp = {
  email: "",
  password: "",
  confirmedPassword: "",
  
};

interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const [userInfo, setUserInfo] = React.useState<UserSignUp>(initialValue);
  const { googleSignIn, signUp } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(userInfo.email, userInfo.password);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleGoogleSignIn = async(e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  return (
   <div className='bg-slate-800 w-full h-screen'>
    <div className='container mx-auto p-6 h-full pl-2'>
      <div className='max-w-sm rounded-xl border bg-card text-card-foreground mx-auto'>
    <Card>
      <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-center items-center">
          <Button 
          variant="outline" 
          className='w-1/2'
          onClick={handleGoogleSignIn}
          >
            <svg role="img" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email-create-account">Email</Label>
          <Input
            id="email-create-account"
            type="email"
            placeholder="john@example.com"
            value={userInfo.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setUserInfo({...userInfo, email: e.target.value})
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password-create-account">Password</Label>
          <Input 
          id="password-create-account" 
          type="password"
          value={userInfo.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirm-password-account">Confirm password</Label>
          <Input 
          id="confirm-password-account" 
          type="password"
          value={userInfo.confirmedPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setUserInfo({ ...userInfo, confirmedPassword: e.target.value })
          }
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-1">Create account</Button>
      </CardFooter>
      <p className='mt-3 text-sm text-center'>
          Already have an account ? <Link to="/login" className='hover:text-blue-600 text-decoration-line: underline'>Log in here</Link>
        </p>
     </form>    
    </Card>
     </div>
    </div>
   </div>
  )
}

export default Signup;