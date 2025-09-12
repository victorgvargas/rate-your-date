"use client";
import styled, { keyframes } from 'styled-components';
import { useNotifications, Notification, NotificationType } from '@/contexts/NotificationContext';

const slideIn = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
`;

const NotificationContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
`;

const NotificationCard = styled.div<{ type: NotificationType }>`
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-left: 4px solid ${props => {
        switch (props.type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'info': return '#3b82f6';
            default: return '#6b7280';
        }
    }};
    animation: ${slideIn} 0.3s ease-out;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-width: 300px;
`;

const NotificationContent = styled.div`
    flex: 1;
`;

const NotificationTitle = styled.h4`
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
    color: #111827;
`;

const NotificationMessage = styled.p`
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.4;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    color: #9ca3af;
    cursor: pointer;
    padding: 0;
    margin-left: 12px;
    line-height: 1;
    
    &:hover {
        color: #4b5563;
    }
`;

const NotificationIcon = styled.span<{ type: NotificationType }>`
    font-size: 16px;
    margin-right: 8px;
    
    &::before {
        content: ${props => {
        switch (props.type) {
            case 'success': return '"✓"';
            case 'error': return '"✕"';
            case 'warning': return '"⚠"';
            case 'info': return '"ℹ"';
            default: return '"•"';
        }
    }};
    }
`;

interface NotificationItemProps {
    notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
    const { removeNotification } = useNotifications();

    return (
        <NotificationCard type={notification.type}>
            <NotificationContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NotificationIcon type={notification.type} />
                    {notification.title && (
                        <NotificationTitle>{notification.title}</NotificationTitle>
                    )}
                </div>
                <NotificationMessage>{notification.message}</NotificationMessage>
            </NotificationContent>
            <CloseButton
                onClick={() => removeNotification(notification.id)}
                aria-label="Close notification"
            >
                ×
            </CloseButton>
        </NotificationCard>
    );
};

const NotificationDisplay = () => {
    const { notifications } = useNotifications();

    if (notifications.length === 0) return null;

    return (
        <NotificationContainer>
            {notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </NotificationContainer>
    );
};

export default NotificationDisplay;
