
export interface FeatureInfo {
  icon: string;
  title: string;
  description: string;
  bgColorClass: string;
}

export interface PricingPlanInfo {
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonClass: string;
  textColorClass?: string;
  borderColorClass?: string;
  bgColorClass?: string;
  badgeText?: string;
}

export interface TestimonialInfo {
  avatarInitials: string;
  avatarBgClass: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface TourItineraryItem {
  time: string;
  description: string;
}

export interface TourSuggestedPrices {
  GetYourGuide: string;
  Viator: string;
  AirbnbExperiences: string;
}

export interface GeneratedTourData {
  title: string;
  itinerary: TourItineraryItem[];
  suggestedPrices: TourSuggestedPrices;
  clientPrice: string;
  shortDescription: string;
  imageUrl?: string; 
  extraSuggestions?: string[];
  lastSync?: string;
  isRealTime?: boolean;
  tourFormat?: string;
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
  insiderTip?: string;
}

export interface SavedTour {
  id: string;
  timestamp: number;
  continentId: string;
  continentImage: string;
  data: GeneratedTourData;
}
