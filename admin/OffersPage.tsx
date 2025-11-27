import React, { useContext, useState } from 'react';
import { WorkerContext } from '../context/WorkerContext';
import { Offer } from '../types';
import { TrashIcon, PlusIcon, TagIcon } from '../components/icons';

const OffersPage: React.FC = () => {
    const { offers, addOffer, deleteOffer } = useContext(WorkerContext)!;
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'flat' | 'percentage'>('percentage');
    const [value, setValue] = useState(0);
    const [validTill, setValidTill] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addOffer({
            title, description, type, value, validTill
        });
        setIsFormOpen(false);
        // Reset
        setTitle(''); setDescription(''); setValue(0);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-display text-text-primary">Manage Offers</h1>
                <button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-md">
                    <PlusIcon /> Create Offer
                </button>
            </div>

            {/* Create Offer Form */}
            {isFormOpen && (
                <div className="bg-surface p-6 rounded-2xl shadow-lg mb-8 border border-border">
                    <h2 className="text-xl font-bold mb-4">New Offer</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Offer Title (e.g. Summer Sale)" value={title} onChange={e => setTitle(e.target.value)} required className="p-3 border rounded-lg w-full"/>
                            <input type="date" value={validTill} onChange={e => setValidTill(e.target.value)} required className="p-3 border rounded-lg w-full"/>
                        </div>
                        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="p-3 border rounded-lg w-full" rows={2}/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select value={type} onChange={e => setType(e.target.value as any)} className="p-3 border rounded-lg w-full">
                                <option value="percentage">Percentage (%)</option>
                                <option value="flat">Flat Amount (₹)</option>
                            </select>
                            <input type="number" placeholder="Value" value={value} onChange={e => setValue(Number(e.target.value))} required className="p-3 border rounded-lg w-full"/>
                        </div>
                        <div className="flex justify-end gap-2">
                             <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                             <button type="submit" className="px-4 py-2 bg-success text-white rounded-lg">Save Offer</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Offers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map(offer => (
                    <div key={offer.id} className="bg-surface p-6 rounded-2xl shadow-md border-l-4 border-accent relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                    <TagIcon className="w-5 h-5"/> {offer.title}
                                </h3>
                                <p className="text-text-secondary text-sm mt-1">{offer.description}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-text-primary">
                                    {offer.type === 'percentage' ? `${offer.value}% OFF` : `₹${offer.value} FLAT`}
                                </div>
                                <p className="text-xs text-text-tertiary">Expires: {new Date(offer.validTill).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button onClick={() => deleteOffer(offer.id)} className="absolute bottom-4 right-4 text-error hover:bg-red-50 p-2 rounded-full transition-colors">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </div>
                ))}
            </div>
            {offers.length === 0 && !isFormOpen && <p className="text-center text-text-secondary py-10">No active offers.</p>}
        </div>
    );
};

export default OffersPage;