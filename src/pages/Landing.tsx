
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FeatureProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const features: FeatureProps[] = [
  {
    title: "Client Management",
    description: "Store client information, track communications, and manage relationships in one place.",
    Icon: CheckCircle,
  },
  {
    title: "Task Tracking",
    description: "Create, assign, and track tasks to ensure nothing falls through the cracks.",
    Icon: CheckCircle,
  },
  {
    title: "Detailed Analytics",
    description: "Get insights into your client relationships with comprehensive reports.",
    Icon: CheckCircle,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-crm-yellow-light via-white to-white z-0"></div>
        
        {/* Header */}
        <header className="relative z-10 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/80305d05-878e-475f-b522-7d2fea708da8.png" 
                alt="ClientVortex Logo" 
                className="h-8" 
              />
              <span className="text-xl font-bold">ClientVortex</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-700 hover:text-crm-yellow transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-crm-yellow transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-crm-yellow transition-colors">Testimonials</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-crm-yellow">
                Log In
              </Link>
              <Link to="/dashboard">
                <Button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        {/* Hero content */}
        <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Manage your clients with ease and precision
              </h1>
              <p className="text-lg text-gray-600">
                ClientVortex helps businesses streamline client management, boost productivity, and drive growth with an intuitive all-in-one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-crm-yellow hover:bg-crm-yellow-hover text-black">
                    Start Free Trial
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Take a Tour
                </Button>
              </div>
              <p className="text-sm text-gray-500">No credit card required. 14-day free trial.</p>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <AspectRatio ratio={16/9}>
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2070&q=80" 
                    alt="ClientVortex Dashboard" 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              {/* Stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-crm-yellow">+38%</div>
                <div className="text-sm">Client retention</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need in one place</h2>
            <p className="text-gray-600">
              Our platform provides powerful tools to manage every aspect of your client relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-crm-yellow-light rounded-full flex items-center justify-center mb-4">
                  <feature.Icon className="text-crm-yellow" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <a href="#" className="inline-flex items-center text-crm-yellow font-medium hover:underline">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600">
              Choose the plan that fits your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Starter</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Perfect for freelancers and small businesses.</p>
              </div>
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Up to 50 clients</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Task management</span>
                  </li>
                </ul>
              </div>
              
              <Button className="w-full mt-6">Get Started</Button>
            </div>
            
            {/* Professional Plan */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-crm-yellow relative">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-crm-yellow text-black px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Professional</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Ideal for growing businesses.</p>
              </div>
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Up to 200 clients</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Email integration</span>
                  </li>
                </ul>
              </div>
              
              <Button className="w-full mt-6 bg-crm-yellow hover:bg-crm-yellow-hover text-black">
                Get Started
              </Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Enterprise</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mt-2">For established businesses with advanced needs.</p>
              </div>
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Unlimited clients</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Custom analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-crm-yellow mr-2" />
                    <span>API access</span>
                  </li>
                </ul>
              </div>
              
              <Button className="w-full mt-6">Get Started</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What our customers say</h2>
            <p className="text-gray-600">
              Trusted by businesses worldwide to manage their clients effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-1 text-crm-yellow mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "ClientVortex has transformed how we manage our clients. The interface is intuitive and the analytics provide valuable insights."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Sarah Thompson</h4>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-1 text-crm-yellow mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The task management feature has been a game-changer for our team. No more missed deadlines or forgotten follow-ups."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-500">Project Manager</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-1 text-crm-yellow mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "As a small business owner, ClientVortex has helped me stay organized and professional with my clients. Worth every penny!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Emily Chen</h4>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-crm-yellow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to streamline your client management?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using ClientVortex to grow their business and improve client relationships.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
              Start Your Free Trial
            </Button>
          </Link>
          <p className="mt-4 text-sm">No credit card required. 14-day free trial.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/lovable-uploads/80305d05-878e-475f-b522-7d2fea708da8.png" 
                  alt="ClientVortex Logo" 
                  className="h-8" 
                />
                <span className="font-bold">ClientVortex</span>
              </div>
              <p className="text-gray-400 text-sm">
                Streamlining client management for businesses of all sizes.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 ClientVortex. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
