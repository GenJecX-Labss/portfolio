"""
Slug Generation Utility

Convert text to URL-friendly slugs.
"""

import re
from typing import Optional


def slugify(text: str, max_length: int = 200) -> str:
    """
    Convert text to URL-friendly slug.
    
    Args:
        text: Input text to slugify
        max_length: Maximum slug length
    
    Returns:
        Slugified text
    
    Examples:
        >>> slugify("Hello World!")
        'hello-world'
        >>> slugify("My Project (2024)")
        'my-project-2024'
    """
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters, keep alphanumeric and spaces
    text = re.sub(r'[^\w\s-]', '', text)
    
    # Replace whitespace and multiple dashes with single dash
    text = re.sub(r'[-\s]+', '-', text)
    
    # Remove leading/trailing dashes
    text = text.strip('-')
    
    # Truncate to max length
    if len(text) > max_length:
        text = text[:max_length].rstrip('-')
    
    return text


def ensure_unique_slug(
    base_slug: str,
    existing_slugs: list,
    max_attempts: int = 100
) -> str:
    """
    Ensure slug is unique by appending numbers if needed.
    
    Args:
        base_slug: Base slug to make unique
        existing_slugs: List of existing slugs to check against
        max_attempts: Maximum number of attempts
    
    Returns:
        Unique slug
    
    Examples:
        >>> ensure_unique_slug("my-project", ["my-project"])
        'my-project-2'
        >>> ensure_unique_slug("my-project", ["my-project", "my-project-2"])
        'my-project-3'
    """
    if base_slug not in existing_slugs:
        return base_slug
    
    for i in range(2, max_attempts + 2):
        candidate = f"{base_slug}-{i}"
        if candidate not in existing_slugs:
            return candidate
    
    # Fallback: use timestamp
    import time
    return f"{base_slug}-{int(time.time())}"


def generate_slug_from_title(
    title: str,
    existing_slugs: Optional[list] = None
) -> str:
    """
    Generate slug from title, ensuring uniqueness if needed.
    
    Args:
        title: Title to convert to slug
        existing_slugs: Optional list of existing slugs to avoid
    
    Returns:
        Unique slug
    """
    base_slug = slugify(title)
    
    if existing_slugs:
        return ensure_unique_slug(base_slug, existing_slugs)
    
    return base_slug