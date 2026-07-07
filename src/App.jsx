import React, { useState, useEffect } from 'react';
import {
  Home as HomeIcon,
  Calendar,
  LifeBuoy,
  User,
  Search,
  Bell,
  ChevronRight,
  Star,
  MapPin,
  Shield,
  ArrowLeft,
  Camera,
  Check,
  CheckCircle,
  Phone,
  MessageSquare,
  Navigation,
  Upload,
  X,
  Info,
  ExternalLink,
  AlertCircle,
  Clock,
  CreditCard,
  TrendingUp,
  Plus,
  Compass,
  ArrowRight,
  Scissors
} from 'lucide-react';

// ==========================================
// MOCK DATA SETUP
// ==========================================

const PROVIDERS = [
  {
    id: 1,
    name: 'Sri Sai Plumbing & Repairs',
    category: 'Plumbing',
    rating: 4.8,
    reviewsCount: 142,
    price: 249,
    experience: '6 yrs',
    jobsDone: '340+',
    address: 'Sector 4, HSR Layout, Bengaluru',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Expert leak detection, pipe fixing, and sanitary installs. Quick response time and certified work.',
    recentReviews: [
      { id: 1, name: 'Ramesh K.', rating: 5, comment: 'Very professional. Resolved the clogged kitchen pipe in 15 mins.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh' },
      { id: 2, name: 'Ankita M.', rating: 4, comment: 'Punctual and neat work. Recommended!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ankita' }
    ]
  },
  {
    id: 2,
    name: 'Imran Appliance Care',
    category: 'Appliances',
    rating: 4.9,
    reviewsCount: 289,
    price: 299,
    experience: '8 yrs',
    jobsDone: '512+',
    address: 'Sector 3, HSR Layout, Bengaluru',
    distance: '1.5 km',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Specialist in Washing Machine, Fridge, and Microwave repairs. Genuine spares and 30-day warranty.',
    recentReviews: [
      { id: 1, name: 'Pooja R.', rating: 5, comment: 'Technician Imran fixed my washing machine error code. Highly recommended.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja' },
      { id: 2, name: 'Rahul V.', rating: 5, comment: 'Polite and explained what was wrong with the fridge compressor. Fast fix.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' }
    ]
  },
  {
    id: 3,
    name: 'Sharma Electricals & AC',
    category: 'AC Repair',
    rating: 4.7,
    reviewsCount: 96,
    price: 199,
    experience: '4 yrs',
    jobsDone: '180+',
    address: 'Sector 7, HSR Layout, Bengaluru',
    distance: '0.8 km',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A/C servicing, gas filling, electrical wiring, and smart home setups. Certified electrician crew.',
    recentReviews: [
      { id: 1, name: 'Vikram S.', rating: 4, comment: 'AC cooling works perfectly now. Fast service.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' }
    ]
  },
  {
    id: 4,
    name: 'Rapid Plumbing Solutions',
    category: 'Plumbing',
    rating: 4.5,
    reviewsCount: 68,
    price: 189,
    experience: '3 yrs',
    jobsDone: '110+',
    address: 'Sector 2, HSR Layout, Bengaluru',
    distance: '2.4 km',
    image: 'https://images.unsplash.com/photo-1542013936693-8848e574047a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Emergency plumbing repairs, tap fixes, and pipe cleaning services available 24/7.',
    recentReviews: [
      { id: 1, name: 'Karthik N.', rating: 5, comment: 'Helped resolve a midnight leak. Saviour!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik' }
    ]
  },
  {
    id: 5,
    name: 'Apex Electrical Services',
    category: 'Electrical',
    rating: 4.6,
    reviewsCount: 120,
    price: 149,
    experience: '5 yrs',
    jobsDone: '220+',
    address: 'Sector 1, HSR Layout, Bengaluru',
    distance: '1.9 km',
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Safe and secure home electrical installations, repairs, switchboard servicing, and UPS repair.',
    recentReviews: [
      { id: 1, name: 'Megha D.', rating: 5, comment: 'Very skilled. Replaced the fuse box quickly.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Megha' }
    ]
  }
];

export default function App() {
  // Navigation & Role Settings
  const [role, setRole] = useState(null); // 'customer' | 'provider' | null
  const [currentScreen, setCurrentScreen] = useState(1); // Screen ID/Index
  const [navStack, setNavStack] = useState([]); // Dynamic stack for robust back buttons

  // Global Mock Interaction States (Cross-Flow Data Binding)
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[0]);
  const [selectedCategory, setSelectedCategory] = useState('Plumbing');
  const [uploadedIssuePhoto, setUploadedIssuePhoto] = useState(null); // base64 or static string
  const [serviceAddress, setServiceAddress] = useState('Flat 402, Royal Enclave, HSR Layout, Bengaluru');
  const [dayPreference, setDayPreference] = useState('Today'); // 'Today' | 'Tomorrow' | 'Pick a date'
  const [timePreference, setTimePreference] = useState('9–11 AM'); // '9-11 AM' | '11-1 PM' | '4-6 PM'
  const [bookingNotes, setBookingNotes] = useState('AC is making a loud noise and not cooling properly.'); // Pre-populated for convenience
  const [bookingId, setBookingId] = useState('#TF10245');

  // Customer Tracking & Status State
  const [trackingStep, setTrackingStep] = useState(1); // 0: Confirmed, 1: On the way, 2: Arrived, 3: In Progress, 4: Done
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'Net Banking' | 'Cash'
  const [paymentError, setPaymentError] = useState(false); // Can trigger in payment screen
  const [customerRating, setCustomerRating] = useState(4);
  const [customerFeedbackComment, setCustomerFeedbackComment] = useState('');
  
  // Custom chat message store
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'technician', text: 'Hi! I am Suresh from Sri Sai Plumbing. I am packing up and leaving now.', time: '09:42 AM' },
    { id: 2, sender: 'technician', text: 'Please share your flat number or landmark if possible.', time: '09:43 AM' },
    { id: 3, sender: 'customer', text: 'Hi Suresh, it is Flat 402, Royal Enclave. Opposite to the park.', time: '09:45 AM' }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Provider Flow States
  const [providerLoginPhone, setProviderLoginPhone] = useState('');
  const [providerOtpSent, setProviderOtpSent] = useState(false);
  const [providerOtpCode, setProviderOtpCode] = useState('');
  const [providerJobAccepted, setProviderJobAccepted] = useState(false);
  const [declineReasonSheet, setDeclineReasonSheet] = useState(false);
  const [selectedDeclineReason, setSelectedDeclineReason] = useState('Busy');
  const [providerUploadedProof, setProviderUploadedProof] = useState(null); // base64 or static string
  const [providerNotes, setProviderNotes] = useState('Replaced capacitor, cleaned filter, tested cooling.');
  const [checklist, setChecklist] = useState({
    resolved: true,
    replaced: false,
    cleaned: true
  });
  const [providerStatusState, setProviderStatusState] = useState('pending'); // 'pending' | 'accepted' | 'in_progress' | 'awaiting_confirmation' | 'completed'

  // FAQs
  const [faqOpen, setFaqOpen] = useState({ 0: false, 1: false, 2: false });

  // Map Animation Coordinates
  const [technicianProgressPercent, setTechnicianProgressPercent] = useState(30);

  // Status Bar Time Simulation
  const [currentTimeStr, setCurrentTimeStr] = useState('09:41');

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minStr = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTimeStr(`${hours}:${minStr} ${ampm}`);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Map Position Simulation (technician moving towards customer)
  useEffect(() => {
    let anim;
    if (trackingStep === 1) { // On the way
      anim = setInterval(() => {
        setTechnicianProgressPercent(prev => {
          if (prev >= 90) return 30; // Reset loop
          return prev + 5;
        });
      }, 2000);
    }
    return () => clearInterval(anim);
  }, [trackingStep]);

  // Navigations Stack Helpers
  const navigateTo = (screenNum) => {
    setNavStack(prev => [...prev, currentScreen]);
    setCurrentScreen(screenNum);
  };

  const handleBack = () => {
    if (navStack.length > 0) {
      const prevScreen = navStack[navStack.length - 1];
      setNavStack(prev => prev.slice(0, -1));
      setCurrentScreen(prevScreen);
    } else {
      // Go back to selector
      setRole(null);
    }
  };

  const resetAll = () => {
    setRole(null);
    setCurrentScreen(1);
    setNavStack([]);
    setUploadedIssuePhoto(null);
    setProviderJobAccepted(false);
    setProviderStatusState('pending');
    setProviderUploadedProof(null);
    setTrackingStep(1);
    setPaymentError(false);
    setTechnicianProgressPercent(30);
  };

  // Switch role and sync screen
  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    setNavStack([]);
    if (selectedRole === 'customer') {
      setCurrentScreen(1); // Customer Splash
    } else {
      setCurrentScreen(11); // Provider Login
    }
  };

  // Mock Issue Upload Helper
  const handlePhotoUploadSim = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedIssuePhoto(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock Provider Proof Upload
  const handleProviderProofSim = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProviderUploadedProof(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (!newChatText.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: role === 'customer' ? 'customer' : 'technician',
      text: newChatText,
      time: timeStr
    }]);
    setNewChatText('');

    // Simulate reply after 1.5 seconds
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: role === 'customer' ? 'technician' : 'customer',
        text: role === 'customer' 
          ? 'Ok, understood. I am on my way!'
          : 'Thank you for updating. Please come soon!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  // Map canvas/SVG route coordinates
  const customerLoc = { x: 300, y: 150 };
  const providerLocStart = { x: 60, y: 320 };
  // Calculate dynamic position based on progress percent
  const currentProviderLocX = providerLocStart.x + ((customerLoc.x - providerLocStart.x) * technicianProgressPercent) / 100;
  const currentProviderLocY = providerLocStart.y + ((customerLoc.y - providerLocStart.y) * technicianProgressPercent) / 100;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row items-center justify-center p-4 gap-6 select-none font-sans text-trustText">
      
      {/* ==========================================
          LEFT: CONTROLS & MANUAL SCREEN JUMPERS
          ========================================== */}
      <div className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white flex flex-col gap-4 self-stretch justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white text-lg">T</div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-teal-400">TrustFix</h1>
              <p className="text-xs text-slate-400">Interactive Prototype Admin</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-slate-300">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => selectRole('customer')} 
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${role === 'customer' ? 'bg-teal-600 border-teal-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-755'}`}>
                Customer Role
              </button>
              <button 
                onClick={() => selectRole('provider')} 
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${role === 'provider' ? 'bg-teal-600 border-teal-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-755'}`}>
                Provider Role
              </button>
            </div>
            <button 
              onClick={resetAll} 
              className="w-full py-2 bg-rose-950 border border-rose-800 text-rose-200 hover:bg-rose-900 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all">
              <X size={14} /> Reset Prototype State
            </button>
          </div>

          <div className="mt-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-2">Screen Jumper</h2>
            <div className="max-h-60 overflow-y-auto no-scrollbar border border-slate-800 rounded-lg bg-slate-950 p-2 flex flex-col gap-1">
              
              <div className="text-[10px] uppercase font-bold text-teal-400 px-1 py-1 mt-1 border-b border-slate-900">Customer Flow</div>
              {[
                { num: 1, name: 'Splash Screen' },
                { num: 2, name: 'Home / Categories' },
                { num: 3, name: 'Provider Discovery' },
                { num: 4, name: 'Provider Profile' },
                { num: 5, name: 'Booking Details' },
                { num: 6, name: 'Booking Confirmed' },
                { num: 7, name: 'Live Tracking' },
                { num: 8, name: 'Payment screen' },
                { num: 9, name: 'Service Completion' },
                { num: 10, name: 'Support / Rework' }
              ].map(s => (
                <button
                  key={s.num}
                  onClick={() => {
                    setRole('customer');
                    setCurrentScreen(s.num);
                  }}
                  className={`text-left text-xs px-2 py-1.5 rounded transition-all flex items-center justify-between ${role === 'customer' && currentScreen === s.num ? 'bg-teal-900 text-white font-medium' : 'text-slate-400 hover:bg-slate-900'}`}>
                  <span>S{s.num}: {s.name}</span>
                  <ChevronRight size={12} className="opacity-50" />
                </button>
              ))}

              <div className="text-[10px] uppercase font-bold text-amber-500 px-1 py-1 mt-3 border-b border-slate-900">Provider Flow</div>
              {[
                { num: 11, name: 'Provider Login' },
                { num: 12, name: 'Provider Dashboard' },
                { num: 13, name: 'Job Details (#TF10245)' },
                { num: 14, name: 'Upload Completion Proof' },
                { num: 15, name: 'Earnings & Analytics' }
              ].map(s => (
                <button
                  key={s.num}
                  onClick={() => {
                    setRole('provider');
                    setCurrentScreen(s.num);
                  }}
                  className={`text-left text-xs px-2 py-1.5 rounded transition-all flex items-center justify-between ${role === 'provider' && currentScreen === s.num ? 'bg-amber-950 text-white font-medium' : 'text-slate-400 hover:bg-slate-900'}`}>
                  <span>S{s.num}: {s.name}</span>
                  <ChevronRight size={12} className="opacity-50" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-slate-800 pt-4">
            <h2 className="text-sm font-semibold text-slate-300 mb-2">Simulate Interactive Triggers</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 bg-slate-950 p-2 rounded-lg border border-slate-800 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={paymentError} 
                  onChange={(e) => setPaymentError(e.target.checked)} 
                  className="accent-teal-500 h-4 w-4"
                />
                <div className="text-xs">
                  <p className="font-medium text-slate-200">Force Payment Failure</p>
                  <p className="text-[10px] text-slate-400">Triggers error state on Pay</p>
                </div>
              </label>
              
              {role === 'customer' && currentScreen === 7 && (
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-slate-200">Simulate Tracking Step</p>
                  <div className="flex gap-1 justify-between">
                    {[1, 2, 3, 4].map(step => (
                      <button
                        key={step}
                        onClick={() => setTrackingStep(step)}
                        className={`text-[10px] px-2 py-1 rounded font-medium transition-all ${trackingStep === step ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                        S{step}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500">
          TrustFix MVP Prototype • Light/Teal Theme System • Center mobile mockup viewport: 390px × 844px.
        </div>
      </div>

      {/* ==========================================
          CENTER: PHONE VIEWPORT WRAPPER
          ========================================== */}
      <div className="relative">
        {/* Decorative elements to look like a high-end mobile shell */}
        <div className="w-[390px] h-[844px] bg-slate-900 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[10px] border-slate-800 flex flex-col relative overflow-hidden bg-white select-none transition-all">
          
          {/* Status Bar / Notch Area */}
          <div className="h-11 bg-white relative flex items-center justify-between px-6 z-50 shrink-0">
            <span className="text-xs font-semibold text-slate-800 select-none">{currentTimeStr}</span>
            {/* Dynamic Island / Notch */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-2.5 w-28 h-6 bg-black rounded-full flex items-center justify-center z-50">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 absolute left-4"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute right-4"></div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-800">
              <span className="text-[10px] font-bold">LTE</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c3.9 3.89 10.21 3.89 14.1 0l1.38-1.79C21.26 16.07 22 14.12 22 12c0-4.97-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8l5.1 7.8c-.2.01-.4.01-.6.01zm4.9-5.2c-.45.83-1.12 1.5-1.95 1.95l-5.1-7.8c.2-.01.4-.01.6-.01 3.31 0 6 2.69 6 6z" />
              </svg>
              <div className="w-5 h-2.5 border border-slate-800 rounded-sm p-0.5 flex items-center">
                <div className="h-full w-4 bg-slate-800 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* Main App Content Viewport (Scrollable) */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col bg-white">
            {role === null ? (
              // ==========================================
              // ROLE / MODE SELECTOR PAGE
              // ==========================================
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#EAF6F5] to-white">
                <div className="w-16 h-16 rounded-2xl bg-trustPrimary flex items-center justify-center font-bold text-white text-3xl mb-4 shadow-md">T</div>
                <h1 className="text-2xl font-bold text-trustText mb-2 text-center">TrustFix Marketplace</h1>
                <p className="text-sm text-trustMuted text-center mb-8">Select which interface flow you would like to explore in this interactive prototype.</p>
                
                <div className="w-full flex flex-col gap-4">
                  <button
                    onClick={() => selectRole('customer')}
                    className="w-full p-4 bg-white border-2 border-trustPrimary rounded-xl text-left hover:bg-trustCardBg transition-all flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-trustPrimary">Consumer Side</span>
                      <h3 className="text-base font-bold text-trustText mt-0.5">Customer App Flow</h3>
                      <p className="text-xs text-trustMuted mt-1">Book plumbing, AC servicing, track technicians live & rate completed works.</p>
                    </div>
                    <ChevronRight className="text-trustPrimary shrink-0 ml-2" />
                  </button>

                  <button
                    onClick={() => selectRole('provider')}
                    className="w-full p-4 bg-white border-2 border-amber-600 rounded-xl text-left hover:bg-amber-50 transition-all flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Merchant Side</span>
                      <h3 className="text-base font-bold text-trustText mt-0.5">Provider App Flow</h3>
                      <p className="text-xs text-trustMuted mt-1">Accept jobs, decline with reasons, upload completions, and track earnings metrics.</p>
                    </div>
                    <ChevronRight className="text-amber-600 shrink-0 ml-2" />
                  </button>
                </div>
                
                <div className="mt-8 text-center text-xs text-trustMuted">
                  Interactive state synchronizes across roles. Use the Left Admin panel to reset or jump screens anytime.
                </div>
              </div>
            ) : (
              // RENDER SCREEN COMPONENT
              renderActiveScreen()
            )}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="h-5 bg-white flex items-center justify-center pb-1 shrink-0 z-50">
            <div className="w-32 h-1.5 bg-slate-300 rounded-full"></div>
          </div>

        </div>
      </div>

    </div>
  );

  // ==========================================
  // ACTIVE SCREEN ROUTER
  // ==========================================
  function renderActiveScreen() {
    // ----------------------------------------
    // CUSTOMER APP FLOW
    // ----------------------------------------
    if (role === 'customer') {
      switch (currentScreen) {
        
        // SCREEN 1: SPLASH
        case 1:
          return (
            <div className="flex-1 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-white to-[#EAF6F5]">
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-[20px] bg-trustPrimary flex items-center justify-center font-bold text-white text-4xl mb-5 shadow-lg animate-bounce">
                  T
                </div>
                <h2 className="text-3xl font-extrabold text-trustText mb-2">TrustFix</h2>
                <p className="text-sm text-trustMuted text-center max-w-[240px]">
                  Book trusted home services with confidence.
                </p>
              </div>
              <button
                onClick={() => navigateTo(2)}
                className="w-full py-3.5 bg-trustPrimary hover:bg-[#23606D] text-white font-bold rounded-btn shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                style={{ height: '48px' }}>
                Get Started <ArrowRight size={18} />
              </button>
            </div>
          );

        // SCREEN 2: CUSTOMER HOME
        case 2:
          return (
            <div className="flex-1 flex flex-col bg-white">
              {/* Top Bar */}
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <div 
                  onClick={() => alert("Simulated Location Dropdown: HSR Layout, Indiranagar, Koramangala")}
                  className="bg-trustCardBg text-trustPrimary text-xs font-semibold py-1.5 px-3 rounded-full flex items-center gap-1 cursor-pointer hover:bg-teal-100">
                  <MapPin size={12} /> HSR Layout, Bengaluru ▼
                </div>
                <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-[#D64550] rounded-full border-2 border-white"></span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-4">
                <div 
                  onClick={() => {
                    setSelectedCategory('Plumbing');
                    navigateTo(3);
                  }}
                  className="flex items-center gap-2 border border-slate-200 rounded-input px-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-all"
                  style={{ height: '46px' }}>
                  <Search size={18} className="text-trustMuted" />
                  <span className="text-trustMuted text-sm">Search for AC repair, plumber...</span>
                </div>
              </div>

              {/* 4 Category Row */}
              <div className="px-4 py-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-trustMuted mb-3">Popular Categories</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'AC Repair', icon: '❄️' },
                    { label: 'Electrical', icon: '⚡' },
                    { label: 'Plumbing', icon: '🔧' },
                    { label: 'Appliances', icon: '📺' }
                  ].map(cat => (
                    <button
                      key={cat.label}
                      onClick={() => {
                        setSelectedCategory(cat.label);
                        navigateTo(3);
                      }}
                      className="flex flex-col items-center gap-1.5 p-2 bg-[#EAF6F5] rounded-card hover:bg-teal-100 transition-all border border-[#d9efed]">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-[10px] font-bold text-trustPrimary text-center truncate w-full">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Providers Section List */}
              <div className="flex-1 px-4 py-3 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-24">
                
                {/* Recommended */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="text-sm font-bold text-trustText">Recommended for you</h3>
                    <span className="text-xs text-trustPrimary font-semibold cursor-pointer">See all</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {PROVIDERS.slice(0, 2).map(provider => (
                      <ProviderCard key={provider.id} p={provider} onClick={() => {
                        setSelectedProvider(provider);
                        navigateTo(4);
                      }} />
                    ))}
                  </div>
                </div>

                {/* Near You */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="text-sm font-bold text-trustText">Near You</h3>
                    <span className="text-xs text-trustPrimary font-semibold cursor-pointer">See all</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {PROVIDERS.slice(1, 3).map(provider => (
                      <ProviderCard key={provider.id} p={provider} onClick={() => {
                        setSelectedProvider(provider);
                        navigateTo(4);
                      }} />
                    ))}
                  </div>
                </div>

                {/* Budget Friendly */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="text-sm font-bold text-trustText">Budget Friendly</h3>
                    <span className="text-xs text-trustPrimary font-semibold cursor-pointer">See all</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {PROVIDERS.slice(3, 5).map(provider => (
                      <ProviderCard key={provider.id} p={provider} onClick={() => {
                        setSelectedProvider(provider);
                        navigateTo(4);
                      }} />
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Nav */}
              <CustomerBottomNav activeTab="home" />
            </div>
          );

        // SCREEN 3: PROVIDER DISCOVERY
        case 3:
          return (
            <div className="flex-1 flex flex-col bg-white">
              {/* Top Search & Filter */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <button onClick={handleBack} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full" style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                    <ArrowLeft size={20} className="mx-auto" />
                  </button>
                  <h2 className="text-base font-bold text-trustText">{selectedCategory}</h2>
                </div>

                <div 
                  className="flex items-center gap-2 border border-slate-200 rounded-input px-3 bg-slate-50 mb-3"
                  style={{ height: '44px' }}>
                  <Search size={16} className="text-trustMuted" />
                  <input
                    type="text"
                    defaultValue={selectedCategory}
                    readOnly
                    className="bg-transparent text-sm w-full outline-none text-trustText"
                  />
                </div>

                {/* Filter chips */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  <span className="px-3 py-1.5 bg-trustPrimary text-white rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer">Recommended</span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer hover:bg-slate-200">Nearest</span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer hover:bg-slate-200">Budget Friendly</span>
                  <button className="px-2 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold flex items-center justify-center" style={{ width: '32px', height: '28px' }}>⚙️</button>
                </div>
              </div>

              {/* Results */}
              <div className="p-4 flex-1 overflow-y-auto no-scrollbar pb-24">
                <div className="flex items-center gap-1.5 text-xs text-trustPrimary font-semibold mb-4 bg-trustCardBg p-2 rounded-lg">
                  <Shield size={14} /> Showing 8 verified providers near you
                </div>

                <div className="flex flex-col gap-3">
                  {PROVIDERS.filter(p => p.category === selectedCategory || selectedCategory === 'Plumbing').map(p => (
                    <ProviderCard key={p.id} p={p} onClick={() => {
                      setSelectedProvider(p);
                      navigateTo(4);
                    }} />
                  ))}
                  {/* Fallback to show others */}
                  {PROVIDERS.filter(p => p.category !== selectedCategory && selectedCategory !== 'Plumbing').map(p => (
                    <ProviderCard key={p.id} p={p} onClick={() => {
                      setSelectedProvider(p);
                      navigateTo(4);
                    }} />
                  ))}
                </div>
              </div>

              {/* Bottom Nav */}
              <CustomerBottomNav activeTab="home" />
            </div>
          );

        // SCREEN 4: PROVIDER PROFILE
        case 4:
          return (
            <div className="flex-1 flex flex-col bg-white relative">
              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                {/* Image & Back arrow */}
                <div className="relative h-40 bg-slate-150 overflow-hidden">
                  <img
                    src={selectedProvider.image}
                    alt={selectedProvider.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <button 
                    onClick={handleBack} 
                    className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-slate-800 shadow-md hover:bg-white"
                    style={{ height: '44px', width: '44px' }}>
                    <ArrowLeft size={18} />
                  </button>
                </div>

                {/* Shop details */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <h2 className="text-lg font-bold text-trustText">{selectedProvider.name}</h2>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="bg-trustPrimary text-[10px] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <Shield size={10} /> Verified
                        </span>
                        <span className="text-xs text-trustMuted">{selectedProvider.category} • {selectedProvider.distance} away</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded text-amber-600 font-bold text-xs shrink-0">
                      <Star size={12} fill="currentColor" /> {selectedProvider.rating}
                    </div>
                  </div>

                  <p className="text-xs text-trustMuted mt-3 leading-relaxed">
                    {selectedProvider.description}
                  </p>

                  {/* 3 Stat Tiles */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-trustCardBg p-2.5 rounded-card text-center border border-[#d9efed]">
                      <p className="text-xs font-bold text-trustPrimary">{selectedProvider.experience}</p>
                      <p className="text-[10px] text-trustMuted mt-0.5">Experience</p>
                    </div>
                    <div className="bg-trustCardBg p-2.5 rounded-card text-center border border-[#d9efed]">
                      <p className="text-xs font-bold text-trustPrimary">{selectedProvider.jobsDone}</p>
                      <p className="text-[10px] text-trustMuted mt-0.5">Jobs Done</p>
                    </div>
                    <div className="bg-teal-500 text-white p-2.5 rounded-card text-center shadow-xs">
                      <p className="text-xs font-bold">Today</p>
                      <p className="text-[10px] font-medium opacity-90 mt-0.5">Available</p>
                    </div>
                  </div>

                  {/* Past service photos */}
                  <div className="mt-5">
                    <h3 className="text-xs uppercase font-bold text-trustMuted tracking-wider mb-2.5">Past Service Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img src="https://images.unsplash.com/photo-1542013936693-8848e574047a?w=150&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="mt-5">
                    <h3 className="text-xs uppercase font-bold text-trustMuted tracking-wider mb-2.5">Customer Reviews ({selectedProvider.reviewsCount})</h3>
                    <div className="flex flex-col gap-3">
                      {selectedProvider.recentReviews.map(r => (
                        <div key={r.id} className="p-3 bg-slate-50 border border-slate-100 rounded-card">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img src={r.avatar} className="w-7 h-7 rounded-full bg-slate-200" />
                              <span className="text-xs font-bold text-trustText">{r.name}</span>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              {[...Array(r.rating)].map((_, i) => (
                                <Star key={i} size={10} fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-trustMuted mt-1.5">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Fixed Bottom CTA */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 flex items-center justify-between z-10 shadow-lg">
                <div>
                  <p className="text-[10px] text-trustMuted">Est. Inspection Fee</p>
                  <p className="text-base font-extrabold text-trustText">From ₹{selectedProvider.price}</p>
                </div>
                <button
                  onClick={() => navigateTo(5)}
                  className="bg-trustPrimary hover:bg-[#23606D] text-white px-8 py-3 rounded-btn font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  style={{ height: '48px' }}>
                  Book Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );

        // SCREEN 5: BOOKING DETAILS
        case 5:
          return (
            <div className="flex-1 flex flex-col bg-white">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <button onClick={handleBack} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full" style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                  <ArrowLeft size={20} className="mx-auto" />
                </button>
                <h2 className="text-base font-bold text-trustText">Book Service</h2>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24 flex flex-col gap-4">
                
                {/* Photo Upload block */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Issue Photo (Required *)</label>
                  <div className="relative border-2 border-dashed border-slate-300 hover:border-trustPrimary transition-all rounded-card bg-slate-50 flex flex-col items-center justify-center p-5 text-center cursor-pointer">
                    
                    <input 
                      type="file" 
                      accept="image/*"
                      id="customer-upload-input"
                      onChange={handlePhotoUploadSim}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    {uploadedIssuePhoto ? (
                      <div className="w-full flex flex-col items-center gap-2">
                        <img src={uploadedIssuePhoto} alt="Issue thumbnail" className="w-24 h-24 object-cover rounded-lg shadow-sm border border-slate-200" />
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                          ✓ Image Added (Click to Replace)
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-trustCardBg text-trustPrimary flex items-center justify-center mb-2">
                          <Camera size={20} />
                        </div>
                        <p className="text-xs font-bold text-trustText">Tap to add issue photo</p>
                        <p className="text-[10px] text-trustMuted mt-0.5">Helper: Click and choose any mock photo</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Pre-filled Service Address */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Service Address</label>
                  <input
                    type="text"
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    placeholder="Enter your flat/street address"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-input text-xs outline-none focus:border-trustPrimary text-trustText font-medium"
                    style={{ height: '44px' }}
                  />
                </div>

                {/* Day picker chips */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Select Day</label>
                  <div className="flex gap-2">
                    {['Today', 'Tomorrow', 'Pick a date'].map(day => (
                      <button
                        key={day}
                        onClick={() => setDayPreference(day)}
                        className={`flex-1 py-2 px-3 text-xs font-bold border rounded-btn transition-all ${dayPreference === day ? 'bg-trustPrimary border-trustPrimary text-white shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        style={{ height: '44px' }}>
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time picker chips */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Select Time Slot</label>
                  <div className="flex gap-2">
                    {['9–11 AM', '11–1 PM', '4–6 PM'].map(time => (
                      <button
                        key={time}
                        onClick={() => setTimePreference(time)}
                        className={`flex-1 py-2 px-1.5 text-xs font-bold border rounded-btn transition-all text-center ${timePreference === time ? 'bg-trustPrimary border-trustPrimary text-white shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        style={{ height: '44px' }}>
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Issue details (Notes)</label>
                  <textarea
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Describe the problem you are facing..."
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-input text-xs outline-none focus:border-trustPrimary text-trustText font-medium"
                  />
                </div>

              </div>

              {/* Submit / Continue */}
              <div className="bg-white border-t border-slate-100 p-4 absolute bottom-0 left-0 right-0 z-10">
                <button
                  onClick={() => {
                    if (!uploadedIssuePhoto) {
                      // Allow proceeding but trigger a mock prompt or warning if we want to be strict, but prompt says "required *"
                      // Let's create an interactive fallback photo if none uploaded to not block the user!
                      setUploadedIssuePhoto('https://images.unsplash.com/photo-1542013936693-8848e574047a?w=150&auto=format&fit=crop&q=60');
                      alert("Heads up: A mock issue photo has been automatically generated for you.");
                    }
                    navigateTo(6);
                  }}
                  className="w-full py-3.5 bg-trustPrimary hover:bg-[#23606D] text-white font-bold rounded-btn text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                  style={{ height: '48px' }}>
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            </div>
          );

        // SCREEN 6: BOOKING CONFIRMED
        case 6:
          return (
            <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-white to-[#EAF6F5]">
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#EAF6F5] border-2 border-trustSecondary flex items-center justify-center text-trustSecondary mb-4 shadow-xs">
                  <Check size={36} strokeWidth={3} />
                </div>
                <h2 className="text-xl font-black text-trustText">Booking Confirmed!</h2>
                <p className="text-xs text-trustMuted mt-1">Our verified partner will reach you shortly</p>
                <div className="mt-2 text-xs font-mono bg-slate-100 text-slate-600 px-3 py-1 rounded-full">ID: {bookingId}</div>

                {/* Summary Card */}
                <div className="w-full bg-white border border-slate-200 rounded-card p-4 text-left shadow-xs mt-6">
                  <div className="flex justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="text-xs text-trustMuted">Service Required</span>
                    <span className="text-xs font-bold text-trustText">{selectedCategory}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="text-xs text-trustMuted">Service Provider</span>
                    <span className="text-xs font-bold text-trustText">{selectedProvider.name}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="text-xs text-trustMuted">Date & Time</span>
                    <span className="text-xs font-bold text-trustText">{dayPreference}, {timePreference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-trustMuted font-medium">Estimated cost</span>
                    <span className="text-sm font-extrabold text-trustPrimary">₹{selectedProvider.price}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => navigateTo(7)}
                  className="w-full py-3.5 bg-trustPrimary hover:bg-[#23606D] text-white font-bold rounded-btn text-sm shadow-md transition-all"
                  style={{ height: '48px' }}>
                  Track Booking
                </button>
                <button
                  onClick={() => {
                    alert(`Booking Summary Details:\n- Address: ${serviceAddress}\n- Notes: ${bookingNotes}\n- Estimated Visit Cost: ₹${selectedProvider.price}`);
                  }}
                  className="w-full py-3.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-btn text-sm transition-all"
                  style={{ height: '48px' }}>
                  View Booking Details
                </button>
              </div>
            </div>
          );

        // SCREEN 7: LIVE TRACKING
        case 7:
          return (
            <div className="flex-1 flex flex-col bg-white relative">
              {/* Map Placeholder Area (60% height) */}
              <div className="flex-1 bg-slate-100 border-b border-slate-200 relative overflow-hidden flex flex-col min-h-[300px]">
                {/* Visual SVG Map */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Road grids in grey */}
                  <line x1="0" y1="80" x2="390" y2="80" stroke="#E2E8F0" strokeWidth="6" />
                  <line x1="0" y1="150" x2="390" y2="150" stroke="#E2E8F0" strokeWidth="8" />
                  <line x1="0" y1="240" x2="390" y2="240" stroke="#E2E8F0" strokeWidth="6" />
                  <line x1="80" y1="0" x2="80" y2="400" stroke="#E2E8F0" strokeWidth="8" />
                  <line x1="220" y1="0" x2="220" y2="400" stroke="#E2E8F0" strokeWidth="6" />
                  <line x1="300" y1="0" x2="300" y2="400" stroke="#E2E8F0" strokeWidth="10" />

                  {/* Dotted Route Line */}
                  <path
                    d={`M ${providerLocStart.x} ${providerLocStart.y} L 80 320 L 80 150 L ${customerLoc.x} 150`}
                    fill="none"
                    stroke="#2F7C8C"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  />

                  {/* Customer Home Pin */}
                  <circle cx={customerLoc.x} cy={customerLoc.y} r="8" fill="#D64550" />
                  <circle cx={customerLoc.x} cy={customerLoc.y} r="18" fill="#D64550" fillOpacity="0.2" className="animate-ping" />
                  <text x={customerLoc.x + 10} y={customerLoc.y - 10} fontSize="10" fontWeight="bold" fill="#1A1A1A">Your Home</text>

                  {/* Provider Live Pin */}
                  <circle cx={currentProviderLocX} cy={currentProviderLocY} r="8" fill="#00A896" />
                  <circle cx={currentProviderLocX} cy={currentProviderLocY} r="16" fill="#00A896" fillOpacity="0.25" className="animate-pulse" />
                </svg>

                {/* Tracking floating pill */}
                <div className="absolute top-3 left-3 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-md flex items-center gap-1.5 text-[11px] font-bold text-slate-800 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  GPS Tracking Live
                </div>

                {/* Back button */}
                <button
                  onClick={handleBack}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 border border-slate-200 shadow-md flex items-center justify-center text-slate-800 z-10"
                  style={{ height: '44px', width: '44px' }}>
                  <ArrowLeft size={18} />
                </button>
              </div>

              {/* Interactive Flow Connector (Technician Progress Bar / Manual Stepper) */}
              <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 shrink-0 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-trustMuted">
                  <span className="font-semibold text-slate-800">Technician Status:</span>
                  <span className="bg-teal-100 text-trustPrimary font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                    {trackingStep === 1 && "On the way"}
                    {trackingStep === 2 && "Arrived"}
                    {trackingStep === 3 && "Service in Progress"}
                    {trackingStep === 4 && "Completed"}
                  </span>
                </div>

                {/* 5-step progress bar */}
                <div className="flex items-center gap-1 mt-1">
                  {[
                    { label: 'Confirmed', stepNum: 0 },
                    { label: 'On Way', stepNum: 1 },
                    { label: 'Arrived', stepNum: 2 },
                    { label: 'In Progress', stepNum: 3 },
                    { label: 'Done', stepNum: 4 }
                  ].map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center flex-1">
                        <button
                          onClick={() => setTrackingStep(step.stepNum)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${trackingStep >= step.stepNum ? 'bg-trustPrimary text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {trackingStep > step.stepNum ? '✓' : step.stepNum + 1}
                        </button>
                        <span className="text-[9px] text-slate-500 font-medium mt-1 text-center leading-none">{step.label}</span>
                      </div>
                      {idx < 4 && (
                        <div className={`flex-1 h-0.5 -mt-3.5 ${trackingStep > idx ? 'bg-trustPrimary' : 'bg-slate-200'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Cancel / Reschedule text link */}
                <div className="text-center mt-2.5">
                  <button 
                    onClick={() => navigateTo(10)} 
                    className="text-xs text-[#D64550] hover:text-red-700 font-bold underline">
                    Cancel / Reschedule Job
                  </button>
                </div>
              </div>

              {/* Provider Info bottom bar */}
              <div className="bg-white border-t border-slate-200 p-4 shrink-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh"
                      alt="Suresh Avatar"
                      className="w-10 h-10 rounded-full bg-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-trustText">Suresh – Sri Sai Plumbing</h4>
                      <p className="text-[10px] text-trustMuted mt-0.5">
                        {trackingStep === 1 && "Arriving in 12 mins · 1.2 km away"}
                        {trackingStep === 2 && "Arrived • Near your gate"}
                        {trackingStep === 3 && "Resolving issue inside flat"}
                        {trackingStep === 4 && "Job completed successfully!"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsCallOpen(true)}
                      className="w-10 h-10 rounded-full bg-[#EAF6F5] text-trustPrimary hover:bg-teal-100 flex items-center justify-center"
                      style={{ height: '44px', width: '44px' }}>
                      <Phone size={18} />
                    </button>
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className="w-10 h-10 rounded-full bg-[#EAF6F5] text-trustPrimary hover:bg-teal-100 flex items-center justify-center"
                      style={{ height: '44px', width: '44px' }}>
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>

                {trackingStep === 4 && (
                  <button
                    onClick={() => navigateTo(8)}
                    className="w-full mt-3 py-3 bg-[#02C39A] hover:bg-emerald-600 text-white font-bold rounded-btn text-xs shadow-md transition-all flex items-center justify-center gap-1"
                    style={{ height: '44px' }}>
                    Proceed to Payment <ChevronRight size={14} />
                  </button>
                )}
              </div>

              {/* Chat Overlay Drawer */}
              {isChatOpen && (
                <div className="absolute inset-0 bg-slate-900/40 z-50 flex flex-col justify-end">
                  <div className="bg-white rounded-t-3xl h-[80%] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
                    <div className="p-4 bg-trustPrimary text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh" className="w-8 h-8 rounded-full bg-teal-100" />
                        <div>
                          <h4 className="text-xs font-bold">Chat with Suresh</h4>
                          <span className="text-[10px] text-teal-200">Online</span>
                        </div>
                      </div>
                      <button onClick={() => setIsChatOpen(false)} className="text-white hover:bg-[#23606D] p-1.5 rounded-full" style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                        <X size={20} className="mx-auto" />
                      </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-3 bg-slate-50">
                      {chatMessages.map(msg => (
                        <div key={msg.id} className={`max-w-[75%] p-3 rounded-2xl text-xs ${msg.sender === 'customer' ? 'self-end bg-trustPrimary text-white rounded-tr-none' : 'self-start bg-white border border-slate-200 text-trustText rounded-tl-none'}`}>
                          <p className="leading-relaxed">{msg.text}</p>
                          <span className={`block text-[8px] mt-1 text-right ${msg.sender === 'customer' ? 'text-teal-200' : 'text-trustMuted'}`}>{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Input Field */}
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                      <input
                        type="text"
                        value={newChatText}
                        onChange={(e) => setNewChatText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-input px-3 text-xs outline-none focus:border-trustPrimary"
                        style={{ height: '44px' }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-trustPrimary text-white px-4 h-11 rounded-btn text-xs font-bold"
                        style={{ height: '44px' }}>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Call Overlay Overlay */}
              {isCallOpen && (
                <div className="absolute inset-0 bg-[#2F7C8C]/95 z-50 flex flex-col items-center justify-center p-6 text-white text-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6 animate-pulse">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh" className="w-16 h-16 rounded-full bg-white" />
                  </div>
                  <h3 className="text-xl font-bold">Suresh</h3>
                  <p className="text-sm text-teal-200 mt-1">TrustFix Plumbing Partner</p>
                  <p className="text-xs text-teal-300 mt-8 font-mono animate-pulse">Simulated Call In Progress...</p>

                  <button
                    onClick={() => setIsCallOpen(false)}
                    className="mt-16 w-14 h-14 rounded-full bg-[#D64550] flex items-center justify-center text-white hover:bg-red-700 shadow-md"
                    style={{ height: '56px', width: '56px' }}>
                    <X size={24} />
                  </button>
                </div>
              )}
            </div>
          );

        // SCREEN 8: PAYMENT SCREEN
        case 8:
          return (
            <div className="flex-1 flex flex-col bg-white">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <button onClick={handleBack} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full" style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                  <ArrowLeft size={20} className="mx-auto" />
                </button>
                <h2 className="text-base font-bold text-trustText">Payment</h2>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
                
                {/* Cost Card */}
                <div className="bg-trustCardBg border border-[#d9efed] rounded-card p-4">
                  <h4 className="text-xs uppercase font-bold text-trustPrimary tracking-wider mb-3">Order Summary</h4>
                  <div className="flex justify-between items-center text-xs text-trustMuted mb-2">
                    <span>Service Charge (Inspection/Fix)</span>
                    <span className="font-semibold text-trustText">₹199</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-trustMuted mb-3 pb-3 border-b border-[#c8e6e2]">
                    <span>Convenience Visit Fee</span>
                    <span className="font-semibold text-trustText">₹50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-trustText">Total Amount</span>
                    <span className="text-base font-black text-trustPrimary">₹249</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-trustMuted tracking-wider mb-2.5">Select Payment Method</h4>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'UPI', title: 'UPI Payments (Selected)', desc: 'GPay, PhonePe, Paytm, BHIM' },
                      { id: 'Card', title: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay, Amex' },
                      { id: 'Net Banking', title: 'Net Banking', desc: 'All Indian major banking services' },
                      { id: 'Cash', title: 'Cash on Service', desc: 'Handover cash payout to technician directly' }
                    ].map(method => (
                      <label
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 border rounded-card flex items-start gap-3 cursor-pointer transition-all ${paymentMethod === method.id ? 'bg-[#EAF6F5] border-trustPrimary' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                        <input
                          type="radio"
                          name="payment_method"
                          checked={paymentMethod === method.id}
                          readOnly
                          className="accent-trustPrimary mt-0.5"
                        />
                        <div>
                          <p className="text-xs font-bold text-trustText">{method.title}</p>
                          <p className="text-[10px] text-trustMuted mt-0.5">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => alert("Promo applied: TF100 (-₹50 Visit Fee waive) is not active for this transaction")} 
                    className="text-xs text-trustPrimary font-bold underline">
                    Apply promo code
                  </button>
                </div>

              </div>

              {/* Fixed Bottom CTA */}
              <div className="bg-white border-t border-slate-100 p-4">
                {paymentError && (
                  <div className="mb-3 bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-[#D64550]">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <AlertCircle size={14} /> Payment failed. Insufficient funds.
                    </div>
                    <button 
                      onClick={() => setPaymentError(false)}
                      className="bg-[#D64550] text-white font-bold px-2.5 py-1 rounded text-[10px] uppercase">
                      Retry
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (paymentError) {
                      // Trigger visual fail state
                      alert("Error: payment failed. Please click 'Retry' or use the left panel to disable the failure simulator.");
                      return;
                    }
                    // Proceed to Screen 9 (Service Completion)
                    navigateTo(9);
                  }}
                  className="w-full py-3.5 bg-trustPrimary hover:bg-[#23606D] text-white font-bold rounded-btn text-sm shadow-md transition-all flex items-center justify-center gap-1"
                  style={{ height: '48px' }}>
                  Pay ₹249
                </button>
                
                {paymentError && (
                  <div className="text-center mt-2.5">
                    <button 
                      onClick={() => {
                        setPaymentMethod('Cash');
                        setPaymentError(false);
                      }} 
                      className="text-[11px] text-trustMuted hover:text-slate-700 underline font-semibold">
                      Try another method (Switch to Cash fallback)
                    </button>
                  </div>
                )}
              </div>
            </div>
          );

        // SCREEN 9: SERVICE COMPLETION
        case 9:
          return (
            <div className="flex-1 flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24 flex flex-col gap-5 text-center">
                
                <div className="flex flex-col items-center mt-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-lg font-black text-trustText">Service Completed</h2>
                  <p className="text-xs text-trustMuted mt-0.5">Thank you for choosing {selectedProvider.name}</p>
                </div>

                {/* Rating selection */}
                <div className="bg-slate-50 border border-slate-100 rounded-card p-4">
                  <p className="text-xs font-bold text-slate-800 mb-2">Rate Suresh's work quality</p>
                  <div className="flex items-center justify-center gap-1.5 my-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map(starNum => (
                      <button
                        key={starNum}
                        onClick={() => setCustomerRating(starNum)}
                        className="p-1 hover:scale-110 transition-all">
                        <Star size={28} fill={customerRating >= starNum ? "currentColor" : "none"} stroke="currentColor" />
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-trustMuted mt-1">{customerRating} Stars Selected</p>
                  
                  <textarea
                    value={customerFeedbackComment}
                    onChange={(e) => setCustomerFeedbackComment(e.target.value)}
                    placeholder="Add comment (Optional) e.g., Suresh was extremely neat and cleaned the work area well."
                    rows={2}
                    className="w-full mt-3 p-2 bg-white border border-slate-200 rounded-input text-xs outline-none focus:border-trustPrimary font-medium"
                  />
                </div>

                {/* Completion Proof by Technician */}
                <div className="text-left bg-slate-50 border border-slate-100 rounded-card p-4">
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Completion Proof by Suresh</h4>
                  
                  {providerUploadedProof ? (
                    <div className="flex items-center gap-3">
                      <img src={providerUploadedProof} alt="Completion Proof" className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                      <div>
                        <p className="text-xs font-bold text-slate-700">Technician Upload</p>
                        <p className="text-[10px] text-trustMuted mt-0.5">Uploaded via Provider App</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center text-trustMuted text-xs font-semibold">
                        Image Proof
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Clean work verification</p>
                        <p className="text-[10px] text-trustMuted mt-0.5">Fixed bathroom piping system</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Not satisfied / rework option */}
                <div className="text-center">
                  <button
                    onClick={() => navigateTo(10)}
                    className="text-xs text-[#D64550] hover:text-red-700 font-bold underline">
                    Not satisfied? Request free Rework inspection
                  </button>
                </div>

              </div>

              {/* Fixed Bottom */}
              <div className="bg-white border-t border-slate-100 p-4 absolute bottom-0 left-0 right-0 z-10">
                <button
                  onClick={() => {
                    alert("Feedback Submitted! Returning to home screen.");
                    navigateTo(2);
                  }}
                  className="w-full py-3.5 bg-trustPrimary hover:bg-[#23606D] text-white font-bold rounded-btn text-sm shadow-md transition-all"
                  style={{ height: '48px' }}>
                  Submit Feedback & Finish
                </button>
              </div>
            </div>
          );

        // SCREEN 10: SUPPORT & REWORK
        case 10:
          return (
            <div className="flex-1 flex flex-col bg-white">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-bold text-trustText">Support</h2>
              </div>

              {/* Support content */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24 flex flex-col gap-4">
                
                {/* Rework Card Highlight */}
                <div className="bg-red-50 border border-red-200 rounded-card p-4">
                  <h3 className="text-xs font-bold uppercase text-[#D64550] tracking-wider mb-1.5">Request Rework</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    If you are experiencing issues with booking <b>#TF10245</b>, you can request a technician return inspection within 3 days.
                  </p>
                  <button 
                    onClick={() => alert("Rework Request Registered: We will re-dispatch Suresh within 24 hours.")}
                    className="mt-3.5 w-full bg-[#D64550] hover:bg-red-700 text-white font-bold py-2 rounded-btn text-xs shadow-xs transition-all"
                    style={{ height: '40px' }}>
                    Report an Issue with this Booking
                  </button>
                </div>

                {/* FAQ list */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-trustMuted tracking-wider mb-2.5">Frequently Asked Questions</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { q: "What is your rework warranty policy?", a: "We offer a 30-day warranty on all repairs. If the exact issue re-occurs, we fix it for free." },
                      { q: "How are providers verified?", a: "All technicians pass an in-person skill exam, criminal background search, and must maintain a >4.5 average rating." },
                      { q: "How can I contact my provider?", a: "Once a booking is confirmed, you can call or chat with your technician directly through the live tracking tab." }
                    ].map((faq, i) => (
                      <div key={i} className="border border-slate-200 rounded-card bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => setFaqOpen(prev => ({ ...prev, [i]: !prev[i] }))}
                          className="w-full p-3 text-left font-bold text-xs text-trustText flex items-center justify-between hover:bg-slate-100">
                          <span>{faq.q}</span>
                          <span>{faqOpen[i] ? '▲' : '▼'}</span>
                        </button>
                        {faqOpen[i] && (
                          <div className="p-3 border-t border-slate-200 text-[11px] text-trustMuted bg-white leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Options */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-trustMuted tracking-wider mb-2.5">Get Additional Help</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => alert("Simulating Chat Support: Connecting with representative...")}
                      className="bg-trustCardBg p-2.5 rounded-card text-center border border-[#d9efed] flex flex-col items-center justify-center gap-1 hover:bg-teal-100 transition-all">
                      <MessageSquare size={16} className="text-trustPrimary" />
                      <span className="text-[10px] font-bold text-trustPrimary">Chat Help</span>
                    </button>
                    <button 
                      onClick={() => alert("Simulating Helpline Dial: Calling +1800-TRUSTFIX")}
                      className="bg-trustCardBg p-2.5 rounded-card text-center border border-[#d9efed] flex flex-col items-center justify-center gap-1 hover:bg-teal-100 transition-all">
                      <Phone size={16} className="text-trustPrimary" />
                      <span className="text-[10px] font-bold text-trustPrimary">Call Support</span>
                    </button>
                    <button 
                      onClick={() => alert("No open support tickets at this time")}
                      className="bg-trustCardBg p-2.5 rounded-card text-center border border-[#d9efed] flex flex-col items-center justify-center gap-1 hover:bg-teal-100 transition-all">
                      <Shield size={16} className="text-trustPrimary" />
                      <span className="text-[10px] font-bold text-trustPrimary">My Tickets</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Nav */}
              <CustomerBottomNav activeTab="support" />
            </div>
          );

      }
    }

    // ----------------------------------------
    // PROVIDER APP FLOW
    // ----------------------------------------
    if (role === 'provider') {
      switch (currentScreen) {
        
        // SCREEN 11: PROVIDER LOGIN
        case 11:
          return (
            <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-white to-amber-50">
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-[16px] bg-amber-600 flex items-center justify-center font-bold text-white text-3xl mb-4 shadow-md">T</div>
                <h2 className="text-xl font-black text-trustText">Provider Dashboard Login</h2>
                <p className="text-xs text-trustMuted mt-1">Grow your servicing business with TrustFix</p>

                {/* Login Inputs */}
                <div className="w-full flex flex-col gap-3 mt-6 text-left">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-trustMuted mb-1">Enter Mobile Number</label>
                    <input
                      type="tel"
                      value={providerLoginPhone}
                      onChange={(e) => setProviderLoginPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-input text-xs outline-none focus:border-amber-600 text-trustText font-medium"
                      style={{ height: '44px' }}
                    />
                  </div>

                  {!providerOtpSent ? (
                    <button
                      onClick={() => {
                        if (!providerLoginPhone) {
                          alert("Please fill mobile input first (e.g. +91 99009 90099)");
                          return;
                        }
                        setProviderOtpSent(true);
                        // Pre-fill otp code
                        setProviderOtpCode('4829');
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-btn text-xs transition-all shadow-sm"
                      style={{ height: '44px' }}>
                      Send OTP Verification Code
                    </button>
                  ) : (
                    <div className="animate-fade-in flex flex-col gap-2">
                      <label className="block text-[10px] font-bold uppercase text-trustMuted mb-1">Enter 4-Digit OTP Code</label>
                      <input
                        type="text"
                        value={providerOtpCode}
                        onChange={(e) => setProviderOtpCode(e.target.value)}
                        placeholder="4829"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-input text-xs outline-none text-center tracking-widest font-black focus:border-amber-600"
                        style={{ height: '44px' }}
                      />
                      <button
                        onClick={() => navigateTo(12)}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-btn text-xs transition-all shadow-sm mt-1"
                        style={{ height: '44px' }}>
                        Login & Launch Dashboard
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => alert("Partner registration is currently onboarding through invite-only slots.")} 
                  className="text-xs text-amber-750 hover:underline font-semibold">
                  New provider? Register your shop on TrustFix
                </button>
              </div>
            </div>
          );

        // SCREEN 12: PROVIDER DASHBOARD
        case 12:
          return (
            <div className="flex-1 flex flex-col bg-slate-50">
              {/* Top Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Imran"
                    alt="Imran Avatar"
                    className="w-9 h-9 rounded-full bg-slate-100"
                  />
                  <div>
                    <h3 className="text-xs font-black text-trustText flex items-center gap-0.5">
                      Imran Appliance Care
                      <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-1 rounded">✓ Verified</span>
                    </h3>
                    <p className="text-[10px] text-trustMuted">Welcome back, Imran</p>
                  </div>
                </div>
                <button onClick={() => navigateTo(11)} className="text-xs text-[#D64550] font-semibold flex items-center gap-0.5 bg-red-50 py-1.5 px-2.5 rounded-lg">
                  Logout
                </button>
              </div>

              {/* Stats Tiles */}
              <div className="p-4 grid grid-cols-3 gap-2 shrink-0">
                <div className="bg-white p-3 rounded-card border border-slate-200 shadow-2xs">
                  <p className="text-sm font-black text-slate-800">{providerJobAccepted ? '1' : '0'}</p>
                  <p className="text-[9px] text-trustMuted mt-0.5">Today's Jobs</p>
                </div>
                <div className="bg-white p-3 rounded-card border border-slate-200 shadow-2xs">
                  <p className="text-sm font-black text-amber-600">{providerJobAccepted ? '0' : '1'}</p>
                  <p className="text-[9px] text-trustMuted mt-0.5">Pending Req</p>
                </div>
                <div className="bg-white p-3 rounded-card border border-slate-200 shadow-2xs">
                  <p className="text-sm font-black text-emerald-600">₹2,180</p>
                  <p className="text-[9px] text-trustMuted mt-0.5">Weekly Earnings</p>
                </div>
              </div>

              {/* List Job Requests */}
              <div className="flex-1 px-4 overflow-y-auto no-scrollbar pb-24 flex flex-col gap-4">
                
                {/* Job Request Card */}
                {!providerJobAccepted && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-trustMuted mb-2">New Job Requests (1)</h4>
                    <div className="bg-white border border-slate-200 rounded-card p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[9px] uppercase">Washing Machine Fix</span>
                        <span className="text-[10px] text-trustMuted">1.4 km away</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">Job #TF10245 • Priya R.</h4>
                      <p className="text-[10px] text-trustMuted mt-1">Slot requested: Today 4–6 PM</p>
                      
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setDeclineReasonSheet(true)}
                          className="flex-1 border border-slate-200 text-slate-600 font-bold rounded-btn text-xs transition-all hover:bg-slate-50"
                          style={{ height: '40px' }}>
                          Decline Request
                        </button>
                        <button
                          onClick={() => {
                            setProviderJobAccepted(true);
                            setProviderStatusState('accepted');
                            // Alert and jump to job detail
                            alert("Job accepted! Navigating to Job Detail Screen.");
                            navigateTo(13);
                          }}
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-btn text-xs shadow-sm transition-all"
                          style={{ height: '40px' }}>
                          Accept & Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Jobs */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-trustMuted mb-2">Today's Confirmed Jobs</h4>
                  <div className="flex flex-col gap-2">
                    {providerJobAccepted ? (
                      <div 
                        onClick={() => navigateTo(13)}
                        className="bg-white border border-slate-200 rounded-card p-3 shadow-2xs flex items-center justify-between cursor-pointer hover:border-amber-500">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-xs font-bold text-slate-800">Washing Machine Repair</span>
                          </div>
                          <p className="text-[10px] text-trustMuted mt-0.5">Priya R. • Today 4–6 PM</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-white border border-slate-200 border-dashed rounded-card text-xs text-trustMuted">
                        No accepted jobs scheduled for today yet.
                      </div>
                    )}
                    
                    {/* Mock static schedule rows */}
                    <div className="bg-white border border-slate-200 rounded-card p-3 opacity-60 shadow-2xs flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-700">Refrigerator Servicing (Completed)</span>
                        <p className="text-[10px] text-trustMuted mt-0.5">Rajiv K. • Today 11–1 PM</p>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Paid</span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-card p-3 opacity-60 shadow-2xs flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-700">AC Deep Clean (Completed)</span>
                        <p className="text-[10px] text-trustMuted mt-0.5">Kunal S. • Today 9–11 AM</p>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Paid</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Provider Decline Reasons Drawer */}
              {declineReasonSheet && (
                <div className="absolute inset-0 bg-slate-900/40 z-50 flex flex-col justify-end">
                  <div className="bg-white rounded-t-3xl p-5 flex flex-col gap-4 shadow-2xl animate-slide-up">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-trustText">Select Decline Reason</h3>
                      <button onClick={() => setDeclineReasonSheet(false)} className="text-slate-500 p-1 hover:bg-slate-100 rounded-full" style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                        <X size={20} className="mx-auto" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {['Busy / Fully booked', 'Out of operating service area', 'Required tools not available', 'Other / Emergency'].map(reason => (
                        <label
                          key={reason}
                          onClick={() => setSelectedDeclineReason(reason)}
                          className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-amber-50 rounded-card cursor-pointer border border-slate-100">
                          <input
                            type="radio"
                            name="decline_reason"
                            checked={selectedDeclineReason === reason}
                            readOnly
                            className="accent-amber-600"
                          />
                          <span className="text-xs font-medium text-slate-800">{reason}</span>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setDeclineReasonSheet(false);
                        alert(`Job request declined. Reason: "${selectedDeclineReason}"`);
                        // Set state to simulate no jobs pending
                        // In reality, Imran might clear it
                      }}
                      className="w-full bg-[#D64550] hover:bg-red-700 text-white font-bold rounded-btn text-xs py-3.5 mt-2 transition-all shadow-xs"
                      style={{ height: '44px' }}>
                      Submit & Reject Request
                    </button>
                  </div>
                </div>
              )}

              {/* Provider Bottom Nav */}
              <ProviderBottomNav activeTab="home" />
            </div>
          );

        // SCREEN 13: PROVIDER JOB DETAIL (#TF10245)
        case 13:
          return (
            <div className="flex-1 flex flex-col bg-white">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <button onClick={handleBack} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full" style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                  <ArrowLeft size={20} className="mx-auto" />
                </button>
                <h2 className="text-base font-bold text-trustText">Job Details {bookingId}</h2>
              </div>

              {/* Job Details Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24 flex flex-col gap-4">
                
                {/* Client info bar */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-card">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
                    alt="Priya Avatar"
                    className="w-10 h-10 rounded-full bg-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Priya R. (Customer)</h4>
                    <p className="text-[10px] text-trustMuted mt-0.5">{serviceAddress}</p>
                  </div>
                </div>

                {/* 2 stat tiles */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-card">
                    <p className="text-[10px] text-trustMuted">Service Category</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">Washing Machine Repair</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-card">
                    <p className="text-[10px] text-trustMuted">Preferred Schedule</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">Today 4–6 PM</p>
                  </div>
                </div>

                {/* Issue photo by Customer */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-trustMuted mb-2">Customer's Issue Photo</h4>
                  {uploadedIssuePhoto ? (
                    <div className="w-full h-40 bg-slate-100 rounded-card overflow-hidden border border-slate-200">
                      <img src={uploadedIssuePhoto} alt="Issue photo by customer" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-slate-100 rounded-card flex items-center justify-center text-trustMuted text-xs font-bold border border-slate-200">
                      No Photo Uploaded
                    </div>
                  )}
                </div>

                {/* Notes by Customer */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-trustMuted mb-2">Customer notes</h4>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-card text-xs text-slate-700 leading-relaxed font-medium">
                    "{bookingNotes}"
                  </div>
                </div>

                {/* Action buttons Call, Chat, Map */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button 
                    onClick={() => alert("Dialing customer Priya R. ...")}
                    className="p-3 bg-[#EAF6F5] text-trustPrimary border border-[#d9efed] rounded-card flex flex-col items-center justify-center gap-1 hover:bg-teal-100 transition-all"
                    style={{ height: '54px' }}>
                    <Phone size={16} />
                    <span className="text-[9px] font-bold">Call Customer</span>
                  </button>
                  <button 
                    onClick={() => alert("Simulating Chat: Loading secure partner chat room...")}
                    className="p-3 bg-[#EAF6F5] text-trustPrimary border border-[#d9efed] rounded-card flex flex-col items-center justify-center gap-1 hover:bg-teal-100 transition-all"
                    style={{ height: '54px' }}>
                    <MessageSquare size={16} />
                    <span className="text-[9px] font-bold">Chat Box</span>
                  </button>
                  <button 
                    onClick={() => alert("Simulated navigation: Opening Google Maps coordinate path...")}
                    className="p-3 bg-[#EAF6F5] text-trustPrimary border border-[#d9efed] rounded-card flex flex-col items-center justify-center gap-1 hover:bg-teal-100 transition-all"
                    style={{ height: '54px' }}>
                    <Navigation size={16} />
                    <span className="text-[9px] font-bold">Navigate</span>
                  </button>
                </div>

              </div>

              {/* Submit to complete service */}
              <div className="bg-white border-t border-slate-100 p-4 absolute bottom-0 left-0 right-0 z-10 shadow-lg">
                <button
                  onClick={() => {
                    setProviderStatusState('in_progress');
                    navigateTo(14);
                  }}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-btn text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                  style={{ height: '48px' }}>
                  Start Service & Complete Work <ChevronRight size={18} />
                </button>
              </div>
            </div>
          );

        // SCREEN 14: UPLOAD COMPLETION PROOF
        case 14:
          return (
            <div className="flex-1 flex flex-col bg-white relative">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <button onClick={handleBack} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full" style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                  <ArrowLeft size={20} className="mx-auto" />
                </button>
                <h2 className="text-base font-bold text-trustText">Complete Job</h2>
              </div>

              {/* Main Content Form */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-28 flex flex-col gap-4">
                
                {/* Upload Section */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Completion Photos *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Placeholder image */}
                    {providerUploadedProof ? (
                      <div className="relative h-28 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img src={providerUploadedProof} alt="Completion Proof thumbnail" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setProviderUploadedProof(null)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                          style={{ height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="h-28 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center text-center p-2">
                        <span className="text-[10px] text-trustMuted">Pre-filled proof</span>
                        <span className="text-xs text-emerald-600 font-bold mt-1">✓ Fixed Washer</span>
                      </div>
                    )}

                    {/* Photo upload trigger */}
                    <div className="relative h-28 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-600 transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer bg-slate-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProviderProofSim}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Camera size={20} className="text-trustMuted mb-1" />
                      <span className="text-[10px] font-bold text-trustText">Add Custom Photo</span>
                      <span className="text-[8px] text-trustMuted">Tap to simulate upload</span>
                    </div>
                  </div>
                </div>

                {/* Job Checklist */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Job Checklist</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { key: 'resolved', text: 'Issue resolved completely' },
                      { key: 'replaced', text: 'Spare parts replaced (Capacitor/Fuse)' },
                      { key: 'cleaned', text: 'Work area cleaned and tidied' }
                    ].map(item => (
                      <label 
                        key={item.key}
                        onClick={() => setChecklist(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-card cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={checklist[item.key]}
                          readOnly
                          className="accent-amber-600 h-4 w-4"
                        />
                        <span className="text-xs font-medium text-slate-700">{item.text}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Technician Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase text-trustMuted tracking-wider mb-1.5">Technician Summary Notes</label>
                  <textarea
                    value={providerNotes}
                    onChange={(e) => setProviderNotes(e.target.value)}
                    placeholder="Describe parts replaced or tasks accomplished..."
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-input text-xs outline-none focus:border-amber-600 font-medium"
                  />
                </div>

              </div>

              {/* Submit CTA Panel */}
              <div className="bg-white border-t border-slate-150 p-4 absolute bottom-0 left-0 right-0 z-10 shadow-lg flex flex-col gap-2">
                {providerStatusState === 'awaiting_confirmation' ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-card p-3">
                    <p className="text-xs font-bold text-amber-800 text-center animate-pulse">Awaiting Customer Confirmation...</p>
                    <p className="text-[10px] text-amber-700 text-center mt-0.5">Funds will release to payout once customer approves</p>
                    <button
                      onClick={() => {
                        setProviderStatusState('completed');
                        alert("Customer confirmed payment! Navigating to Earnings.");
                        navigateTo(15);
                      }}
                      className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-btn transition-all shadow-xs"
                      style={{ height: '38px' }}>
                      Simulate Customer Approval
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!providerUploadedProof) {
                        // Autofill proof photo if empty to not block
                        setProviderUploadedProof('https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&auto=format&fit=crop&q=60');
                      }
                      setProviderStatusState('awaiting_confirmation');
                    }}
                    className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-btn text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                    style={{ height: '48px' }}>
                    Submit & Complete Job
                  </button>
                )}
              </div>
            </div>
          );

        // SCREEN 15: PROVIDER EARNINGS
        case 15:
          return (
            <div className="flex-1 flex flex-col bg-slate-50">
              {/* Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-base font-bold text-trustText">Earnings</h2>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Imran Account</span>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24 flex flex-col gap-4">
                
                {/* 3 Stat Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white p-3 rounded-card border border-slate-200 shadow-2xs text-center">
                    <p className="text-xs text-trustMuted">Today</p>
                    <p className="text-sm font-black text-emerald-600 mt-0.5">₹420</p>
                  </div>
                  <div className="bg-white p-3 rounded-card border border-slate-200 shadow-2xs text-center">
                    <p className="text-xs text-trustMuted">This Week</p>
                    <p className="text-sm font-black text-emerald-600 mt-0.5">₹2,180</p>
                  </div>
                  <div className="bg-white p-3 rounded-card border border-slate-200 shadow-2xs text-center">
                    <p className="text-xs text-trustMuted">This Month</p>
                    <p className="text-sm font-black text-emerald-600 mt-0.5">₹8,650</p>
                  </div>
                </div>

                {/* Simple Weekly Bar Chart */}
                <div className="bg-white border border-slate-200 rounded-card p-4 shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-1">
                    <TrendingUp size={14} className="text-emerald-500" /> Weekly Payout Trend
                  </h4>
                  
                  {/* Chart Bars */}
                  <div className="h-32 flex items-end justify-between gap-1.5 px-2 border-b border-slate-100 pb-1">
                    {[
                      { day: 'Mon', val: 300, pct: '30%' },
                      { day: 'Tue', val: 450, pct: '45%' },
                      { day: 'Wed', val: 200, pct: '20%' },
                      { day: 'Thu', val: 600, pct: '60%' },
                      { day: 'Fri', val: 150, pct: '15%' },
                      { day: 'Sat', val: 950, pct: '95%' },
                      { day: 'Sun', val: 420, pct: '42%' }
                    ].map(bar => (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                        <div className="text-[8px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all">₹{bar.val}</div>
                        <div 
                          style={{ height: bar.pct }} 
                          className="w-full bg-emerald-500 rounded-t-xs hover:bg-emerald-600 transition-all"
                        ></div>
                        <span className="text-[8px] font-bold text-trustMuted">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions list */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-trustMuted mb-2">Recent Transactions</h4>
                  <div className="flex flex-col gap-2">
                    {[
                      { job: 'Washing Machine Repair (#TF10245)', date: 'Today, 05:12 PM', amt: '+ ₹249', status: 'Approved' },
                      { job: 'Refrigerator Servicing (#TF10201)', date: 'Today, 01:30 PM', amt: '+ ₹299', status: 'Settled' },
                      { job: 'AC Deep Cleaning (#TF10196)', date: 'Today, 10:45 AM', amt: '+ ₹199', status: 'Settled' }
                    ].map((tx, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-card p-3 shadow-2xs flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-850">{tx.job}</p>
                          <p className="text-[9px] text-trustMuted mt-0.5">{tx.date} • {tx.status}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">{tx.amt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Provider Bottom Nav */}
              <ProviderBottomNav activeTab="earnings" />
            </div>
          );

      }
    }
  }

  // ==========================================
  // SHARED SUBCOMPONENTS
  // ==========================================

  // Customer Bottom Navigation
  function CustomerBottomNav({ activeTab }) {
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-10 shadow-lg px-2">
        <button
          onClick={() => {
            setNavStack([]);
            setCurrentScreen(2);
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'home' ? 'text-trustPrimary' : 'text-slate-400 hover:text-slate-600'}`}>
          <HomeIcon size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={() => {
            setNavStack([]);
            // Simulate bookings page by jumping to live tracking if active, or booking conf
            navigateTo(6);
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'bookings' ? 'text-trustPrimary' : 'text-slate-400 hover:text-slate-600'}`}>
          <Calendar size={20} />
          <span className="text-[10px] font-bold">Bookings</span>
        </button>

        <button
          onClick={() => {
            setNavStack([]);
            navigateTo(10);
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'support' ? 'text-trustPrimary' : 'text-slate-400 hover:text-slate-600'}`}>
          <LifeBuoy size={20} />
          <span className="text-[10px] font-bold">Support</span>
        </button>

        <button
          onClick={() => {
            alert("Profile screen: Suresh is your default provider. Account #TF-USER-9481.");
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'profile' ? 'text-trustPrimary' : 'text-slate-400 hover:text-slate-600'}`}>
          <User size={20} />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    );
  }

  // Provider Bottom Navigation
  function ProviderBottomNav({ activeTab }) {
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-10 shadow-lg px-2">
        <button
          onClick={() => {
            setNavStack([]);
            setCurrentScreen(12); // Dashboard
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'home' ? 'text-amber-600' : 'text-slate-400'}`}>
          <HomeIcon size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={() => {
            setNavStack([]);
            // Simulate schedule list by jumping to job details
            if (providerJobAccepted) {
              navigateTo(13);
            } else {
              alert("No scheduled jobs active. Accept the pending request first!");
            }
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'jobs' ? 'text-amber-600' : 'text-slate-400'}`}>
          <Calendar size={20} />
          <span className="text-[10px] font-bold">Jobs</span>
        </button>

        <button
          onClick={() => {
            setNavStack([]);
            navigateTo(15); // Earnings
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'earnings' ? 'text-amber-600' : 'text-slate-400'}`}>
          <TrendingUp size={20} />
          <span className="text-[10px] font-bold">Earnings</span>
        </button>

        <button
          onClick={() => {
            alert("Provider Profile: Imran Appliance Care. Registered ID #TF-PROV-8531.");
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1.5 ${activeTab === 'profile' ? 'text-amber-600' : 'text-slate-400'}`}>
          <User size={20} />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    );
  }

  // Provider Card Subcomponent
  function ProviderCard({ p, onClick }) {
    return (
      <div 
        onClick={onClick}
        className="flex items-center gap-3 p-3 bg-trustCardBg border border-[#d9efed] rounded-card cursor-pointer hover:border-trustPrimary hover:shadow-xs transition-all text-left">
        <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 justify-between">
            <h4 className="text-xs font-black text-trustText truncate flex-1">{p.name}</h4>
            <span className="bg-trustPrimary text-[8px] text-white px-1 py-0.2 rounded font-bold uppercase shrink-0">
              Verified
            </span>
          </div>
          
          <p className="text-[10px] text-trustMuted mt-0.5 truncate">{p.address} • {p.distance}</p>
          
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs font-extrabold text-trustPrimary">From ₹{p.price}</span>
            <div className="flex items-center gap-0.5 text-amber-600 font-bold text-[10px]">
              <Star size={10} fill="currentColor" /> {p.rating} ({p.reviewsCount})
            </div>
          </div>
        </div>
      </div>
    );
  }
}
