import React, { useState, useEffect } from 'react';
import { Worker } from '../types';
import { ALL_CATEGORIES } from '../data/mockData';

const inputClasses = "w-full mt-1 pl-4 pr-4 py-3 border border-coolGray/30 rounded-full focus:ring-2 focus:ring-goldAccent/80 focus:border-goldAccent transition-shadow bg-ivoryWhite soft-shadow-inset text-charcoalBlack placeholder-slateGray";
const labelClasses = "block text-sm font-semibold text-slateGray";

export const WorkerForm: React.FC<{
  initialData?: Worker;
  onSubmit: (data: Omit<Worker, 'id' | 'distance'>) => void;
}> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Worker>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
        const defaultCategory = ALL_CATEGORIES[0];
        setFormData({
            name: '', age: 30, categoryId: defaultCategory.id, categoryName: defaultCategory.name,
            experience: 5, rating: 0, reviewCount: 0, photo: '', verified: false,
            available: true, featured: false, city: '', latitude: 17.3850, longitude: 78.4867,
            serviceAreas: [], reviews: [], phone: '', bio: '', skills: [],
        });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let finalValue: any = value;
    if (type === 'checkbox') finalValue = checked;
    if (type === 'number') finalValue = parseFloat(value) || 0;

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    const category = ALL_CATEGORIES.find(c => c.id === categoryId);
    if (category) {
        setFormData(prev => ({...prev, categoryId: category.id, categoryName: category.name}));
    }
  };
  
  const handleCommaSeparatedChange = (name: 'skills' | 'serviceAreas' | 'badges') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [name]: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Worker, 'id' | 'distance'>);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className={labelClasses}>Full Name</label>
          <input name="name" value={formData.name || ''} onChange={handleChange} required className={inputClasses}/>
        </div>
        <div>
          <label className={labelClasses}>Category</label>
          <select name="categoryId" value={formData.categoryId || ''} onChange={handleCategoryChange} required className={inputClasses}>
              {ALL_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Phone</label>
          <input name="phone" value={formData.phone || ''} onChange={handleChange} required className={inputClasses}/>
        </div>
        <div>
          <label className={labelClasses}>City</label>
          <input name="city" value={formData.city || ''} onChange={handleChange} required className={inputClasses}/>
        </div>
        <div>
          <label className={labelClasses}>Experience (Years)</label>
          <input type="number" name="experience" value={formData.experience || 0} onChange={handleChange} required className={inputClasses}/>
        </div>
        <div>
          <label className={labelClasses}>Photo URL</label>
          <input name="photo" placeholder="https://picsum.photos/..." value={formData.photo || ''} onChange={handleChange} className={inputClasses}/>
        </div>
      </div>
      <div>
        <label className={labelClasses}>Bio</label>
        <textarea name="bio" rows={4} value={formData.bio || ''} onChange={handleChange} className={`${inputClasses} rounded-2xl`}/>
      </div>
       <div>
        <label className={labelClasses}>Skills (comma-separated)</label>
        <input name="skills" value={formData.skills?.join(', ') || ''} onChange={handleCommaSeparatedChange('skills')} className={inputClasses}/>
      </div>
      <div>
        <label className={labelClasses}>Service Areas (comma-separated)</label>
        <input name="serviceAreas" value={formData.serviceAreas?.join(', ') || ''} onChange={handleCommaSeparatedChange('serviceAreas')} className={inputClasses}/>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
          <label className="flex items-center gap-2 text-charcoalBlack font-medium">
              <input type="checkbox" name="verified" checked={!!formData.verified} onChange={handleChange} className="w-5 h-5 rounded text-royalBlue focus:ring-goldAccent"/> Verified
          </label>
          <label className="flex items-center gap-2 text-charcoalBlack font-medium">
              <input type="checkbox" name="available" checked={!!formData.available} onChange={handleChange} className="w-5 h-5 rounded text-royalBlue focus:ring-goldAccent"/> Available
          </label>
          <label className="flex items-center gap-2 text-charcoalBlack font-medium">
              <input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleChange} className="w-5 h-5 rounded text-royalBlue focus:ring-goldAccent"/> Featured
          </label>
      </div>
      <div className="flex justify-end gap-4 pt-6 border-t border-coolGray/50">
        <a href="#/admin/workers" className="px-6 py-2.5 rounded-lg bg-coolGray hover:bg-slateGray/30 text-charcoalBlack font-bold transition-colors">Cancel</a>
        <button type="submit" className="px-6 py-2.5 rounded-lg bg-royalBlue hover:bg-deepNavy text-white font-bold transition-colors shadow-md hover-lift">{initialData ? 'Update Worker' : 'Add Worker'}</button>
      </div>
    </form>
  );
};