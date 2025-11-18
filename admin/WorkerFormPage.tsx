import React, { useContext, useEffect, useState } from 'react';
import { WorkerContext } from '../context/WorkerContext';
import { WorkerForm } from '../components/WorkerForm';
import { Worker } from '../types';
import { BackArrowIcon } from '../components/icons';

const WorkerFormPage: React.FC = () => {
    const [worker, setWorker] = useState<Worker | undefined>(undefined);
    const workerContext = useContext(WorkerContext);
    if (!workerContext) return null;
    const { getWorkerById, addWorker, updateWorker } = workerContext;
    
    const hash = window.location.hash;
    const isEditMode = hash.includes('/edit/');
    const workerId = isEditMode ? parseInt(hash.split('/edit/')[1], 10) : null;

    useEffect(() => {
        if (isEditMode && workerId) {
            const foundWorker = getWorkerById(workerId);
            setWorker(foundWorker);
        }
    }, [workerId, isEditMode, getWorkerById]);

    const handleSubmit = (formData: Omit<Worker, 'id' | 'distance'>) => {
        if (isEditMode && worker) {
            updateWorker({ ...worker, ...formData });
        } else {
            addWorker(formData);
        }
        window.location.hash = '#/admin/workers';
    };

    if (isEditMode && !worker) {
        return <div>Loading worker data or worker not found...</div>;
    }

    return (
        <div>
            <a href="#/admin/workers" className="flex items-center gap-2 mb-4 text-royalBlue hover:text-goldAccent font-semibold transition-colors">
              <BackArrowIcon />
              Back to Worker List
            </a>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-deepNavy mb-8">
                {isEditMode ? `Edit ${worker?.name || 'Worker'}` : 'Add New Worker'}
            </h1>
            <div className="bg-softWhite p-8 rounded-2xl shadow-lg soft-shadow">
                <WorkerForm onSubmit={handleSubmit} initialData={worker} />
            </div>
        </div>
    );
};

export default WorkerFormPage;