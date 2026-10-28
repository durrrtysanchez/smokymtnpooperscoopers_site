import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-emerald-950 flex items-center justify-center px-4">
      <SEO
        title="Page Not Found | Smoky Mountain Pooper Scoopers"
        description="The page you requested could not be found. Explore pet waste removal services in Knoxville and East Tennessee."
        path={location.pathname}
        noindex
      />
      <main className="max-w-xl text-center py-16">
        <p className="text-emerald-700 font-black uppercase tracking-widest">Error 404</p>
        <h1 className="text-4xl md:text-5xl font-black mt-3">We couldn’t find that page.</h1>
        <p className="text-slate-600 mt-4">The address may be outdated or mistyped. You can return to our homepage, request a quote, or call us for help.</p>
        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 font-bold text-white">
            <ArrowLeft className="w-4 h-4" /> Homepage
          </Link>
          <Link to="/quote" className="inline-flex justify-center rounded-md border border-emerald-700 px-5 py-3 font-bold text-emerald-800">Request a Quote</Link>
          <a href="tel:865-601-2002" className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-200 px-5 py-3 font-bold text-emerald-800">
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </div>
      </main>
    </div>
  );
}
