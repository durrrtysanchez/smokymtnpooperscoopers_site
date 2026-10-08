import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { LogOut, Mail, Phone, MessageSquare, Calendar, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contacts = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/contact/`, {
        withCredentials: true
      });
      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-lime-50">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-emerald-700" />
            <h1 className="text-xl md:text-2xl font-bold text-emerald-900">Contact Submissions</h1>
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
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div>
              <p className="text-emerald-800 font-medium">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <Card className="border-2 border-emerald-200">
              <CardContent className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <p className="text-emerald-700 text-lg">No contact submissions yet</p>
                <p className="text-emerald-600 mt-2">When customers fill out your contact form, they'll appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <p className="text-emerald-800 font-medium">{contacts.length} total submission{contacts.length !== 1 ? 's' : ''}</p>
              
              {contacts.map((contact) => (
                <Card key={contact.id} className="border-2 border-emerald-200 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-emerald-900">{contact.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(contact.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <Mail className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-emerald-600 font-medium">Email</p>
                        <a href={`mailto:${contact.email}`} className="text-emerald-900 hover:text-emerald-700 transition-colors">
                          {contact.email}
                        </a>
                      </div>
                    </div>

                    {contact.phone && (
                      <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                        <Phone className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-emerald-600 font-medium">Phone</p>
                          <a href={`tel:${contact.phone}`} className="text-emerald-900 hover:text-emerald-700 transition-colors">
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-emerald-600 font-medium mb-1">Message</p>
                        <p className="text-emerald-900 whitespace-pre-wrap">{contact.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contacts;
