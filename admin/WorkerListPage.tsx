import React, { useContext } from 'react';
import { WorkerContext } from '../context/WorkerContext';
import { Worker } from '../types';
import { EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon, StarIcon, PlusIcon, DocumentArrowDownIcon } from '../components/icons';
import { useNavigate } from 'react-router-dom';

const WorkerListPage: React.FC = () => {
    const workerContext = useContext(WorkerContext);
    const navigate = useNavigate();
    if (!workerContext) return null;
    const { workers, deleteWorker, updateWorker } = workerContext;
    
    const handleToggleVerified = (worker: Worker) => {
        updateWorker({ ...worker, verified: !worker.verified });
    };

    const handleToggleFeatured = (worker: Worker) => {
        updateWorker({ ...worker, featured: !worker.featured });
    };

    const navigateToEdit = (id: number) => {
        navigate(`/admin/workers/edit/${id}`);
    };

    const escapeCsvCell = (cellData: any): string => {
        const stringData = String(cellData ?? '');
        if (stringData.includes(',') || stringData.includes('"') || stringData.includes('\n')) {
            return `"${stringData.replace(/"/g, '""')}"`;
        }
        return stringData;
    };
    
    const handleCsvExport = () => {
        const headers = ["ID", "Name", "Age", "Category", "Experience (yrs)", "Rating", "Review Count", "Phone", "City", "Verified", "Available", "Featured", "Bio", "Skills", "Service Areas", "Badges"];
        const rows = workers.map(w => [w.id, w.name, w.age, w.categoryName, w.experience, w.rating, w.reviewCount, w.phone, w.city, w.verified, w.available, w.featured, w.bio, w.skills.join('; '), w.serviceAreas.join('; '), w.badges ? w.badges.join('; ') : ''].map(escapeCsvCell));
        let csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "workers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Helper component for Star Rating display
    const RatingDisplay = ({ rating, count }: { rating: number, count: number }) => (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-text-secondary">Rating:</span>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-accent' : 'text-gray-300'}`} />
                ))}
            </div>
            <span className="text-xs text-text-secondary font-medium">({count} ratings)</span>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-text-primary">Worker Management</h1>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={handleCsvExport} className="flex-1 md:flex-none justify-center bg-text-secondary hover:bg-text-primary text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover-lift">
                        <DocumentArrowDownIcon/> Export
                    </button>
                    <a href="#/admin/workers/add" className="flex-1 md:flex-none justify-center bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover-lift">
                        <PlusIcon /> Add Worker
                    </a>
                </div>
            </div>
            
            <div className="bg-surface rounded-2xl shadow-lg overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden lg:grid lg:grid-cols-7 items-center gap-4 px-6 py-4 text-xs text-primary uppercase bg-background border-b border-border">
                    <div className="col-span-2 font-semibold">Worker</div>
                    <div className="font-semibold">Category</div>
                    <div className="font-semibold">Location</div>
                    <div className="col-span-1 font-semibold">Rating</div>
                    <div className="font-semibold text-center">Verified</div>
                    <div className="font-semibold text-center">Featured</div>
                    <div className="font-semibold text-center">Actions</div>
                </div>

                {/* Worker List */}
                <div className="divide-y divide-border">
                    {workers.map(worker => (
                        <div key={worker.id} className="p-4 lg:grid lg:grid-cols-7 lg:items-center lg:gap-4 lg:px-6 lg:py-5 hover:bg-background transition-colors">
                            
                            {/* --- Worker Info --- */}
                            <div className="lg:col-span-2 flex items-center gap-4 mb-4 lg:mb-0">
                                <button 
                                    onClick={() => navigateToEdit(worker.id)} 
                                    className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <img src={worker.photo} alt={worker.name} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-white shadow-md"/>
                                </button>
                                <div>
                                    <button 
                                        onClick={() => navigateToEdit(worker.id)}
                                        className="font-bold text-text-primary hover:text-primary transition-colors text-left"
                                    >
                                        {worker.name}
                                    </button>
                                    <div className="text-text-secondary text-xs">{worker.experience} yrs exp. • {worker.age} yrs old</div>
                                </div>
                            </div>
                            
                            {/* --- Details for Mobile (Stacked) / Desktop (Grid) --- */}
                            
                            {/* Category */}
                            <div className="mb-2 lg:mb-0 flex items-center justify-between lg:block">
                                <span className="lg:hidden font-semibold text-text-secondary text-sm">Category:</span>
                                <span className="text-text-primary">{worker.categoryName}</span>
                            </div>

                            {/* Location */}
                            <div className="mb-2 lg:mb-0 flex items-center justify-between lg:block">
                                <span className="lg:hidden font-semibold text-text-secondary text-sm">Location:</span>
                                <span className="text-text-primary">{worker.city}</span>
                            </div>

                            {/* Rating */}
                            <div className="col-span-1 mb-2 lg:mb-0 flex items-center justify-between lg:block">
                                <span className="lg:hidden font-semibold text-text-secondary text-sm">Rating:</span>
                                <RatingDisplay rating={worker.rating} count={worker.reviewCount} />
                            </div>
                            
                            {/* Verified */}
                            <div className="mb-2 lg:mb-0 flex items-center justify-between lg:justify-center">
                                <span className="lg:hidden font-semibold text-text-secondary text-sm">Verified:</span>
                                <button onClick={() => handleToggleVerified(worker)} className="cursor-pointer">
                                    {worker.verified ? <CheckCircleIcon className="w-6 h-6 text-success"/> : <XCircleIcon className="w-6 h-6 text-accent"/>}
                                </button>
                            </div>

                            {/* Featured */}
                            <div className="mb-4 lg:mb-0 flex items-center justify-between lg:justify-center">
                                <span className="lg:hidden font-semibold text-text-secondary text-sm">Featured:</span>
                                <button onClick={() => handleToggleFeatured(worker)} className="cursor-pointer">
                                    <StarIcon className={`w-6 h-6 transition-colors ${worker.featured ? 'text-accent' : 'text-border'}`}/>
                                </button>
                            </div>

                            {/* --- Actions --- */}
                            <div className="lg:col-span-1 border-t lg:border-t-0 pt-3 lg:pt-0">
                                <div className="flex justify-end lg:justify-center items-center gap-4">
                                    <a href={`#/admin/workers/edit/${worker.id}`} className="flex items-center gap-1 font-medium text-primary hover:text-accent transition-colors">
                                        <EditIcon/> <span className="lg:hidden">Edit</span>
                                    </a>
                                    <button onClick={() => deleteWorker(worker.id)} className="flex items-center gap-1 font-medium text-text-secondary hover:text-error transition-colors">
                                        <TrashIcon/> <span className="lg:hidden">Delete</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                    {workers.length === 0 && <p className="text-center p-8 text-text-secondary">No workers found. Click "Add Worker" to get started.</p>}
                </div>
            </div>
        </div>
    );
};

export default WorkerListPage;