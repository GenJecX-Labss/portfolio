"""
Review API Routes
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.review_service import ReviewService
from app.schemas.review import (
    ReviewCreate,
    ReviewUpdate,
    ReviewResponse,
    ReviewAdminResponse,
    ReviewListResponse
)
from app.schemas.common import MessageResponse

router = APIRouter()


@router.get("", response_model=ReviewListResponse)
def get_reviews(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """
    Get all approved reviews (public).
    """
    service = ReviewService(db)
    result = service.get_public_reviews(page=page, per_page=per_page)
    return ReviewListResponse(
        reviews=[ReviewResponse.model_validate(r) for r in result["reviews"]],
        total=result["total"],
        page=result["page"],
        per_page=result["per_page"]
    )


@router.get("/featured", response_model=List[ReviewResponse])
def get_featured_reviews(
    limit: int = Query(5, ge=1, le=10),
    db: Session = Depends(get_db)
):
    """
    Get featured reviews for homepage display.
    """
    service = ReviewService(db)
    reviews = service.get_featured_reviews(limit=limit)
    return [ReviewResponse.model_validate(r) for r in reviews]


@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(
    data: ReviewCreate,
    db: Session = Depends(get_db)
):
    """
    Submit a new review (requires admin approval).
    """
    service = ReviewService(db)
    review = service.create_review(data)
    return ReviewResponse.model_validate(review)


@router.get("/{review_id}", response_model=ReviewResponse)
def get_review(
    review_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific review.
    """
    service = ReviewService(db)
    review = service.get_review_by_id(review_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    if not review.is_approved:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    return ReviewResponse.model_validate(review)


# Admin endpoints (should be protected with auth in production)
@router.patch("/{review_id}/approve", response_model=ReviewResponse)
def approve_review(
    review_id: int,
    db: Session = Depends(get_db)
):
    """
    Approve a review (admin).
    """
    service = ReviewService(db)
    review = service.approve_review(review_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    return ReviewResponse.model_validate(review)


@router.patch("/{review_id}/feature", response_model=ReviewResponse)
def feature_review(
    review_id: int,
    featured: bool = True,
    db: Session = Depends(get_db)
):
    """
    Feature or unfeature a review (admin).
    """
    service = ReviewService(db)
    review = service.feature_review(review_id, featured=featured)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    return ReviewResponse.model_validate(review)


@router.delete("/{review_id}", response_model=MessageResponse)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a review (admin).
    """
    service = ReviewService(db)
    success = service.delete_review(review_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    return MessageResponse(message="Review deleted successfully", success=True)
