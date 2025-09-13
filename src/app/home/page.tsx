"use client";
import { Fragment, useEffect, useState } from 'react';
import { getAllRatings } from '@/services/ratings';
import Feed from '@/components/Feed';
import { getUserProfile, UserProfile } from '@/utils/cookies';
import { Rating } from '@/types/rating';

export default function Page() {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Get user data from cookies on client side
                const profile = getUserProfile();
                setUserData(profile);

                // Fetch ratings
                const ratingsData = await getAllRatings(0, 10);

                // Ensure we always set an array
                if (Array.isArray(ratingsData)) {
                    setRatings(ratingsData);
                } else {
                    console.warn('Home page - ratingsData is not an array, setting empty array');
                    setRatings([]);
                }
            } catch (error) {
                console.error('Failed to load data:', error);
                setRatings([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <Fragment>
            <Feed ratings={ratings} />
        </Fragment>
    );
}
