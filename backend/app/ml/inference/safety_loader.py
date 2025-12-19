"""
ML Safety Filters

Content safety and input validation for ML systems.
"""

from typing import Any, Dict, Optional
import re

from app.core.logging import get_logger

logger = get_logger(__name__)


class SafetyFilter:
    """
    Safety filters for ML inputs and outputs.
    
    Prevents:
    - Malicious inputs
    - Prompt injection
    - Unsafe outputs
    - PII exposure
    """
    
    def __init__(self):
        # Patterns for unsafe content
        self.injection_patterns = [
            r"ignore\s+previous\s+instructions",
            r"system\s*:\s*you\s+are",
            r"<script[^>]*>",
            r"javascript:",
            r"onerror\s*=",
        ]
        
        # PII patterns
        self.pii_patterns = [
            r"\b\d{3}-\d{2}-\d{4}\b",  # SSN
            r"\b\d{16}\b",  # Credit card
            r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",  # Email
        ]
    
    def validate_input(self, input_data: Any) -> tuple[bool, Optional[str]]:
        """
        Validate ML input for safety.
        
        Args:
            input_data: Input to validate
        
        Returns:
            (is_safe, reason) tuple
        """
        if isinstance(input_data, str):
            # Check for injection attempts
            for pattern in self.injection_patterns:
                if re.search(pattern, input_data, re.IGNORECASE):
                    logger.warning(
                        "unsafe_input_detected",
                        reason="injection_attempt",
                        pattern=pattern
                    )
                    return False, "Potentially unsafe input detected"
            
            # Check input length
            if len(input_data) > 10000:
                return False, "Input too long"
        
        elif isinstance(input_data, dict):
            # Recursively validate dict values
            for key, value in input_data.items():
                is_safe, reason = self.validate_input(value)
                if not is_safe:
                    return False, reason
        
        elif isinstance(input_data, list):
            # Validate list items
            for item in input_data:
                is_safe, reason = self.validate_input(item)
                if not is_safe:
                    return False, reason
        
        return True, None
    
    def sanitize_output(self, output_data: Any) -> Any:
        """
        Sanitize ML output before returning to user.
        
        Args:
            output_data: Output to sanitize
        
        Returns:
            Sanitized output
        """
        if isinstance(output_data, str):
            # Remove potential PII
            sanitized = output_data
            
            for pattern in self.pii_patterns:
                sanitized = re.sub(pattern, "[REDACTED]", sanitized)
            
            return sanitized
        
        elif isinstance(output_data, dict):
            return {
                key: self.sanitize_output(value)
                for key, value in output_data.items()
            }
        
        elif isinstance(output_data, list):
            return [self.sanitize_output(item) for item in output_data]
        
        return output_data
    
    def check_content_policy(self, content: str) -> tuple[bool, Optional[str]]:
        """
        Check if content violates content policy.
        
        Args:
            content: Content to check
        
        Returns:
            (is_compliant, reason) tuple
        """
        # Placeholder for content moderation
        # In production, integrate with services like:
        # - OpenAI Moderation API
        # - Perspective API
        # - Custom classifiers
        
        # Simple keyword checking (expand as needed)
        unsafe_keywords = [
            "violence", "illegal", "harmful"
        ]
        
        content_lower = content.lower()
        for keyword in unsafe_keywords:
            if keyword in content_lower:
                logger.warning(
                    "content_policy_violation",
                    keyword=keyword
                )
                return False, f"Content policy violation: {keyword}"
        
        return True, None


# Global safety filter instance
safety_filter = SafetyFilter()