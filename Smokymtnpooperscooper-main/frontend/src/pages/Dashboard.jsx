import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { LogOut, User, Mail, Calendar, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-lime-50">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-emerald-700" />
            <h1 className="text-xl md:text-2xl font-bold text-emerald-900">Smoky Mountain Pooper Scoopers</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-800 font-medium hidden md:block">{user?.name}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Card */}
          <Card className="border-2 border-emerald-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-emerald-900">Welcome, {user?.name}! 👋</CardTitle>
              <CardDescription className="text-lg">Your business dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                <Mail className="w-5 h-5 text-emerald-700" />
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Email</p>
                  <p className="text-emerald-900">{user?.email}</p>
                </div>
              </div>

              {user?.picture && (
                <div className="flex items-center gap-3">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full border-2 border-emerald-300"
                  />
                  <p className="text-emerald-700">Profile Picture</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-emerald-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-emerald-900">Contact Submissions</CardTitle>
                <CardDescription>View recent inquiries from your website</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" onClick={() => navigate('/contacts')}>
                  View Contacts
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-emerald-900">Public Website</CardTitle>
                <CardDescription>View your landing page</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-lime-600 hover:bg-lime-700 text-white" onClick={() => navigate('/')}>
                  Go to Landing Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
