import { useNotifications } from '@/contexts/NotificationContext';

export const useToast = () => {
    const { addNotification } = useNotifications();

    return {
        success: (message: string, title?: string, duration?: number) => {
            addNotification({
                type: 'success',
                message,
                title,
                duration
            });
        },
        error: (message: string, title?: string, duration?: number) => {
            addNotification({
                type: 'error',
                message,
                title,
                duration
            });
        },
        warning: (message: string, title?: string, duration?: number) => {
            addNotification({
                type: 'warning',
                message,
                title,
                duration
            });
        },
        info: (message: string, title?: string, duration?: number) => {
            addNotification({
                type: 'info',
                message,
                title,
                duration
            });
        }
    };
};
