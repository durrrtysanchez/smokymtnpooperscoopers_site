import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Sparkles } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-lime-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-emerald-200 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Sparkles className="w-16 h-16 text-emerald-700" />
          </div>
          <CardTitle className="text-3xl text-emerald-900">Smoky Mountain Pooper Scoopers</CardTitle>
          <CardDescription className="text-lg">Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            onClick={login}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-6 text-lg transition-all duration-300 hover:shadow-lg"
            size="lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>
          <p className="text-center text-sm text-emerald-600">
            Secure authentication powered by Emergent
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
