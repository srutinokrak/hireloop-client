import { requireRole } from '@/lib/core/server';
import React from 'react';

const SeekerDashboardlayout = async({children}:{ children: React.ReactNode}) => {
 await requireRole('seeker')
        return children
};

export default SeekerDashboardlayout;