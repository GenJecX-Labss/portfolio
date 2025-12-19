"""
Serialization Utilities

Helper functions for JSON serialization and data conversion.
"""

import json
from datetime import datetime, date
from decimal import Decimal
from typing import Any
from enum import Enum


class CustomJSONEncoder(json.JSONEncoder):
    """
    Custom JSON encoder that handles special types.
    """
    
    def default(self, obj: Any) -> Any:
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, date):
            return obj.isoformat()
        elif isinstance(obj, Decimal):
            return float(obj)
        elif isinstance(obj, Enum):
            return obj.value
        elif hasattr(obj, '__dict__'):
            return obj.__dict__
        
        return super().default(obj)


def to_json(data: Any, indent: int = None) -> str:
    """
    Convert data to JSON string.
    
    Args:
        data: Data to serialize
        indent: Indentation level (None for compact)
    
    Returns:
        JSON string
    """
    return json.dumps(data, cls=CustomJSONEncoder, indent=indent)


def from_json(json_str: str) -> Any:
    """
    Parse JSON string to Python object.
    
    Args:
        json_str: JSON string
    
    Returns:
        Parsed object
    """
    return json.loads(json_str)


def sanitize_dict(data: dict, exclude_keys: list = None) -> dict:
    """
    Remove specified keys from dictionary.
    
    Args:
        data: Dictionary to sanitize
        exclude_keys: Keys to remove
    
    Returns:
        Sanitized dictionary
    """
    if exclude_keys is None:
        exclude_keys = ['password', 'hashed_password', 'secret_key']
    
    return {
        k: v for k, v in data.items()
        if k not in exclude_keys
    }


def flatten_dict(data: dict, parent_key: str = '', sep: str = '.') -> dict:
    """
    Flatten nested dictionary.
    
    Args:
        data: Dictionary to flatten
        parent_key: Parent key prefix
        sep: Separator character
    
    Returns:
        Flattened dictionary
    """
    items = []
    
    for k, v in data.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    
    return dict(items)