import React, { useContext } from 'react';
import { WorkerContext } from '../context/WorkerContext';
import { Worker } from '../types';
import { EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon, StarIcon, PlusIcon, DocumentArrowDownIcon } from '../components/icons';

const WorkerListPage: React.FC = () => {
    const workerContext = useContext(WorkerContext);
    if (!workerContext) return null;
    const { workers, deleteWorker, updateWorker } = workerContext;
    
    const handleToggleVerified = (worker: Worker) => {
        updateWorker({ ...worker, verified: !worker.verified });
    };

    const handleToggleFeatured = (worker: Worker) => {
        updateWorker({ ...worker, featured: !worker.featured });
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

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold font-display text-deepNavy">Worker Management</h1>
                <div className="flex gap-3">
                    <button onClick={handleCsvExport} className="bg-slateGray hover:bg-charcoalBlack text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover-lift">
                        <DocumentArrowDownIcon/> Export
                    </button>
                    <a href="#/admin/workers/add" className="bg-royalBlue hover:bg-deepNavy text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover-lift">
                        <PlusIcon /> Add Worker
                    </a>
                </div>
            </div>
            
            <div className="bg-softWhite rounded-2xl shadow-lg soft-shadow">
                {/* Desktop Header */}
                <div className="hidden md:grid md:grid-cols-7 items-center gap-4 px-6 py-4 text-xs text-royalBlue uppercase bg-coolGray/40">
                    <div className="col-span-2 font-semibold">Worker</div>
                    <div className="font-semibold">Category</div>
                    <div className="font-semibold">Location</div>
                    <div className="font-semibold">Rating</div>
                    <div className="font-semibold text-center">Verified</div>
                    <div className="font-semibold text-center">Featured</div>
                    <div className="font-semibold text-center">Actions</div>
                </div>

                {/* Worker List */}
                <div className="divide-y divide-coolGray/50">
                    {workers.map(worker => (
                        <div key={worker.id} className="p-4 md:grid md:grid-cols-7 md:items-center md:gap-4 md:p-0 md:px-6 md:py-4 hover:bg-coolGray/30 transition-colors">
                            
                            {/* --- Worker Info --- */}
                            <div className="md:col-span-2 flex items-center gap-3">
                                <img src={worker.photo} alt={worker.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"/>
                                <div>
                                    <div className="font-bold text-deepNavy">{worker.name}</div>
                                    <div className="text-slateGray text-xs">{worker.experience} yrs exp.</div>
                                </div>
                            </div>
                            
                            {/* --- Details Grid (Mobile) / Direct Children (Desktop) --- */}
                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4 text-sm md:contents">
                                <div className="flex justify-between items-center md:block">
                                    <span className="font-semibold text-slateGray md:hidden">Category: </span>
                                    <span>{worker.categoryName}</span>
                                </div>
                                <div className="flex justify-between items-center md:block">
                                    <span className="font-semibold text-slateGray md:hidden">Location: </span>
                                    <span>{worker.city}</span>
                                </div>

                                <div className="col-span-2 flex justify-between items-center md:block">
                                    <span className="font-semibold text-slateGray md:hidden">Rating: </span>
                                    <div className="flex items-center gap-1">
                                        <StarIcon className="text-goldAccent"/>
                                        <span className="font-bold">{worker.rating.toFixed(1)}</span> <span className="text-slateGray text-xs">({worker.reviewCount})</span>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-center md:justify-center">
                                    <span className="font-semibold text-slateGray md:hidden">Verified: </span>
                                    <button onClick={() => handleToggleVerified(worker)} className="cursor-pointer">
                                        {worker.verified ? <CheckCircleIcon className="w-6 h-6 text-emeraldGreen"/> : <XCircleIcon className="w-6 h-6 text-goldAccent"/>}
                                    </button>
                                </div>

                                <div className="flex justify-between items-center md:justify-center">
                                    <span className="font-semibold text-slateGray md:hidden">Featured: </span>
                                    <button onClick={() => handleToggleFeatured(worker)} className="cursor-pointer">
                                        <StarIcon className={`w-6 h-6 transition-colors ${worker.featured ? 'text-goldAccent' : 'text-coolGray'}`}/>
                                    </button>
                                </div>

                                {/* --- Actions --- */}
                                <div className="col-span-2 md:col-span-1 border-t mt-3 pt-3 md:border-t-0 md:mt-0 md:pt-0">
                                    <div className="flex justify-end items-center gap-4 md:justify-center">
                                        <a href={`#/admin/workers/edit/${worker.id}`} className="font-medium text-royalBlue hover:text-goldAccent transition-colors"><EditIcon/></a>
                                        <button onClick={() => deleteWorker(worker.id)} className="font-medium text-slateGray hover:text-errorRed transition-colors"><TrashIcon/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {workers.length === 0 && <p className="text-center p-8 text-slateGray">No workers found. Click "Add Worker" to get started.</p>}
                </div>
            </div>
        </div>
    );
};

export default WorkerListPage;