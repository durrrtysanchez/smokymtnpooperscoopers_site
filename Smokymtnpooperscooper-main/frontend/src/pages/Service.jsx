import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Phone, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

const SERVICE_DATA = {
  'weekly-pooper-scooper-service': {
    title: 'Weekly Pooper Scooper Service Knoxville TN | Smoky Mountain',
    description: 'Weekly pet waste removal in Knoxville and East Tennessee. Starting at $14.99/week for qualifying residential service, with first cleaning free when you enroll in recurring weekly visits.',
    heading: 'Weekly pet waste removal, without the chore.',
    intro: 'Keep your yard consistently clean with dependable recurring pet waste removal. We handle the dirty work so you can spend your time enjoying your yard instead of watching where you step.',
    price: '$14.99/week',
    serviceName: 'Weekly Pet Waste Removal',
    serviceType: 'Residential recurring pet waste removal',
    bullets: [
      'Recurring weekly yard cleanup',
      'Simple scheduling',
      'No long-term contract for standard residential service',
      'Service for qualifying homes in the greater Knoxville area',
      'First cleaning free when you enroll in recurring weekly visits'
    ],
    faqs: [
      ['How much does weekly service cost?', 'Weekly residential service starts at $14.99 for qualifying properties. Final pricing can vary based on property size, dog count, and service requirements.'],
      ['Is the first cleaning really free?', 'Yes. The first cleaning is free when you enroll in recurring weekly service, subject to service-area and pricing confirmation.'],
      ['How do I get started?', 'Request a quote with your address, number of dogs, and preferred frequency. We will confirm availability and pricing.']
    ]
  },
  'one-time-yard-cleanup': {
    title: 'One-Time Dog Waste Cleanup Knoxville TN | Yard Cleanup',
    description: 'One-time pet waste and dog poop yard cleanup in Knoxville and East Tennessee. Great for neglected yards, move-outs, guests, spring cleaning, and property turnovers.',
    heading: 'Need a yard reset? We clean up the mess.',
    intro: 'One-time pet waste cleanup is ideal when the yard has gotten away from you. We can help before guests arrive, during a move, after a busy season, or whenever you want a clean slate.',
    price: 'Get a quote',
    serviceName: 'One-Time Pet Waste Cleanup',
    serviceType: 'One-time pet waste and yard cleanup',
    bullets: [
      'One-time dog waste removal',
      'Neglected-yard cleanup',
      'Move-out and move-in cleanup',
      'Pre-event and guest-ready cleanup',
      'Spring and seasonal cleanup projects'
    ],
    faqs: [
      ['How much does a one-time cleanup cost?', 'Pricing depends on the size of the property, amount of waste, number of dogs, and condition of the yard. Request a quote for an exact price.'],
      ['Can I switch to weekly service afterward?', 'Yes. We can discuss recurring service after the initial cleanup when the property is eligible for our service area.'],
      ['Do I need to be home?', 'Usually not. We can confirm the service instructions and access details when scheduling.']
    ]
  },
  'pet-waste-station-service': {
    title: 'Pet Waste Station Service Knoxville TN | East Tennessee',
    description: 'Pet waste station service and routine waste removal for apartments, HOAs, dog parks, businesses, and shared pet areas in Knoxville and East Tennessee.',
    heading: 'Keep shared pet areas cleaner and easier to manage.',
    intro: 'High-traffic pet areas need consistent attention. We service pet waste stations and remove waste on a recurring schedule for properties that need dependable maintenance.',
    price: 'Custom plans',
    serviceName: 'Pet Waste Station Service',
    serviceType: 'Pet waste station maintenance and waste removal',
    bullets: [
      'Recurring pet waste station service',
      'Apartment and multifamily properties',
      'HOAs and neighborhood common areas',
      'Dog parks and shared pet areas',
      'Custom service schedules for commercial properties'
    ],
    faqs: [
      ['Who is this service for?', 'We work with apartments, property managers, HOAs, dog parks, businesses, and other properties with shared pet areas.'],
      ['Can you handle multiple properties?', 'Yes. Include the property locations and service needs in your quote request so we can build an appropriate service plan.'],
      ['Can station service be combined with cleanup?', 'Yes. Pet waste station maintenance can be included in a broader commercial pet waste service plan.']
    ]
  }
};

export default function Service() {
  const { serviceSlug } = useParams();
  const data = SERVICE_DATA[serviceSlug];

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-emerald-950 flex items-center justify-center px-4">
        <SEO title="Page Not Found | Smoky Mountain Pooper Scoopers" description="The page you requested could not be found. View our pet waste removal services in Knoxville and East Tennessee." path={`/${serviceSlug || ''}`} noindex />
        <main className="max-w-xl text-center py-16">
          <p className="text-emerald-700 font-black uppercase tracking-widest">Page not found</p>
          <h1 className="text-4xl font-black mt-3">That service page doesn’t exist.</h1>
          <p className="text-slate-600 mt-4">Explore our pet waste removal services or request a quote for your property.</p>
          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/" className="inline-flex justify-center rounded-md bg-emerald-700 px-5 py-3 font-bold text-white">Visit Homepage</Link>
            <Link to="/quote" className="inline-flex justify-center rounded-md border border-emerald-700 px-5 py-3 font-bold text-emerald-800">Request a Quote</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-emerald-950">
      <SEO
        title={data.title}
        description={data.description}
        path={`/${serviceSlug}`}
        service={{ name: data.serviceName, serviceType: data.serviceType, description: data.description }}
      />

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-emerald-950">
            <Sparkles className="w-7 h-7 text-emerald-700" />
            Smoky Mountain Pooper Scoopers
          </Link>
          <a href="tel:865-601-2002" className="hidden sm:block font-bold text-emerald-800">865-601-2002</a>
          <Link to="/quote"><Button className="bg-emerald-700 hover:bg-emerald-800">Get a Quote</Button></Link>
        </div>
      </header>

      <main>
        <section className="bg-emerald-950 text-white">
          <div className="container mx-auto px-4 py-20 md:py-28 max-w-5xl">
            <p className="text-lime-300 font-black uppercase tracking-widest">Knoxville & East Tennessee</p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mt-3">{data.heading}</h1>
            <p className="text-xl text-emerald-100 leading-relaxed mt-6 max-w-3xl">{data.intro}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/quote"><Button size="lg" className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold">Get My Free Quote <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
              <a href="tel:865-343-1142"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-950"><Phone className="w-5 h-5 mr-2" /> Call Us</Button></a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-emerald-50">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-emerald-700 font-black uppercase tracking-widest">What you get</p>
              <h2 className="text-3xl md:text-4xl font-black mt-2">A cleaner property without the hassle.</h2>
              <ul className="mt-7 space-y-4">
                {data.bullets.map(item => (
                  <li key={item} className="flex items-start gap-3 text-lg text-emerald-900">
                    <Check className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-lg p-8">
              <p className="text-sm font-black uppercase tracking-widest text-emerald-700">Starting point</p>
              <div className="text-4xl font-black mt-2 text-emerald-900">{data.price}</div>
              <p className="text-slate-600 mt-3">Exact pricing depends on property and service requirements.</p>
              <Link to="/quote" className="block mt-7">
                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 py-6">Request Pricing</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black text-center">Frequently asked questions</h2>
            <div className="grid md:grid-cols-2 gap-5 mt-10">
              {data.faqs.map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-emerald-100 p-6">
                  <h3 className="font-black text-emerald-950">{q}</h3>
                  <p className="text-slate-600 leading-relaxed mt-2">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-emerald-900 text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black">Ready to get the mess handled?</h2>
            <p className="text-emerald-100 text-lg mt-4">Get a quote for service in Knoxville and surrounding East Tennessee communities.</p>
            <Link to="/quote" className="inline-block mt-7">
              <Button size="lg" className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold px-8">Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
