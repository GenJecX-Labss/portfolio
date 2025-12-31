"""
Email Notification Service

Sends email notifications to admin for form submissions and reviews.
"""

import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from datetime import datetime

from app.core.config import settings

logger = logging.getLogger(__name__)

# Target email for all notifications
NOTIFICATION_EMAIL = "genjecx@gmail.com"


class EmailService:
    """
    Email notification service for admin alerts.
    
    Sends notifications to genjecx@gmail.com when:
    - New review is submitted
    - New contact form is submitted
    - New audit request is submitted
    """
    
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_password = settings.SMTP_PASSWORD
        self.notification_email = NOTIFICATION_EMAIL
        self.is_configured = all([
            self.smtp_host,
            self.smtp_user,
            self.smtp_password
        ])
    
    def _send_email(
        self,
        subject: str,
        body_html: str,
        body_text: str
    ) -> bool:
        """Send email using SMTP"""
        if not self.is_configured:
            logger.warning("Email service not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in .env")
            # Log the notification content for debugging
            logger.info(f"Email notification (not sent): {subject}")
            logger.info(f"Body: {body_text}")
            return False
        
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.smtp_user
            msg['To'] = self.notification_email
            
            # Attach both plain text and HTML versions
            part1 = MIMEText(body_text, 'plain')
            part2 = MIMEText(body_html, 'html')
            msg.attach(part1)
            msg.attach(part2)
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.sendmail(self.smtp_user, self.notification_email, msg.as_string())
            
            logger.info(f"Email sent: {subject}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    
    def notify_new_review(
        self,
        name: str,
        company: str,
        role: str,
        rating: int,
        content: str,
        project_type: Optional[str] = None
    ) -> bool:
        """Send notification for new review submission"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        subject = f"🌟 New Review Submitted - {name} ({rating}/5 stars)"
        
        body_text = f"""
New Review Submission

Name: {name}
Company: {company}
Role: {role}
Project Type: {project_type or 'N/A'}
Rating: {rating}/5 stars

Review:
{content}

Submitted at: {timestamp}
        """
        
        body_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
                <h2 style="color: #0F172A; margin-bottom: 20px;">🌟 New Review Submitted</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{company}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{role}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Project Type:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{project_type or 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Rating:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{'⭐' * rating} ({rating}/5)</td>
                    </tr>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 5px;">
                    <strong>Review:</strong>
                    <p style="margin-top: 10px; color: #475569;">{content}</p>
                </div>
                
                <p style="margin-top: 20px; color: #9CA3AF; font-size: 12px;">
                    Submitted at: {timestamp}
                </p>
            </div>
        </body>
        </html>
        """
        
        return self._send_email(subject, body_html, body_text)
    
    def notify_new_contact(
        self,
        name: str,
        email: str,
        company: Optional[str],
        subject_line: str,
        message: str
    ) -> bool:
        """Send notification for new contact form submission"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        subject = f"📬 New Contact Form - {name}"
        
        body_text = f"""
New Contact Form Submission

Name: {name}
Email: {email}
Company: {company or 'N/A'}
Subject: {subject_line}

Message:
{message}

Submitted at: {timestamp}

Reply to: {email}
        """
        
        body_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
                <h2 style="color: #0F172A; margin-bottom: 20px;">📬 New Contact Form Submission</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:{email}">{email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{company or 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{subject_line}</td>
                    </tr>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 5px;">
                    <strong>Message:</strong>
                    <p style="margin-top: 10px; color: #475569;">{message}</p>
                </div>
                
                <p style="margin-top: 20px; color: #9CA3AF; font-size: 12px;">
                    Submitted at: {timestamp}
                </p>
                
                <a href="mailto:{email}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #0F172A; color: white; text-decoration: none; border-radius: 5px;">
                    Reply to {name}
                </a>
            </div>
        </body>
        </html>
        """
        
        return self._send_email(subject, body_html, body_text)
    
    def notify_new_audit_request(
        self,
        name: str,
        email: str,
        company: str,
        website: Optional[str],
        project_description: str,
        budget_range: Optional[str] = None,
        timeline: Optional[str] = None
    ) -> bool:
        """Send notification for new audit request"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        subject = f"🔍 New Audit Request - {company}"
        
        body_text = f"""
New Audit Request

Name: {name}
Email: {email}
Company: {company}
Website: {website or 'N/A'}
Budget Range: {budget_range or 'N/A'}
Timeline: {timeline or 'N/A'}

Project Description:
{project_description}

Submitted at: {timestamp}

Reply to: {email}
        """
        
        body_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
                <h2 style="color: #0F172A; margin-bottom: 20px;">🔍 New Audit Request</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:{email}">{email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{company}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Website:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{website or 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Budget:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{budget_range or 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Timeline:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">{timeline or 'N/A'}</td>
                    </tr>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 5px;">
                    <strong>Project Description:</strong>
                    <p style="margin-top: 10px; color: #475569;">{project_description}</p>
                </div>
                
                <p style="margin-top: 20px; color: #9CA3AF; font-size: 12px;">
                    Submitted at: {timestamp}
                </p>
                
                <a href="mailto:{email}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #0F172A; color: white; text-decoration: none; border-radius: 5px;">
                    Reply to {name}
                </a>
            </div>
        </body>
        </html>
        """
        
        return self._send_email(subject, body_html, body_text)


# Singleton instance
email_service = EmailService()
