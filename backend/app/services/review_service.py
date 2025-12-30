"""
Review Service
"""

from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.review import Review
from app.repositories.review_repo import ReviewRepository
from app.schemas.review import ReviewCreate, ReviewUpdate


class ReviewService:
    """Service for review business logic"""
    
    def __init__(self, db: Session):
        self.repo = ReviewRepository(db)
    
    def create_review(self, data: ReviewCreate) -> Review:
        """Create a new review (pending approval)"""
        review_data = data.model_dump()
        review_data["is_approved"] = False  # Require admin approval
        review_data["is_featured"] = False
        return self.repo.create(review_data)
    
    def get_public_reviews(self, page: int = 1, per_page: int = 20) -> dict:
        """Get approved reviews for public display"""
        skip = (page - 1) * per_page
        reviews = self.repo.get_approved(skip=skip, limit=per_page)
        total = self.repo.count_approved()
        return {
            "reviews": reviews,
            "total": total,
            "page": page,
            "per_page": per_page
        }
    
    def get_featured_reviews(self, limit: int = 5) -> List[Review]:
        """Get featured reviews"""
        return self.repo.get_featured(limit=limit)
    
    def get_review_by_id(self, review_id: int) -> Optional[Review]:
        """Get a specific review"""
        return self.repo.get_by_id(review_id)
    
    def approve_review(self, review_id: int) -> Optional[Review]:
        """Approve a review"""
        return self.repo.update(review_id, {"is_approved": True})
    
    def feature_review(self, review_id: int, featured: bool = True) -> Optional[Review]:
        """Feature or unfeature a review"""
        return self.repo.update(review_id, {"is_featured": featured})
    
    def update_review(self, review_id: int, data: ReviewUpdate) -> Optional[Review]:
        """Update review (admin)"""
        update_data = data.model_dump(exclude_unset=True)
        return self.repo.update(review_id, update_data)
    
    def delete_review(self, review_id: int) -> bool:
        """Delete a review"""
        return self.repo.delete(review_id)
    
    def get_all_reviews(self, page: int = 1, per_page: int = 50) -> dict:
        """Get all reviews (admin)"""
        skip = (page - 1) * per_page
        reviews = self.repo.get_all(skip=skip, limit=per_page)
        total = self.repo.count_all()
        return {
            "reviews": reviews,
            "total": total,
            "page": page,
            "per_page": per_page
        }
    
    def get_pending_reviews(self, page: int = 1, per_page: int = 50) -> dict:
        """Get pending reviews (admin)"""
        skip = (page - 1) * per_page
        reviews = self.repo.get_pending(skip=skip, limit=per_page)
        total = len(reviews)  # Simple count for pending
        return {
            "reviews": reviews,
            "total": total,
            "page": page,
            "per_page": per_page
        }
