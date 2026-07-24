export interface Review {
  reviewId: string;
  rating: number;
  title: string;
  comment: string;

  date: string;
  helpfulVotes: number;

  user: ReviewUser;

  images: string[];
}

export interface ReviewUser {
  displayName: string;
  verified: boolean;
  location: string;
}
