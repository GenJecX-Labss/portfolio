"""
Review Repository
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.review import Review


class ReviewRepository:
    """Repository for review database operations"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, review_data: dict) -> Review:
        """Create a new review"""
        review = Review(**review_data)
        self.db.add(review)
        self.db.commit()
        self.db.refresh(review)
        return review
    
    def get_by_id(self, review_id: int) -> Optional[Review]:
        """Get review by ID"""
        return self.db.query(Review).filter(Review.id == review_id).first()
    
    def get_approved(self, skip: int = 0, limit: int = 20) -> List[Review]:
        """Get all approved reviews"""
        return (
            self.db.query(Review)
            .filter(Review.is_approved == True)
            .order_by(desc(Review.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_featured(self, limit: int = 5) -> List[Review]:
        """Get featured reviews"""
        return (
            self.db.query(Review)
            .filter(Review.is_approved == True, Review.is_featured == True)
            .order_by(desc(Review.created_at))
            .limit(limit)
            .all()
        )
    
    def get_all(self, skip: int = 0, limit: int = 50) -> List[Review]:
        """Get all reviews (admin)"""
        return (
            self.db.query(Review)
            .order_by(desc(Review.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_pending(self, skip: int = 0, limit: int = 50) -> List[Review]:
        """Get pending reviews (admin)"""
        return (
            self.db.query(Review)
            .filter(Review.is_approved == False)
            .order_by(desc(Review.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def count_approved(self) -> int:
        """Count approved reviews"""
        return self.db.query(Review).filter(Review.is_approved == True).count()
    
    def count_all(self) -> int:
        """Count all reviews"""
        return self.db.query(Review).count()
    
    def update(self, review_id: int, update_data: dict) -> Optional[Review]:
        """Update a review"""
        review = self.get_by_id(review_id)
        if review:
            for key, value in update_data.items():
                if value is not None:
                    setattr(review, key, value)
            self.db.commit()
            self.db.refresh(review)
        return review
    
    def delete(self, review_id: int) -> bool:
        """Delete a review"""
        review = self.get_by_id(review_id)
        if review:
            self.db.delete(review)
            self.db.commit()
            return True
        return False
