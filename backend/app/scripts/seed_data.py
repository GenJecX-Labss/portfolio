#!/usr/bin/env python3
"""
Seed Sample Data

Populate database with sample data for development/testing.
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.core.database import SessionLocal
from app.models.project import Project
from app.models.research import Research
from app.models.founder import Founder
from app.core.constants import (
    ProjectStatus, ProjectVisibility, ProjectCategory,
    ResearchType, ResearchStatus
)


def seed_projects(db: Session):
    """Seed sample projects"""
    print("\nSeeding projects...")
    
    projects = [
        Project(
            title="AI-Powered Code Review System",
            slug="ai-code-review-system",
            description="Automated code review using advanced ML models to detect bugs and suggest improvements",
            long_description="A comprehensive code review system that uses state-of-the-art language models...",
            category=ProjectCategory.NLP,
            tags=["AI", "Code Review", "NLP", "Machine Learning"],
            tech_stack=["Python", "Transformers", "FastAPI", "React"],
            status=ProjectStatus.PUBLISHED,
            visibility=ProjectVisibility.SHOWCASE,
            featured=True,
            published_at=datetime.utcnow()
        ),
        Project(
            title="Real-time Object Detection for Autonomous Vehicles",
            slug="realtime-object-detection",
            description="High-performance object detection system optimized for edge devices in autonomous vehicles",
            category=ProjectCategory.COMPUTER_VISION,
            tags=["Computer Vision", "Object Detection", "Edge AI", "Autonomous"],
            tech_stack=["PyTorch", "YOLO", "TensorRT", "C++"],
            status=ProjectStatus.PUBLISHED,
            visibility=ProjectVisibility.PUBLIC,
            published_at=datetime.utcnow() - timedelta(days=15)
        ),
        Project(
            title="Predictive Maintenance ML Pipeline",
            slug="predictive-maintenance-pipeline",
            description="End-to-end ML pipeline for industrial equipment failure prediction",
            category=ProjectCategory.TIME_SERIES,
            tags=["Time Series", "Predictive Analytics", "IoT", "MLOps"],
            tech_stack=["Python", "TensorFlow", "MLflow", "Kubeflow"],
            status=ProjectStatus.PUBLISHED,
            visibility=ProjectVisibility.PUBLIC,
            published_at=datetime.utcnow() - timedelta(days=30)
        )
    ]
    
    for project in projects:
        db.add(project)
    
    db.commit()
    print(f"✓ Seeded {len(projects)} projects")


def seed_research(db: Session):
    """Seed sample research"""
    print("\nSeeding research...")
    
    research_items = [
        Research(
            title="Efficient Transformer Architectures for Edge Deployment",
            slug="efficient-transformer-architectures",
            abstract="We present novel transformer optimization techniques that reduce memory footprint by 60% while maintaining accuracy...",
            research_type=ResearchType.PAPER,
            authors=["John Doe", "Jane Smith"],
            affiliations=["GenJecX Research", "MIT"],
            keywords=["Transformers", "Model Compression", "Edge AI"],
            status=ResearchStatus.PUBLISHED,
            is_public=True,
            featured=True,
            publication_date=datetime.utcnow() - timedelta(days=45),
            published_at=datetime.utcnow() - timedelta(days=45)
        ),
        Research(
            title="Scalable Reinforcement Learning for Multi-Agent Systems",
            slug="scalable-rl-multi-agent",
            abstract="A novel approach to training large-scale multi-agent reinforcement learning systems...",
            research_type=ResearchType.TECHNICAL_REPORT,
            authors=["Alice Johnson"],
            affiliations=["GenJecX Research"],
            keywords=["Reinforcement Learning", "Multi-Agent", "Scalability"],
            status=ResearchStatus.PUBLISHED,
            is_public=True,
            publication_date=datetime.utcnow() - timedelta(days=20),
            published_at=datetime.utcnow() - timedelta(days=20)
        )
    ]
    
    for research in research_items:
        db.add(research)
    
    db.commit()
    print(f"✓ Seeded {len(research_items)} research items")


def seed_founders(db: Session):
    """Seed founder profiles"""
    print("\nSeeding founders...")
    
    founders = [
        Founder(
            name="Dr. Sarah Chen",
            title="Co-Founder & Chief Scientist",
            bio="Former ML research lead at Google AI with 10+ years in production ML systems. PhD in Computer Science from Stanford.",
            short_bio="ML research leader with deep expertise in production systems",
            expertise_areas=["Machine Learning", "Deep Learning", "MLOps"],
            is_public=True,
            display_order=1
        ),
        Founder(
            name="Michael Rodriguez",
            title="Co-Founder & CEO",
            bio="Serial entrepreneur with successful exits in enterprise AI. Previously founded two ML startups acquired by Fortune 500 companies.",
            short_bio="Serial entrepreneur focused on enterprise AI",
            expertise_areas=["Business Strategy", "Enterprise Sales", "Product Management"],
            is_public=True,
            display_order=2
        )
    ]
    
    for founder in founders:
        db.add(founder)
    
    db.commit()
    print(f"✓ Seeded {len(founders)} founders")


def seed_all():
    """Seed all sample data"""
    print("="*60)
    print("GenJecX Backend - Sample Data Seeding")
    print("="*60)
    
    db: Session = SessionLocal()
    
    try:
        seed_projects(db)
        seed_research(db)
        seed_founders(db)
        
        print("\n" + "="*60)
        print("✓ All sample data seeded successfully!")
        print("="*60)
        
    except Exception as e:
        print(f"\n✗ Error seeding data: {e}")
        db.rollback()
        sys.exit(1)
    
    finally:
        db.close()


if __name__ == "__main__":
    seed_all()