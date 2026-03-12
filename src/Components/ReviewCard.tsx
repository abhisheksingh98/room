import React, { useState } from 'react';
import moment from 'moment';

interface Review {
    user: string;
    date: string;
    rating: number;
    comment: string;
}

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className='pb-8 border-b border-slate-100 last:border-none'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='flex items-center gap-4 mb-4'>
                <div className='w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400'>
                    {review.user.charAt(0)}
                </div>
                <div>
                    <h4 className='font-bold text-slate-900'>{review.user}</h4>
                    <p className='text-xs text-slate-400'>{moment(review.date).fromNow()}</p>
                </div>
            </div>

            <div className='flex items-center gap-1 mb-3 text-xs'>
                {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className={'fas fa-star ' + (s <= review.rating ? 'text-slate-900' : 'text-slate-200')}></i>
                ))}
            </div>

            <p className={'text-slate-700 leading-relaxed ' + (hovered ? 'font-medium scale-[1.01] transition-all' : '')}>
                {review.comment}
            </p>
        </div>
    );
};

export default ReviewCard;
