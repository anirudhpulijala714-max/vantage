import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { TestimonialItem } from '../data/testimonials';

interface TestimonialCardProps {
  item: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-slate-600 font-medium">{item.loanPurpose}</span>
        </div>

        <p className="text-sm text-slate-700 italic leading-relaxed">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <h5 className="text-sm font-bold text-slate-900">{item.name}</h5>
          <span className="text-xs text-slate-500 block">{item.role}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>{item.city}</span>
        </div>
      </div>
    </div>
  );
};
