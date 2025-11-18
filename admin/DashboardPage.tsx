import React, { useContext } from 'react';
import { WorkerContext } from '../context/WorkerContext';
import { ALL_CATEGORIES } from '../data/mockData';
import { UsersIcon, CheckBadgeIcon, StarIcon, WrenchIcon, ChartPieIcon } from '../components/icons';

// Fix: Changed icon prop type to React.ReactElement for type safety with React.cloneElement.
const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactElement; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-softWhite p-6 rounded-2xl soft-shadow hover-lift flex items-center gap-5 border-l-4" style={{ borderColor: color }}>
        {/* Fix: Color the icon by setting the parent's color property and letting the SVG inherit it,
            which avoids a TypeScript error with React.cloneElement and generic props. */}
        <div className="p-4 rounded-full" style={{ backgroundColor: `${color}20`, color: color }}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-slateGray">{title}</p>
            <p className="text-3xl font-bold text-charcoalBlack">{value}</p>
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
    const workerContext = useContext(WorkerContext);

    if (!workerContext) return null;
    const { workers } = workerContext;

    const totalWorkers = workers.length;
    const totalCategories = ALL_CATEGORIES.length;
    const verifiedWorkers = workers.filter(w => w && w.verified).length;
    const featuredWorkers = workers.filter(w => w && w.featured).length;

    const categoryCounts = workers.reduce<Record<string, number>>((acc, worker) => {
        if (worker && worker.categoryName) {
            acc[worker.categoryName] = (acc[worker.categoryName] || 0) + 1;
        }
        return acc;
    }, {});

    const topCategories = Object.entries(categoryCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5);


    return (
        <div>
            <h1 className="text-4xl font-bold font-display text-deepNavy mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Workers" value={totalWorkers} icon={<UsersIcon className="w-8 h-8"/>} color="#1A3D7C" />
                <StatCard title="Total Categories" value={totalCategories} icon={<WrenchIcon className="w-8 h-8"/>} color="#6A0DAD" />
                <StatCard title="Verified" value={verifiedWorkers} icon={<CheckBadgeIcon className="w-8 h-8"/>} color="#2ECC71" />
                <StatCard title="Featured" value={featuredWorkers} icon={<StarIcon className="w-8 h-8"/>} color="#D4AF37" />
            </div>

            <div className="mt-12 bg-softWhite p-8 rounded-2xl soft-shadow">
                <h2 className="text-2xl font-bold font-display text-deepNavy mb-6 flex items-center gap-3">
                    <ChartPieIcon className="w-7 h-7"/>
                    Top Categories by Worker Count
                </h2>
                <div className="space-y-4">
                    {topCategories.map(([category, count]) => {
                        const widthPercentage = totalWorkers > 0 ? (count / totalWorkers) * 100 : 0;
                        return (
                            <div key={category}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-md font-semibold text-charcoalBlack">{category}</span>
                                    <span className="text-sm font-medium text-slateGray">{count} workers</span>
                                </div>
                                <div className="w-full bg-coolGray rounded-full h-3 soft-shadow-inset">
                                    <div className="bg-gradient-to-r from-royalBlue to-electricBlue h-3 rounded-full" style={{ width: `${widthPercentage}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                 {topCategories.length === 0 && (
                    <p className="text-center text-slateGray py-6">No worker data available to display category usage.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;