import React, { useState } from 'react';
import { Worker, Review } from '../types';
import { StarIcon, VerifiedIcon, CloseIcon, HeartIcon, ClockIcon, MoneyIcon, PhoneIcon } from './icons';

interface WorkerProfileModalProps {
  worker: Worker;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddReview: (workerId: number, review: Omit<Review, 'id' | 'userImage'>) => void;
}

const StarRatingInput: React.FC<{ rating: number; setRating: (r: number) => void }> = ({ rating, setRating }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className="text-3xl transform hover:scale-110 transition-transform"
        aria-label={`Rate ${star} stars`}
      >
        <StarIcon className={`w-8 h-8 transition-colors ${star <= rating ? 'text-goldAccent' : 'text-coolGray/50'}`} />
      </button>
    ))}
  </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-softWhite/80 soft-shadow p-4 rounded-lg border border-coolGray/30">
        <div className="flex items-start gap-3">
            <img src={review.userImage} alt={review.userName} className="w-10 h-10 rounded-full object-cover shadow-md" />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold font-display text-deepNavy">{review.userName}</h4>
                    <div className="flex items-center gap-1 text-sm bg-ivoryWhite px-2 py-0.5 rounded-full shadow-inner">
                        <StarIcon className="text-goldAccent" />
                        <span className="text-charcoalBlack font-bold">{review.rating.toFixed(1)}</span>
                    </div>
                </div>
                <p className="text-slateGray text-sm mt-1">{review.comment}</p>
                {review.mediaUrl && <img src={review.mediaUrl} alt="Review media" className="mt-2 rounded-lg max-h-40 w-auto"/>}
            </div>
        </div>
    </div>
);

const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({ worker, onClose, isFavorite, onToggleFavorite, onAddReview }) => {
  const [view, setView] = useState<'details' | 'review'>('details');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

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
  
  const actionButtonClasses = "w-full text-white font-bold font-sans py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:shadow-inner active:translate-y-px transition-all duration-200";

  const renderContent = () => {
    if (view === 'review') {
      return (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-charcoalBlack">{`Review ${worker.name}`}</h2>
            <form onSubmit={handleReviewSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slateGray mb-2">Your Rating</label>
                        <StarRatingInput rating={reviewRating} setRating={setReviewRating} />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-slateGray">Your Review</label>
                        <textarea id="comment" value={reviewComment} onChange={e => setReviewComment(e.target.value)} rows={4} required placeholder="Share your experience..." className="mt-1 block w-full px-3 py-2 bg-white/50 border border-coolGray/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-goldAccent/80"></textarea>
                    </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={() => setView('details')} className={`${actionButtonClasses} bg-slateGray hover:bg-charcoalBlack`}>Cancel</button>
                    <button type="submit" className={`${actionButtonClasses} bg-emeraldGreen hover:bg-emeraldGreen/90 btn-green-glow`}>
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
      );
    }
    
    return (
      <>
        <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <img src={worker.photo} alt={worker.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl" />
                <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoalBlack">{worker.name}</h2>
                        {worker.verified && <VerifiedIcon title="Verified Professional" className="w-7 h-7 text-electricBlue" />}
                    </div>
                    <p className="text-lg font-semibold text-royalBlue">{worker.categoryName}</p>
                    <p className="text-slateGray">{worker.experience} years experience • {worker.city}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-md">
                        <StarIcon className="text-goldAccent"/>
                        <span className="font-bold text-charcoalBlack">{worker.rating.toFixed(1)}</span>
                        <span className="text-slateGray">({worker.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 text-deepNavy">About</h3>
                <p className="text-slateGray text-sm">{worker.bio}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 text-deepNavy">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {worker.skills.map(skill => (
                        <span key={skill} className="bg-frostedBlue text-royalBlue text-sm font-medium px-3 py-1 rounded-full shadow-sm">{skill}</span>
                    ))}
                </div>
            </div>
            
            <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-deepNavy">Reviews ({worker.reviews.length})</h3>
                    <button onClick={() => setView('review')} className="text-sm font-semibold text-royalBlue hover:text-goldAccent hover:underline">Write a Review</button>
                </div>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {worker.reviews.length > 0 ? (
                        worker.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                    ) : (
                        <p className="text-slateGray text-sm text-center py-4">No reviews yet. Be the first!</p>
                    )}
                </div>
            </div>
        </div>
        
        <div className="sticky bottom-0 bg-white/30 backdrop-blur-sm p-4 border-t border-goldAccent/20">
             <a href={`tel:${worker.phone}`} className={`${actionButtonClasses} bg-emeraldGreen hover:bg-emeraldGreen/90 btn-green-glow text-center flex items-center justify-center gap-2`}>
                <PhoneIcon/> Call Now ({worker.phone})
            </a>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-deepNavy/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="glassmorphism text-charcoalBlack rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative flex flex-col border border-goldAccent/30" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button onClick={onToggleFavorite} className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors" aria-label="Toggle Favorite">
                <HeartIcon isFilled={isFavorite} />
            </button>
            <button onClick={onClose} className="p-1 rounded-full bg-white/30 hover:bg-white/50 text-slateGray hover:text-charcoalBlack transition-colors">
                <CloseIcon />
            </button>
        </div>
        
        <div className="flex-grow">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileModal;