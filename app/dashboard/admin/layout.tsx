import { requireRole } from '@/lib/core/server';
import React from 'react';

const AdminDashboardlayout = async({children}:{ children: React.ReactNode}) => {
 await requireRole('admin')
        return children
};

export default AdminDashboardlayout;