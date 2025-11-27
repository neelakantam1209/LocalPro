
import { Category, CategorySection, Worker } from '../types';
import { 
    WrenchIcon, BoltIcon, ScissorsIcon, HammerIcon, CarIcon, StethoscopeIcon, 
    TrowelIcon, DollyIcon, BroomIcon, PaintBrushIcon, GardeningIcon, 
    PestControlIcon, ApplianceRepairIcon, MechanicIcon, BeauticianIcon, HairStylistIcon, 
    FitnessTrainerIcon, PetCareIcon, BabysitterIcon, NurseIcon, PhysiotherapistIcon, 
    LabTechnicianIcon, TutorIcon, AccountantIcon, PhotographerIcon, EventPlannerIcon, 
    CookIcon, SecurityGuardIcon, WelderIcon, MachineOperatorIcon, SiteHelperIcon, 
    GraphicDesignerIcon, WebDeveloperIcon, ContentWriterIcon, DataEntryIcon,
    TreeIcon, CameraIcon, SunIcon, SupportIcon
} from '../components/icons';

const householdCategories: Category[] = [
    { id: 'cleaning', name: 'Cleaners', icon: BroomIcon },
    { id: 'gardener', name: 'Gardeners', icon: GardeningIcon },
    { id: 'pest-control', name: 'Pest Control', icon: PestControlIcon },
    { id: 'coconut-climber', name: 'Coconut Tree Climber', icon: TreeIcon }, // NEW
    { id: 'painter', name: 'Painters', icon: PaintBrushIcon },
    { id: 'mover', name: 'Movers', icon: DollyIcon },
];

const specializedCategories: Category[] = [
    { id: 'cctv', name: 'CCTV Surveillance', icon: CameraIcon }, // NEW
    { id: 'solar', name: 'Solar Installation', icon: SunIcon }, // NEW
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

const healthcareSupportCategories: Category[] = [
    { id: 'doctor', name: 'Doctors', icon: StethoscopeIcon },
    { id: 'nurse', name: 'Nurses', icon: NurseIcon },
    { id: 'physiotherapist', name: 'Physiotherapists', icon: PhysiotherapistIcon },
    { id: 'lab-technician', name: 'Lab Technicians', icon: LabTechnicianIcon },
    { id: 'ambulance', name: 'Ambulance Services', icon: CarIcon }, // NEW
    { id: 'personal-support', name: 'Personal Support', icon: SupportIcon }, // NEW
];

const professionalSkilledCategories: Category[] = [
    { id: 'call-support', name: 'Call Support', icon: SupportIcon }, // NEW
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
    { title: '🏡 Household & Maintenance', categories: householdCategories },
    { title: '⚡ Specialized Services', categories: specializedCategories },
    { title: '🏗️ Construction & Industrial', categories: constructionIndustrialCategories },
    { title: '🏥 Healthcare & Support', categories: healthcareSupportCategories },
    { title: '💇 Personal & Lifestyle', categories: personalLifestyleCategories },
    { title: '💼 Professional Services', categories: professionalSkilledCategories },
    { title: '💻 Digital & Freelance', categories: digitalFreelanceCategories },
];


export const ALL_CATEGORIES = CATEGORY_SECTIONS.flatMap(section => section.categories);

export const WORKERS: Worker[] = [
  {
    id: 1, name: 'Rajesh Kumar', age: 38, categoryId: 'plumber', categoryName: 'Plumber', experience: 12, rating: 4.8, reviewCount: 152, distance: 0,
    photo: 'https://picsum.photos/id/1005/200/200', verified: true, available: true, featured: true, city: 'Kukatpally', latitude: 17.4948, longitude: 78.4000, phone: '9876543210', hourlyRate: 300, nextAvailable: 'Today, 2 PM',
    badges: ['Top Rated', 'Certified'],
    serviceAreas: ['Residential Plumbing', 'Drain Cleaning', 'Pipe Repair'],
    skills: ['Leak Detection', 'Pipe Fitting', 'Water Heater Repair', 'Drainage Systems'],
    bio: "With over a decade of experience, Rajesh is a master plumber known for his reliability and quick problem-solving skills.",
    reviews: [
      { id: 1, userName: 'Anjali S.', userImage: 'https://picsum.photos/id/1011/50/50', rating: 5, comment: 'Very professional and fixed the leak quickly!', date: '2023-10-15' },
    ]
  },
  {
    id: 2, name: 'Suresh Singh', age: 32, categoryId: 'coconut-climber', categoryName: 'Coconut Tree Climber', experience: 8, rating: 4.9, reviewCount: 45, distance: 0,
    photo: 'https://picsum.photos/id/1006/200/200', verified: true, available: true, featured: true, city: 'Gachibowli', latitude: 17.4401, longitude: 78.3489, phone: '9876543211', hourlyRate: 50, nextAvailable: 'Tomorrow',
    serviceAreas: ['Coconut Harvesting', 'Tree Trimming'],
    skills: ['Traditional Climbing', 'Safety Equipment Usage'],
    bio: "Expert coconut tree climber using safety gear. Quick and clean harvesting.",
    reviews: []
  },
  {
    id: 3, name: 'SecureTech Team', age: 0, categoryId: 'cctv', categoryName: 'CCTV Surveillance', experience: 5, rating: 4.7, reviewCount: 20, distance: 0,
    photo: 'https://picsum.photos/id/1015/200/200', verified: true, available: true, featured: true, city: 'Madhapur', latitude: 17.4483, longitude: 78.3915, phone: '9876543212', hourlyRate: 1500, badges: ['Agency'],
    serviceAreas: ['Camera Installation', 'Maintenance', 'IP Cameras'],
    skills: ['Wiring', 'Network Config', 'Remote View Setup'],
    bio: "Professional team for home and office security solutions.",
    reviews: []
  },
    {
    id: 4, name: 'Green Energy Sol', age: 0, categoryId: 'solar', categoryName: 'Solar Installation', experience: 7, rating: 4.8, reviewCount: 33, distance: 0,
    photo: 'https://picsum.photos/id/1018/200/200', verified: true, available: true, featured: false, city: 'Banjara Hills', latitude: 17.4156, longitude: 78.4446, phone: '9876543213', hourlyRate: 5000,
    serviceAreas: ['Rooftop Solar', 'Panel Cleaning'],
    skills: ['Installation', 'Inverter Sync', 'Maintenance'],
    bio: "Helping you switch to renewable energy with efficient solar panel installations.",
    reviews: []
  },
  {
      id: 5, name: 'Dr. Priya Sharma', age: 35, categoryId: 'doctor', categoryName: 'Doctors', experience: 10, rating: 4.9, reviewCount: 500, distance: 0,
      photo: 'https://picsum.photos/id/1066/200/200', verified: true, available: true, featured: true, city: 'Jubilee Hills', latitude: 17.4316, longitude: 78.4068, phone: '9876543217',
      serviceAreas: ['General Checkup', 'Fever Treatment', 'Consultation'],
      skills: ['Family Medicine', 'Preventive Care', 'Minor Illnesses'],
      bio: "Dr. Priya Sharma is a compassionate and experienced General Physician.",
      reviews: []
  },
];