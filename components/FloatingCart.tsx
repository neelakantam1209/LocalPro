import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CartIcon, PlusIcon } from './icons';

interface FloatingCartProps {
    onOpenCart: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onOpenCart }) => {
    const { addToCart, cartItems } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const workerId = Number(e.dataTransfer.getData("workerId"));
        const workerName = e.dataTransfer.getData("workerName");
        const serviceName = e.dataTransfer.getData("categoryName");
        const price = Number(e.dataTransfer.getData("price"));
        const image = e.dataTransfer.getData("image");

        if (workerId && workerName) {
            addToCart({
                workerId,
                workerName,
                serviceName,
                price,
                image
            });
        }
    };

    return (
        <div 
            className={`fixed bottom-8 right-6 z-[60] transition-all duration-300 ease-in-out flex flex-col items-end gap-2 hidden md:flex`}
        >
            {/* Expanded Mini View on Hover/Drag */}
            {(isHovered || isDragOver) && cartItems.length > 0 && (
                <div className="bg-surface mb-2 p-3 rounded-xl shadow-xl border border-border w-64 animate-in slide-in-from-bottom-5">
                    <h4 className="font-bold text-sm mb-2 text-text-primary">Cart Summary</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {cartItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs border-b border-border pb-1 last:border-0">
                                <img src={item.image} className="w-8 h-8 rounded object-cover" alt="" />
                                <div className="truncate flex-1">
                                    <span className="font-semibold block truncate">{item.workerName}</span>
                                    <span className="text-text-secondary">₹{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Drop Zone / Cart Button */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onOpenCart}
                className={`
                    relative rounded-full shadow-2xl cursor-pointer flex items-center justify-center transition-all duration-300
                    ${isDragOver 
                        ? 'w-24 h-24 bg-accent scale-110 ring-8 ring-accent/30' 
                        : 'w-16 h-16 bg-primary hover:bg-primary-hover'
                    }
                `}
            >
                {isDragOver ? (
                    <div className="flex flex-col items-center animate-bounce">
                        <PlusIcon className="w-10 h-10 text-white" />
                        <span className="text-white text-xs font-bold mt-1">Drop Here</span>
                    </div>
                ) : (
                    <CartIcon className="w-8 h-8 text-white" />
                )}
                
                {cartItems.length > 0 && !isDragOver && (
                    <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm border-2 border-background">
                        {cartItems.length}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FloatingCart;
