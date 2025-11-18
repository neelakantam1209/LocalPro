import { Category, CategorySection, Worker } from '../types';
import { 
    WrenchIcon, BoltIcon, ScissorsIcon, HammerIcon, CarIcon, StethoscopeIcon, 
    // Fix: Removed non-existent LoomIcon from imports.
    TrowelIcon, DollyIcon, BroomIcon, PaintBrushIcon, GardeningIcon, 
    PestControlIcon, ApplianceRepairIcon, MechanicIcon, BeauticianIcon, HairStylistIcon, 
    FitnessTrainerIcon, PetCareIcon, BabysitterIcon, NurseIcon, PhysiotherapistIcon, 
    LabTechnicianIcon, TutorIcon, AccountantIcon, PhotographerIcon, EventPlannerIcon, 
    CookIcon, SecurityGuardIcon, WelderIcon, MachineOperatorIcon, SiteHelperIcon, 
    GraphicDesignerIcon, WebDeveloperIcon, ContentWriterIcon, DataEntryIcon
} from '../components/icons';

const householdCategories: Category[] = [
    { id: 'painter', name: 'Painters', icon: PaintBrushIcon },
    { id: 'cleaning', name: 'Cleaners', icon: BroomIcon },
    { id: 'gardener', name: 'Gardeners', icon: GardeningIcon },
    { id: 'pest-control', name: 'Pest Control', icon: PestControlIcon },
    { id: 'mover', name: 'Movers', icon: DollyIcon },
    { id: 'appliance-repair', name: 'Appliance Repair', icon: ApplianceRepairIcon },
    { id: 'mechanic', name: 'Mechanics', icon: MechanicIcon },
];

const personalLifestyleCategories: Category[] = [
    { id: 'tailor', name: 'Tailors', icon: ScissorsIcon },
    { id: 'beautician', name: 'Beauticians', icon: BeauticianIcon },
    { id: 'hairstylist', name: 'Hair Stylists', icon: HairStylistIcon },
    { id: 'fitness-trainer', name: 'Fitness Trainers', icon: FitnessTrainerIcon },
    { id: 'pet-care', name: 'Pet Care', icon: PetCareIcon },
    { id: 'babysitter', name: 'Babysitters', icon: BabysitterIcon },
];

const healthcareCategories: Category[] = [
    { id: 'doctor', name: 'Doctors', icon: StethoscopeIcon },
    { id: 'nurse', name: 'Nurses', icon: NurseIcon },
    { id: 'physiotherapist', name: 'Physiotherapists', icon: PhysiotherapistIcon },
    { id: 'lab-technician', name: 'Lab Technicians', icon: LabTechnicianIcon },
];

const professionalSkilledCategories: Category[] = [
    { id: 'driver', name: 'Drivers', icon: CarIcon },
    { id: 'tutor', name: 'Tutors', icon: TutorIcon },
    { id: 'accountant', name: 'Accountants', icon: AccountantIcon },
    { id: 'photographer', name: 'Photographers', icon: PhotographerIcon },
    { id: 'event-planner', name: 'Event Planners', icon: EventPlannerIcon },
    { id: 'cook', name: 'Cooks', icon: CookIcon },
    { id: 'security-guard', name: 'Security Guards', icon: SecurityGuardIcon },
];

const constructionIndustrialCategories: Category[] = [
    { id: 'plumber', name: 'Plumbers', icon: WrenchIcon },
    { id: 'electrician', name: 'Electricians', icon: BoltIcon },
    { id: 'carpenter', name: 'Carpenters', icon: HammerIcon },
    { id: 'mason', name: 'Masons', icon: TrowelIcon },
    { id: 'welder', name: 'Welders', icon: WelderIcon },
    { id: 'machine-operator', name: 'Machine Operators', icon: MachineOperatorIcon },
    { id: 'site-helper', name: 'Site Helpers', icon: SiteHelperIcon },
];

const digitalFreelanceCategories: Category[] = [
    { id: 'graphic-designer', name: 'Graphic Designers', icon: GraphicDesignerIcon },
    { id: 'web-developer', name: 'Web Developers', icon: WebDeveloperIcon },
    { id: 'content-writer', name: 'Content Writers', icon: ContentWriterIcon },
    { id: 'data-entry', name: 'Data Entry', icon: DataEntryIcon },
];

export const CATEGORY_SECTIONS: CategorySection[] = [
    { title: '🧱 Construction & Industrial', categories: constructionIndustrialCategories },
    { title: '🏠 Household & Maintenance', categories: householdCategories },
    { title: '🧵 Personal & Lifestyle', categories: personalLifestyleCategories },
    { title: '💼 Professional & Skilled Services', categories: professionalSkilledCategories },
    { title: '🏥 Healthcare & Support', categories: healthcareCategories },
    { title: '💻 Digital & Freelance Services', categories: digitalFreelanceCategories },
];


export const ALL_CATEGORIES = CATEGORY_SECTIONS.flatMap(section => section.categories);

export const WORKERS: Worker[] = [
  {
    id: 1, name: 'Rajesh Kumar', age: 38, categoryId: 'plumber', categoryName: 'Plumber', experience: 12, rating: 4.8, reviewCount: 152, distance: 0,
    photo: 'https://picsum.photos/id/1005/200/200', verified: true, available: true, featured: true, city: 'Kukatpally, Hyderabad', latitude: 17.4948, longitude: 78.4000, phone: '9876543210', hourlyRate: 25, nextAvailable: 'Today, 2 PM',
    badges: ['Top Rated', 'Certified'],
    serviceAreas: ['Residential Plumbing', 'Drain Cleaning', 'Pipe Repair'],
    skills: ['Leak Detection', 'Pipe Fitting', 'Water Heater Repair', 'Drainage Systems'],
    bio: "With over a decade of experience, Rajesh is a master plumber known for his reliability and quick problem-solving skills. He ensures every job is done to the highest standard.",
    reviews: [
      { id: 1, userName: 'Anjali S.', userImage: 'https://picsum.photos/id/1011/50/50', rating: 5, comment: 'Very professional and fixed the leak quickly!' },
      { id: 2, userName: 'Vikram B.', userImage: 'https://picsum.photos/id/1012/50/50', rating: 4, comment: 'Good work, but arrived a little late.' },
    ]
  },
  {
    id: 2, name: 'Suresh Singh', age: 32, categoryId: 'plumber', categoryName: 'Plumber', experience: 8, rating: 4.5, reviewCount: 89, distance: 0,
    photo: 'https://picsum.photos/id/1006/200/200', verified: false, available: true, featured: false, city: 'Gachibowli, Hyderabad', latitude: 17.4401, longitude: 78.3489, phone: '9876543211', hourlyRate: 20, nextAvailable: 'Tomorrow',
    serviceAreas: ['Water Heater Installation', 'Leak Detection'],
    skills: ['Geyser Installation', 'Tap Replacement', 'Emergency Plumbing'],
    bio: "Suresh is a diligent plumber who specializes in modern bathroom fittings and water heater installations. He is committed to providing affordable and effective solutions.",
    reviews: [
      { id: 1, userName: 'Priya M.', userImage: 'https://picsum.photos/id/1013/50/50', rating: 5, comment: 'Excellent service. Highly recommend.' },
    ]
  },

  {
    id: 3, name: 'Amit Patel', age: 42, categoryId: 'electrician', categoryName: 'Electrician', experience: 15, rating: 4.9, reviewCount: 210, distance: 0,
    photo: 'https://picsum.photos/id/1015/200/200', verified: true, available: true, featured: true, city: 'Madhapur, Hyderabad', latitude: 17.4483, longitude: 78.3915, phone: '9876543212', hourlyRate: 30, badges: ['Top Rated'],
    serviceAreas: ['Wiring and Rewiring', 'Fixture Installation', 'Panel Upgrades'],
    skills: ['Circuit Breaker Repair', 'Commercial Wiring', 'Safety Inspections'],
    bio: "A certified and highly experienced electrician, Amit handles everything from minor repairs to complete house wiring with utmost safety and precision.",
    reviews: [
      { id: 1, userName: 'Rohan D.', userImage: 'https://picsum.photos/id/1014/50/50', rating: 5, comment: 'Amit is a master of his craft. Very safe and efficient.' },
      { id: 2, userName: 'Sunita K.', userImage: 'https://picsum.photos/id/1016/50/50', rating: 5, comment: 'He fixed our power outage in minutes. Lifesaver!' },
    ]
  },
  {
    id: 4, name: 'Deepak Verma', age: 29, categoryId: 'electrician', categoryName: 'Electrician', experience: 7, rating: 4.6, reviewCount: 75, distance: 0,
    photo: 'https://picsum.photos/id/1018/200/200', verified: true, available: false, featured: false, city: 'Ameerpet, Hyderabad', latitude: 17.4375, longitude: 78.4483, phone: '9876543213',
    serviceAreas: ['Lighting Installation', 'General Repairs'],
    skills: ['Fan Installation', 'Inverter Setup', 'Fault Finding'],
    bio: "Deepak is a young and energetic electrician specializing in modern lighting solutions and home appliance electrical setups.",
    reviews: []
  },

  {
    id: 5, name: 'Fatima Ansari', age: 45, categoryId: 'tailor', categoryName: 'Tailor', experience: 20, rating: 5.0, reviewCount: 305, distance: 0,
    photo: 'https://picsum.photos/id/1027/200/200', verified: true, available: true, featured: true, city: 'Banjara Hills, Hyderabad', latitude: 17.4156, longitude: 78.4446, phone: '9876543214', badges: ['Top Rated'],
    serviceAreas: ['Custom Suits', 'Alterations', 'Dressmaking'],
    skills: ['Bridal Wear', 'Pattern Making', 'Embroidery'],
    bio: "With an impeccable eye for detail, Fatima creates stunning custom garments and provides perfect alterations. She is renowned for her bridal wear designs.",
    reviews: [
      { id: 1, userName: 'Aisha K.', userImage: 'https://picsum.photos/id/1025/50/50', rating: 5, comment: 'The best tailor in the city! My dress was perfect.' },
    ]
  },

  {
    id: 6, name: 'Balaji Reddy', age: 48, categoryId: 'carpenter', categoryName: 'Carpenter', experience: 18, rating: 4.7, reviewCount: 180, distance: 0,
    photo: 'https://picsum.photos/id/103/200/200', verified: true, available: true, featured: false, city: 'Kondapur, Hyderabad', latitude: 17.4641, longitude: 78.3622, phone: '9876543215', hourlyRate: 35,
    serviceAreas: ['Custom Furniture', 'Cabinet Making', 'Wood Repair'],
    skills: ['Modular Kitchens', 'Wardrobe Design', 'Door Installation'],
    bio: "Balaji is a skilled carpenter who can bring any furniture design to life. He excels at creating custom pieces that are both beautiful and functional.",
    reviews: []
  },
  {
      id: 8, name: 'Dr. Priya Sharma', age: 35, categoryId: 'doctor', categoryName: 'General Physician', experience: 10, rating: 4.9, reviewCount: 500, distance: 0,
      photo: 'https://picsum.photos/id/1066/200/200', verified: true, available: true, featured: true, city: 'Jubilee Hills, Hyderabad', latitude: 17.4316, longitude: 78.4068, phone: '9876543217',
      serviceAreas: ['General Checkup', 'Fever Treatment', 'Consultation'],
      skills: ['Family Medicine', 'Preventive Care', 'Minor Illnesses'],
      bio: "Dr. Priya Sharma is a compassionate and experienced General Physician dedicated to providing comprehensive healthcare for families. She believes in patient education and preventive care.",
      reviews: [
          { id: 1, userName: 'Ravi G.', userImage: 'https://picsum.photos/id/1020/50/50', rating: 5, comment: 'Very patient and knowledgeable doctor.' },
      ]
  },
];