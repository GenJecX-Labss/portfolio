"""
API Tests

Test API endpoints functionality.
"""

import pytest
from fastapi.testclient import TestClient


class TestHealthEndpoints:
    """Test health check endpoints"""
    
    def test_root_endpoint(self, client: TestClient):
        """Test root endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "operational"
        assert "version" in data
    
    def test_health_check(self, client: TestClient):
        """Test health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"


class TestProjectEndpoints:
    """Test project API endpoints"""
    
    def test_list_projects_empty(self, client: TestClient):
        """Test listing projects when none exist"""
        response = client.get("/api/v1/projects/")
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        assert len(response.json()) == 0
    
    def test_get_project_not_found(self, client: TestClient):
        """Test getting non-existent project"""
        response = client.get("/api/v1/projects/nonexistent-slug")
        assert response.status_code == 404


class TestContactEndpoint:
    """Test contact form endpoint"""
    
    def test_submit_contact_form_valid(self, client: TestClient):
        """Test submitting valid contact form"""
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "company": "Test Corp",
            "contact_type": "general",
            "subject": "Test Subject",
            "message": "This is a test message that is long enough to pass validation."
        }
        
        response = client.post("/api/v1/contact/", json=data)
        assert response.status_code == 201
        result = response.json()
        assert result["name"] == data["name"]
        assert "id" in result
    
    def test_submit_contact_form_invalid_email(self, client: TestClient):
        """Test submitting contact form with invalid email"""
        data = {
            "name": "John Doe",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message",
            "contact_type": "general"
        }
        
        response = client.post("/api/v1/contact/", json=data)
        assert response.status_code == 422  # Validation error
    
    def test_submit_contact_form_short_message(self, client: TestClient):
        """Test submitting contact form with too short message"""
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Test",
            "message": "Short",
            "contact_type": "general"
        }
        
        response = client.post("/api/v1/contact/", json=data)
        assert response.status_code == 422


class TestAuditEndpoint:
    """Test audit request endpoint"""
    
    def test_submit_audit_request_valid(self, client: TestClient):
        """Test submitting valid audit request"""
        data = {
            "company_name": "Test Company",
            "contact_name": "Jane Smith",
            "contact_email": "jane@testcompany.com",
            "contact_phone": "1234567890",
            "audit_type": "ml_model_review",
            "project_description": "We have a machine learning model for fraud detection that needs review. It's currently in production and processing 10k transactions per day. We're concerned about model drift and want an expert audit.",
            "current_challenges": "Model performance has degraded over the past 3 months",
            "preferred_timeline": "2-3 weeks"
        }
        
        response = client.post("/api/v1/audits/", json=data)
        assert response.status_code == 201
        result = response.json()
        assert result["company_name"] == data["company_name"]
        assert "id" in result


class TestAdminEndpoints:
    """Test admin API endpoints"""
    
    def test_admin_login_no_user(self, client: TestClient):
        """Test admin login with non-existent user"""
        data = {
            "email": "nonexistent@admin.com",
            "password": "wrongpassword"
        }
        
        response = client.post("/api/v1/admin/login", json=data)
        assert response.status_code == 401
    
    def test_admin_protected_endpoint_no_auth(self, client: TestClient):
        """Test accessing protected endpoint without auth"""
        response = client.get("/api/v1/admin/projects")
        assert response.status_code == 403  # No auth header
    
    def test_admin_protected_endpoint_with_auth(
        self,
        client: TestClient,
        auth_headers: dict
    ):
        """Test accessing protected endpoint with auth"""
        response = client.get(
            "/api/v1/admin/projects",
            headers=auth_headers
        )
        assert response.status_code == 200