// Grocave Admin & Lead Management Persistence Store (LocalStorage based)

const USERS_STORAGE_KEY = 'grocave_admin_users_v1';
const SESSION_STORAGE_KEY = 'grocave_admin_session_v1';
const LEADS_STORAGE_KEY = 'grocave_leads_v1';

// Default initial superadmin credentials as specified by user
const INITIAL_SUPERADMIN = {
  id: 'usr_superadmin_01',
  name: 'Super Admin (Mitthu)',
  email: 'mitthuraj293@gmail.com',
  password: 'Super@123', // Admin can change this with old password verification
  role: 'superadmin',
  title: 'Principal Director & Superadmin',
  permissions: ['manage_leads', 'manage_team', 'view_analytics', 'settings'],
  createdAt: '2024-06-29T10:00:00Z',
  avatarBg: 'bg-purple-600'
};

// Initial realistic leads so the panel looks alive immediately
const INITIAL_LEADS = [
  {
    id: 'lead_101',
    name: 'Vikramaditya Sharma',
    email: 'vikram@apolloretail.in',
    phone: '+91 98350 12845',
    company: 'Apollo Retail Logistics',
    service: 'ERP, Inventory & GST Automation',
    budget: 'INR 5 Lakh – 15 Lakh',
    message: 'We are expanding to 14 warehouses across Eastern India and need a centralized multi-store inventory synchronization system with automated GST e-way billing.',
    status: 'new', // 'new' | 'contacted' | 'discussion' | 'converted' | 'closed'
    source: 'Website Contact Form',
    notes: [
      { text: 'Urgent requirement, requested a discovery call for Saturday.', date: new Date(Date.now() - 3600000 * 2).toISOString() }
    ],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'lead_102',
    name: 'Ananya Deshmukh',
    email: 'ananya@healthpulse.tech',
    phone: '+91 91234 56780',
    company: 'HealthPulse Diagnostics',
    service: 'Cloud SaaS Platform Engineering',
    budget: 'INR 1.5 Lakh – 5 Lakh',
    message: 'Looking to engineer a patient reporting portal with automated WhatsApp delivery of PDF test reports and secure cloud storage.',
    status: 'contacted',
    source: 'Architecture Estimator',
    notes: [
      { text: 'Sent initial architecture blueprint via email.', date: new Date(Date.now() - 3600000 * 24).toISOString() }
    ],
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
  },
  {
    id: 'lead_103',
    name: 'Rajesh Ranjan',
    email: 'rajesh.ranjan@biharlogistics.com',
    phone: '+91 79034 88219',
    company: 'Mithila Transport & Cold Chain',
    service: 'Custom Problem-Solving Software',
    budget: 'INR 50k – 1.5 Lakh',
    message: 'Need GPS vehicle dispatch and driver billing system integrated with WhatsApp alerts.',
    status: 'discussion',
    source: 'Website Contact Form',
    notes: [
      { text: 'Quote sent for phase 1 MVP.', date: new Date(Date.now() - 3600000 * 48).toISOString() }
    ],
    createdAt: new Date(Date.now() - 3600000 * 52).toISOString()
  }
];

// Initialize storage if not already present
export function initAdminStore() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([INITIAL_SUPERADMIN]));
  }

  if (!localStorage.getItem(LEADS_STORAGE_KEY)) {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
  }
}

// ----------------- AUTHENTICATION -----------------

export function adminLogin(email, password) {
  initAdminStore();
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const normalizedEmail = email.trim().toLowerCase();
  
  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return { success: false, error: 'No account found with this email address.' };
  }

  if (user.password !== password) {
    return { success: false, error: 'Incorrect password. Please verify and try again.' };
  }

  // Create session object (without exposing password in session state)
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    title: user.title,
    permissions: user.permissions || [],
    avatarBg: user.avatarBg || 'bg-purple-600',
    loginTime: new Date().toISOString()
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

export function getCurrentAdminUser() {
  initAdminStore();
  if (typeof window === 'undefined') return null;
  const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionRaw) return null;
  try {
    return JSON.parse(sessionRaw);
  } catch (e) {
    return null;
  }
}

export function adminLogout() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

// ----------------- PASSWORD MANAGEMENT -----------------

// Admin changes their own password by verifying old password
export function changeAdminPassword(oldPassword, newPassword) {
  initAdminStore();
  const currentSession = getCurrentAdminUser();
  if (!currentSession) {
    return { success: false, error: 'Session expired. Please log in again.' };
  }

  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const userIndex = users.findIndex(u => u.id === currentSession.id);

  if (userIndex === -1) {
    return { success: false, error: 'User record not found.' };
  }

  if (users[userIndex].password !== oldPassword) {
    return { success: false, error: 'Current password does not match.' };
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  users[userIndex].password = newPassword;
  users[userIndex].updatedAt = new Date().toISOString();
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return { success: true, message: 'Password updated successfully!' };
}

// Superadmin resets another user's password directly
export function resetUserPasswordBySuperAdmin(targetUserId, newPassword) {
  initAdminStore();
  const currentSession = getCurrentAdminUser();
  if (!currentSession || currentSession.role !== 'superadmin') {
    return { success: false, error: 'Unauthorized: Only Superadmin can reset staff passwords.' };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const userIndex = users.findIndex(u => u.id === targetUserId);

  if (userIndex === -1) {
    return { success: false, error: 'Target user not found.' };
  }

  users[userIndex].password = newPassword;
  users[userIndex].updatedAt = new Date().toISOString();
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return { success: true, message: `Password reset successfully for ${users[userIndex].email}` };
}

// ----------------- TEAM & ROLE MANAGEMENT -----------------

export function getTeamMembers() {
  initAdminStore();
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  // Return users with passwords sanitized for listing
  return users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    title: u.title || (u.role === 'superadmin' ? 'Super Admin' : 'Website Manager'),
    permissions: u.permissions || [],
    createdAt: u.createdAt,
    avatarBg: u.avatarBg || 'bg-blue-600',
    isPrimarySuperadmin: u.id === 'usr_superadmin_01'
  }));
}

export function addTeamMember({ name, email, password, role = 'manager', title = 'Operations Lead', permissions = ['manage_leads'] }) {
  initAdminStore();
  const currentSession = getCurrentAdminUser();
  if (!currentSession || currentSession.role !== 'superadmin') {
    return { success: false, error: 'Unauthorized: Only Superadmin can create new roles.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');

  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'A team member with this email already exists.' };
  }

  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const avatarColors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-pink-600', 'bg-amber-600', 'bg-cyan-600'];
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const newUser = {
    id: 'usr_' + Date.now().toString(36),
    name: name.trim(),
    email: normalizedEmail,
    password: password,
    role: role,
    title: title.trim(),
    permissions: permissions,
    createdAt: new Date().toISOString(),
    avatarBg: randomColor
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return { success: true, user: newUser };
}

export function deleteTeamMember(userId) {
  initAdminStore();
  const currentSession = getCurrentAdminUser();
  if (!currentSession || currentSession.role !== 'superadmin') {
    return { success: false, error: 'Unauthorized: Only Superadmin can delete team members.' };
  }

  if (userId === 'usr_superadmin_01') {
    return { success: false, error: 'Primary Superadmin account cannot be deleted.' };
  }

  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const filtered = users.filter(u => u.id !== userId);

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
  return { success: true, message: 'Team member removed successfully.' };
}

// ----------------- LEADS MANAGEMENT -----------------

export function getLeads() {
  initAdminStore();
  return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
}

export function addLead(leadData) {
  initAdminStore();
  const leads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');

  const newLead = {
    id: 'lead_' + Date.now().toString(36),
    name: leadData.name || 'Anonymous Inquiry',
    email: leadData.email || 'N/A',
    phone: leadData.phone || 'N/A',
    company: leadData.company || 'Individual Client',
    service: leadData.service || 'Custom Problem-Solving Software',
    budget: leadData.budget || 'Not specified',
    message: leadData.message || 'No additional details provided.',
    status: 'new', // 'new' | 'contacted' | 'discussion' | 'converted' | 'closed'
    source: leadData.source || 'Website Contact Form',
    notes: [],
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));

  // Trigger custom window event so open admin dashboards update reactively
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('grocave_lead_added', { detail: newLead }));
  }

  return newLead;
}

export function updateLeadStatus(leadId, newStatus) {
  initAdminStore();
  const leads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
  const leadIndex = leads.findIndex(l => l.id === leadId);

  if (leadIndex === -1) return false;

  leads[leadIndex].status = newStatus;
  leads[leadIndex].updatedAt = new Date().toISOString();
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('grocave_lead_updated', { detail: leads[leadIndex] }));
  }

  return true;
}

export function addLeadNote(leadId, noteText) {
  initAdminStore();
  if (!noteText || !noteText.trim()) return false;

  const leads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
  const leadIndex = leads.findIndex(l => l.id === leadId);

  if (leadIndex === -1) return false;

  if (!leads[leadIndex].notes) leads[leadIndex].notes = [];

  const currentUser = getCurrentAdminUser();
  const authorName = currentUser ? currentUser.name : 'Admin';

  leads[leadIndex].notes.unshift({
    text: noteText.trim(),
    author: authorName,
    date: new Date().toISOString()
  });

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  return true;
}

export function deleteLead(leadId) {
  initAdminStore();
  const leads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
  const filtered = leads.filter(l => l.id !== leadId);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('grocave_lead_deleted', { detail: leadId }));
  }

  return true;
}
