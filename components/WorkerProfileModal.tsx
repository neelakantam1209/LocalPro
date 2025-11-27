import React, { useState, useEffect } from 'react';
import { Worker, Review } from '../types';
import { 
    CloseIcon, HeartIcon, PhoneIcon, CartIcon, CalendarIcon, 
    VerifiedIcon, TrophyIcon, ShieldCheckIcon, BriefcaseIcon, 
    ShareIcon, LocationPinIcon, BackArrowIcon
} from './icons';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface WorkerProfileModalProps {
  worker: Worker;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddReview: (workerId: number, review: Omit<Review, 'id' | 'userImage'>) => void;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-background p-4 rounded-xl border border-border">
        <div className="flex items-start gap-3">
            <img src={review.userImage} alt={review.userName} className="w-10 h-10 rounded-full object-cover shadow-sm" />
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold font-display text-text-primary text-sm">{review.userName}</h4>
                    <span className="text-xs text-text-tertiary">{new Date(review.date || Date.now()).toLocaleDateString()}</span>
                </div>
                <StarRating rating={review.rating} showCount={false} size="sm" />
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">{review.comment}</p>
                {review.mediaUrl && <img src={review.mediaUrl} alt="Review media" className="mt-2 rounded-lg max-h-32 w-auto"/>}
            </div>
        </div>
    </div>
);

const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({ worker, onClose, isFavorite, onToggleFavorite, onAddReview }) => {
  const [view, setView] = useState<'details' | 'review'>('details');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewComment.trim()) {
      onAddReview(worker.id, {
        userName: 'You',
        rating: reviewRating,
        comment: reviewComment,
      });
      setView('details');
      setReviewComment('');
      setReviewRating(5);
    }
  };

  const handleAddToCart = () => {
      addToCart({
          workerId: worker.id,
          workerName: worker.name,
          serviceName: worker.categoryName,
          price: worker.hourlyRate || 500,
          image: worker.photo
      });
  };

  const handleShare = () => {
      if (navigator.share) {
          navigator.share({
              title: `Hire ${worker.name} on LocalPro`,
              text: `Check out ${worker.name}, a ${worker.categoryName} in ${worker.city}.`,
              url: window.location.href
          }).catch(console.error);
      } else {
          showToast('Link copied to clipboard', 'info');
      }
  };
  
  const actionButtonClasses = "w-full font-bold font-sans py-3 px-4 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2";

  return (
    <div className="fixed inset-0 bg-secondary/80 backdrop-blur-md z-[100] flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-2xl h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:rounded-3xl rounded-none shadow-2xl overflow-hidden flex flex-col relative animate-in slide-in-from-bottom duration-300">
        
        {/* Header Actions - Improved Back Button & Spacing */}
        <div className="absolute top-4 left-4 z-30">
             <button onClick={onClose} className="p-2 rounded-full bg-white/90 hover:bg-white text-text-primary shadow-sm backdrop-blur-sm transition-colors flex items-center gap-1 pr-3">
                <BackArrowIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Back</span>
            </button>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2 z-30">
             <button onClick={handleShare} className="p-2 rounded-full bg-white/90 hover:bg-white text-text-primary shadow-sm backdrop-blur-sm transition-colors">
                <ShareIcon className="w-5 h-5"/>
            </button>
            <button onClick={onToggleFavorite} className="p-2 rounded-full bg-white/90 hover:bg-white text-text-primary shadow-sm backdrop-blur-sm transition-colors">
                <HeartIcon isFilled={isFavorite} className="w-5 h-5" />
            </button>
        </div>

        <div className="overflow-y-auto flex-grow scrollbar-hide">
            {/* Cover / Profile Section - Fixed Z-Index & Overlap */}
            <div className="relative">
                 <div className="h-32 bg-gradient-to-r from-primary to-accent opacity-90 relative z-0"></div>
                 <div className="px-6 relative z-10 -mt-16 flex flex-col sm:flex-row items-start sm:items-end gap-4 pointer-events-none">
                     {/* Image Wrapper - Click to Zoom */}
                    <div className="pointer-events-auto cursor-zoom-in relative group" onClick={() => setIsZoomed(true)}>
                         <img 
                            src={worker.photo} 
                            alt={worker.name} 
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-surface shadow-xl bg-surface relative z-10 group-hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>
                    
                    <div className="flex-1 pt-2 sm:pb-2 pointer-events-auto mt-2 sm:mt-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-primary">{worker.name}</h2>
                            {worker.verified && <VerifiedIcon className="w-6 h-6 text-blue-500" title="Verified"/>}
                        </div>
                         <p className="text-primary font-semibold text-lg">{worker.categoryName}</p>
                    </div>
                 </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Stats & Badges */}
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="bg-background px-4 py-2 rounded-xl flex items-center gap-2">
                        <StarRating rating={worker.rating} count={worker.reviewCount} size="md" />
                    </div>
                    <div className="bg-background px-4 py-2 rounded-xl flex items-center gap-2 text-text-secondary text-sm font-medium">
                        <LocationPinIcon className="w-4 h-4"/> {worker.city}
                    </div>
                     <div className="bg-background px-4 py-2 rounded-xl flex items-center gap-2 text-text-secondary text-sm font-medium">
                        <BriefcaseIcon className="w-4 h-4"/> {worker.jobsCompleted} Jobs Done
                    </div>
                </div>
                
                {/* Badges */}
                {(worker.badges && worker.badges.length > 0) || (worker.rating > 4.5) || (worker.experience > 5) ? (
                    <div className="flex flex-wrap gap-3">
                        {worker.rating > 4.5 && (
                             <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wide rounded-full border border-yellow-200">
                                <TrophyIcon className="w-4 h-4"/> Top Rated
                             </div>
                        )}
                        {worker.verified && (
                             <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full border border-blue-200">
                                <ShieldCheckIcon className="w-4 h-4"/> Verified Worker
                             </div>
                        )}
                        {worker.experience > 5 && (
                             <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide rounded-full border border-purple-200">
                                <BriefcaseIcon className="w-4 h-4"/> Highly Experienced
                             </div>
                        )}
                         {worker.badges?.map(badge => (
                            <span key={badge} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wide rounded-full border border-gray-200">{badge}</span>
                        ))}
                    </div>
                ): null}

                {/* About */}
                <div>
                    <h3 className="text-xl font-display font-bold text-text-primary mb-3">About</h3>
                    <p className="text-text-secondary leading-relaxed">{worker.bio}</p>
                    <div className="mt-4 flex gap-8">
                        <div>
                            <span className="block text-2xl font-bold text-text-primary">{worker.experience}+</span>
                            <span className="text-sm text-text-tertiary uppercase tracking-wider font-semibold">Years Exp.</span>
                        </div>
                         <div>
                            <span className="block text-2xl font-bold text-text-primary">{worker.jobsCompleted}</span>
                            <span className="text-sm text-text-tertiary uppercase tracking-wider font-semibold">Projects</span>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <h3 className="text-xl font-display font-bold text-text-primary mb-3">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                        {worker.skills.map(skill => (
                            <span key={skill} className="bg-white border border-border text-text-primary font-medium px-4 py-2 rounded-xl shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Reviews */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-display font-bold text-text-primary">Reviews ({worker.reviewCount})</h3>
                        {view === 'details' && (
                            <button onClick={() => setView('review')} className="text-sm font-bold text-primary hover:underline">Write a Review</button>
                        )}
                    </div>
                    
                    {view === 'review' ? (
                         <form onSubmit={handleReviewSubmit} className="bg-background p-4 rounded-xl border border-border animate-in fade-in slide-in-from-top-2">
                             <h4 className="font-bold mb-3">Rate your experience</h4>
                             <div className="flex gap-2 mb-4">
                                {[1,2,3,4,5].map(star => (
                                    <button key={star} type="button" onClick={() => setReviewRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                                        <StarRating rating={star <= reviewRating ? 1 : 0} count={0} showCount={false} size="lg"/>
                                    </button>
                                ))}
                             </div>
                             <textarea 
                                value={reviewComment} onChange={e => setReviewComment(e.target.value)} 
                                placeholder="Tell us about the service..." 
                                className="w-full p-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary mb-3"
                                rows={3}
                                required
                             />
                             <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setView('details')} className="px-4 py-2 text-text-secondary font-semibold hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover">Post Review</button>
                             </div>
                         </form>
                    ) : (
                        <div className="space-y-4">
                            {worker.reviews.length > 0 ? (
                                worker.reviews.slice(0, 3).map(review => <ReviewCard key={review.id} review={review} />)
                            ) : (
                                <p className="text-text-secondary italic">No reviews yet.</p>
                            )}
                            {worker.reviews.length > 3 && (
                                <button className="w-full py-2 text-primary font-semibold border border-primary/20 rounded-xl hover:bg-primary-subtle transition-colors">
                                    View All Reviews
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="h-24"></div> {/* Spacer for fixed bottom bar */}
        </div>

        {/* Sticky Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border p-4 px-6 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
             <div className="flex-1">
                 <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">Total Price</p>
                 <p className="text-xl font-bold text-text-primary">₹{worker.hourlyRate || 500}<span className="text-sm font-normal text-text-secondary">/hr</span></p>
             </div>
             <button onClick={handleAddToCart} className="p-3 bg-primary-subtle text-primary rounded-xl hover:bg-primary/20 transition-colors">
                 <CartIcon className="w-6 h-6"/>
             </button>
             <button onClick={() => {
                 onClose();
             }} className={`${actionButtonClasses} flex-grow bg-secondary text-white hover:bg-black`}>
                 Book Now
             </button>
        </div>
      </div>
      
      {/* Zoom Image Overlay */}
      {isZoomed && (
          <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setIsZoomed(false)}>
              <img src={worker.photo} alt={worker.name} className="max-w-full max-h-full rounded-lg shadow-2xl animate-in zoom-in duration-300 object-contain"/>
              <button className="absolute top-4 right-4 text-white p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors">
                  <CloseIcon className="w-8 h-8"/>
              </button>
          </div>
      )}
    </div>
  );
};

export default WorkerProfileModal;
