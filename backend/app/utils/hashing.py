"""
Hashing Utilities

Helper functions for hashing and encoding.
"""

import hashlib
import hmac
from typing import Optional


def hash_string(text: str, algorithm: str = "sha256") -> str:
    """
    Hash string using specified algorithm.
    
    Args:
        text: String to hash
        algorithm: Hash algorithm (default: sha256)
    
    Returns:
        Hex digest of hash
    """
    hash_obj = hashlib.new(algorithm)
    hash_obj.update(text.encode('utf-8'))
    return hash_obj.hexdigest()


def hash_file_content(content: bytes, algorithm: str = "sha256") -> str:
    """
    Hash file content.
    
    Args:
        content: File content bytes
        algorithm: Hash algorithm
    
    Returns:
        Hex digest of hash
    """
    hash_obj = hashlib.new(algorithm)
    hash_obj.update(content)
    return hash_obj.hexdigest()


def generate_checksum(data: str) -> str:
    """
    Generate MD5 checksum (for non-security purposes).
    
    Args:
        data: Data to checksum
    
    Returns:
        MD5 hex digest
    """
    return hashlib.md5(data.encode('utf-8')).hexdigest()


def verify_hmac(
    message: str,
    signature: str,
    secret: str,
    algorithm: str = "sha256"
) -> bool:
    """
    Verify HMAC signature.
    
    Args:
        message: Original message
        signature: Signature to verify
        secret: Shared secret
        algorithm: HMAC algorithm
    
    Returns:
        True if signature is valid
    """
    expected = hmac.new(
        secret.encode('utf-8'),
        message.encode('utf-8'),
        algorithm
    ).hexdigest()
    
    return hmac.compare_digest(expected, signature)


def create_hmac(
    message: str,
    secret: str,
    algorithm: str = "sha256"
) -> str:
    """
    Create HMAC signature.
    
    Args:
        message: Message to sign
        secret: Shared secret
        algorithm: HMAC algorithm
    
    Returns:
        HMAC hex digest
    """
    return hmac.new(
        secret.encode('utf-8'),
        message.encode('utf-8'),
        algorithm
    ).hexdigest()