import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GrocaveLogo from '../components/GrocaveLogo';
import { 
  getCurrentAdminUser, 
  adminLogout, 
  changeAdminPassword, 
  resetUserPasswordBySuperAdmin,
  getTeamMembers, 
  addTeamMember, 
  deleteTeamMember,
  getLeads, 
  addLead,
  updateLeadStatus, 
  addLeadNote, 
  deleteLead 
} from '../data/adminStore';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  ShieldAlert, 
  KeyRound, 
  Lock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Building, 
  Briefcase, 
  IndianRupee, 
  Download, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  X, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('leads'); // 'dashboard' | 'leads' | 'team' | 'settings'

  // Data states
  const [leads, setLeads] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  // Leads Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [selectedLeadForNote, setSelectedLeadForNote] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Custom Problem-Solving Software',
    budget: 'INR 1.5 Lakh – 5 Lakh',
    message: ''
  });

  // Team Modals
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [newTeamForm, setNewTeamForm] = useState({
    name: '',
    email: '',
    password: '',
    roleName: 'Lead Operations Manager',
    title: 'Lead Operations Executive',
    permissions: ['manage_leads', 'create_leads', 'export_leads']
  });

  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [resetNewPassword, setResetNewPassword] = useState('');

  // Password Change State
  const [pwdForm, setPwdForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pwdStatus, setPwdStatus] = useState({ type: '', message: '' });
  const [showPwd, setShowPwd] = useState(false);

  // Load and protect session
  useEffect(() => {
    const user = getCurrentAdminUser();
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    setCurrentUser(user);
    loadData();

    // Listen to reactive lead additions
    const handleLeadAdded = () => loadData();
    window.addEventListener('grocave_lead_added', handleLeadAdded);
    window.addEventListener('grocave_lead_updated', handleLeadAdded);
    window.addEventListener('grocave_lead_deleted', handleLeadAdded);

    return () => {
      window.removeEventListener('grocave_lead_added', handleLeadAdded);
      window.removeEventListener('grocave_lead_updated', handleLeadAdded);
      window.removeEventListener('grocave_lead_deleted', handleLeadAdded);
    };
  }, [navigate]);

  const loadData = () => {
    setLeads(getLeads());
    setTeamMembers(getTeamMembers());
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/login', { replace: true });
  };

  // ----------------- LEADS ACTIONS -----------------

  const handleStatusChange = (leadId, newStatus) => {
    updateLeadStatus(leadId, newStatus);
    loadData();
  };

  const handleDeleteLead = (leadId, leadName) => {
    if (window.confirm(`Are you sure you want to delete lead "${leadName}"?`)) {
      deleteLead(leadId);
      loadData();
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLeadForNote) return;
    addLeadNote(selectedLeadForNote.id, newNoteText);
    setNewNoteText('');
    loadData();
    // Update local selected lead to reflect note immediately
    const updated = getLeads().find(l => l.id === selectedLeadForNote.id);
    setSelectedLeadForNote(updated);
  };

  const handleCreateManualLead = (e) => {
    e.preventDefault();
    addLead({
      ...newLeadForm,
      source: 'Admin Direct Entry'
    });
    setShowAddLeadModal(false);
    setNewLeadForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Custom Problem-Solving Software',
      budget: 'INR 1.5 Lakh – 5 Lakh',
      message: ''
    });
    loadData();
  };

  const exportLeadsToCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Company', 'Service', 'Budget', 'Status', 'Source'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${l.service}"`,
      `"${l.budget}"`,
      l.status,
      l.source
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `grocave_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----------------- TEAM & RBAC ACTIONS -----------------

  const handleCreateTeamMember = (e) => {
    e.preventDefault();
    const res = addTeamMember({
      name: newTeamForm.name,
      email: newTeamForm.email,
      password: newTeamForm.password,
      role: 'custom',
      roleName: newTeamForm.roleName || 'Custom Role',
      title: newTeamForm.title || 'Operations Specialist',
      permissions: newTeamForm.permissions
    });
    if (res.success) {
      setShowAddTeamModal(false);
      setNewTeamForm({
        name: '',
        email: '',
        password: '',
        roleName: 'Lead Operations Manager',
        title: 'Lead Operations Executive',
        permissions: ['manage_leads', 'create_leads', 'export_leads']
      });
      loadData();
      alert(`Team member ${res.user.name} created successfully with role "${res.user.roleName}"!`);
    } else {
      alert(res.error || 'Failed to add team member');
    }
  };

  const handleDeleteTeamMember = (userId, name) => {
    if (window.confirm(`Are you sure you want to remove team access for ${name}?`)) {
      const res = deleteTeamMember(userId);
      if (res.success) {
        loadData();
      } else {
        alert(res.error);
      }
    }
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!resetTargetUser || !resetNewPassword) return;
    const res = resetUserPasswordBySuperAdmin(resetTargetUser.id, resetNewPassword);
    if (res.success) {
      alert(res.message);
      setResetTargetUser(null);
      setResetNewPassword('');
    } else {
      alert(res.error);
    }
  };

  // ----------------- PASSWORD CHANGE ACTION -----------------

  const handleChangeOwnPassword = (e) => {
    e.preventDefault();
    setPwdStatus({ type: '', message: '' });

    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    const res = changeAdminPassword(pwdForm.oldPassword, pwdForm.newPassword);
    if (res.success) {
      setPwdStatus({ type: 'success', message: 'Your password was changed successfully! Please keep it secure.' });
      setPwdForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setPwdStatus({ type: 'error', message: res.error || 'Failed to update password.' });
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.service && l.service.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const inDiscussionCount = leads.filter(l => l.status === 'discussion').length;
  const convertedCount = leads.filter(l => l.status === 'converted').length;

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F7F8FA] flex flex-col lg:flex-row font-sans selection:bg-[#6A00FF] selection:text-white pb-20 lg:pb-0">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col bg-[#111119] border-r border-white/10 p-5 flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {/* Logo and App Title */}
        <div className="mb-6 pb-5 border-b border-white/10">
          <Link to="/" className="inline-block focus:outline-none mb-2">
            <GrocaveLogo variant="horizontal" size="sm" showTagline={false} />
          </Link>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#6A00FF]/15 border border-[#6A00FF]/30 text-[#b992ff] text-[10px] font-mono uppercase font-bold tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Command Center</span>
          </div>
        </div>

        {/* Current User Pill */}
        <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${currentUser.avatarBg || 'bg-[#6A00FF]'} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            {currentUser.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] text-[#a855f7] font-semibold truncate uppercase">{currentUser.role === 'superadmin' ? 'Super Admin' : currentUser.title}</div>
            <div className="text-[10px] text-gray-400 truncate">{currentUser.email}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 space-y-1.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#6A00FF] text-white shadow-lg shadow-[#6A00FF]/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Metrics</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'leads'
                ? 'bg-[#6A00FF] text-white shadow-lg shadow-[#6A00FF]/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Leads Management</span>
            </div>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">
                {newLeadsCount} New
              </span>
            )}
          </button>

          {currentUser.role === 'superadmin' && (
            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'team'
                  ? 'bg-[#6A00FF] text-white shadow-lg shadow-[#6A00FF]/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4" />
                <span>Team & Roles (RBAC)</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-gray-300">
                {teamMembers.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-[#6A00FF] text-white shadow-lg shadow-[#6A00FF]/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <KeyRound className="w-4 h-4" />
              <span>Security & Password</span>
            </div>
          </button>
        </nav>

        {/* Sidebar Footer Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#6A00FF]" />
              <span>Live Website</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">grocave.online</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE TOP APP BAR ================= */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#0B0B0F]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GrocaveLogo variant="icon" size="sm" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Grocave Admin</span>
              {newLeadsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </div>
            <div className="text-[10px] text-[#a855f7] font-semibold">{currentUser.name} ({currentUser.role})</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            title="View Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        
        {/* ================= VIEW: DASHBOARD OVERVIEW ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Greeting Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome, {currentUser.name}</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Real-time pipeline monitoring and incoming software client inquiries.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#6A00FF] hover:bg-[#5800d4] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#6A00FF]/30 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Lead</span>
                </button>
                <button
                  onClick={exportLeadsToCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#a855f7]" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#141420] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-semibold uppercase">Total Leads</span>
                  <div className="w-8 h-8 rounded-lg bg-[#6A00FF]/20 text-[#b992ff] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{leads.length}</div>
                <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>Real-time capture</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#141420] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-rose-300 font-semibold uppercase">New Inquiries</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{newLeadsCount}</div>
                <div className="text-[11px] text-rose-400 mt-1">Requires immediate follow-up</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#141420] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-blue-300 font-semibold uppercase">In Discussion</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{inDiscussionCount}</div>
                <div className="text-[11px] text-blue-300 mt-1">Proposals & SOW active</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#141420] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-emerald-300 font-semibold uppercase">Converted Clients</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{convertedCount}</div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  {leads.length > 0 ? `${Math.round((convertedCount / leads.length) * 100)}% conversion rate` : '100% SLA'}
                </div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="rounded-2xl bg-[#141420] border border-white/10 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#a855f7]" />
                  <span>Latest Incoming Inquiries</span>
                </h2>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs text-[#b992ff] hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>View All Leads</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {leads.slice(0, 4).map(lead => (
                  <div key={lead.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lead.name}</span>
                        {lead.company && <span className="text-xs text-gray-400">• {lead.company}</span>}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          lead.status === 'new' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          lead.status === 'converted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          lead.status === 'discussion' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Service: <strong className="text-gray-300">{lead.service}</strong> • Budget: <strong className="text-[#b992ff]">{lead.budget}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                        title="Call"
                      >
                        <Phone className="w-3.5 h-3.5 text-purple-400" />
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20contacting%20Grocave%20regarding%20${encodeURIComponent(lead.service)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          setSelectedLeadForNote(lead);
                          setActiveTab('leads');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW: LEADS MANAGEMENT ================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Leads Command Center</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#6A00FF]/20 border border-[#6A00FF]/40 text-[#b992ff]">
                    {filteredLeads.length} Total
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Connect instantly via phone or WhatsApp with clients who submitted contact requests.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#6A00FF] hover:bg-[#5800d4] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#6A00FF]/30 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lead</span>
                </button>
                <button
                  onClick={exportLeadsToCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#a855f7]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads by name, email, phone, company, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#141420] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#141420] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                >
                  <option value="all">Filter: All Statuses ({leads.length})</option>
                  <option value="new">Status: New Inquiries ({newLeadsCount})</option>
                  <option value="contacted">Status: Contacted</option>
                  <option value="discussion">Status: In Discussion ({inDiscussionCount})</option>
                  <option value="converted">Status: Converted ({convertedCount})</option>
                  <option value="closed">Status: Closed / Lost</option>
                </select>
              </div>
            </div>

            {/* Leads Cards Grid (Phone-First, Zero Overflow) */}
            <div className="space-y-4">
              {filteredLeads.length > 0 ? (
                filteredLeads.map(lead => {
                  const whatsappNumber = lead.phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20Grocave%20regarding%20${encodeURIComponent(lead.service)}.%20We%20reviewed%20your%20project%20details%20and%20would%20love%20to%20discuss%20further.`;
                  
                  return (
                    <div 
                      key={lead.id}
                      className="rounded-2xl bg-[#141420] border border-white/10 p-5 sm:p-6 transition-all hover:border-[#6A00FF]/40 shadow-lg"
                    >
                      {/* Top Row: Name, Company, Status, and Date */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-white">{lead.name}</h3>
                            {lead.company && (
                              <span className="text-xs text-gray-400 font-medium">({lead.company})</span>
                            )}
                            <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                              {lead.source}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            Received {new Date(lead.createdAt).toLocaleString()}
                          </div>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-medium hidden sm:inline">Status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none transition-colors ${
                              lead.status === 'new' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                              lead.status === 'contacted' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                              lead.status === 'discussion' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                              lead.status === 'converted' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                              'bg-gray-500/20 text-gray-400 border-gray-500/40'
                            }`}
                          >
                            <option value="new" className="bg-[#161622] text-rose-300">● New Inquiry</option>
                            <option value="contacted" className="bg-[#161622] text-amber-300">● Contacted</option>
                            <option value="discussion" className="bg-[#161622] text-blue-300">● In Discussion</option>
                            <option value="converted" className="bg-[#161622] text-emerald-300">● Converted Client</option>
                            <option value="closed" className="bg-[#161622] text-gray-400">● Closed / Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle Details: Requirements & Inbound Message */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4 text-xs">
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="text-gray-400 block mb-0.5 font-semibold">Service Needed:</span>
                          <span className="text-white font-bold">{lead.service}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="text-gray-400 block mb-0.5 font-semibold">Budget Range:</span>
                          <span className="text-[#a855f7] font-bold font-mono">{lead.budget}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="text-gray-400 block mb-0.5 font-semibold">Contact Coordinates:</span>
                          <div className="text-gray-200 truncate">{lead.phone}</div>
                          <div className="text-gray-400 truncate">{lead.email}</div>
                        </div>
                      </div>

                      {lead.message && (
                        <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 text-xs text-gray-300 mb-4 whitespace-pre-wrap leading-relaxed">
                          <span className="text-gray-400 font-semibold block mb-1">Message from Client:</span>
                          {lead.message}
                        </div>
                      )}

                      {/* Notes Preview (if any) */}
                      {lead.notes && lead.notes.length > 0 && (
                        <div className="mb-4 p-3 rounded-xl bg-[#6A00FF]/10 border border-[#6A00FF]/20 text-xs">
                          <div className="flex items-center justify-between text-[#b992ff] font-bold mb-1">
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5" />
                              <span>Internal Team Notes ({lead.notes.length})</span>
                            </span>
                            <span className="text-[10px] text-gray-400">Latest: {new Date(lead.notes[0].date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-300 italic">"{lead.notes[0].text}"</p>
                        </div>
                      )}

                      {/* Bottom Action Buttons: Phone, WhatsApp, Email, Notes, Delete */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                        {/* 1-Tap Connect Actions */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#a855f7]" />
                            <span>Call {lead.phone}</span>
                          </a>

                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold text-xs transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Connect</span>
                          </a>

                          <a
                            href={`mailto:${lead.email}?subject=${encodeURIComponent('Grocave Software Consultation: ' + lead.service)}&body=${encodeURIComponent('Hello ' + lead.name + ',\n\nThank you for reaching out to Grocave regarding ' + lead.service + '.\n\nBest regards,\nGrocave Software Team')}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs border border-white/10 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-blue-400" />
                            <span className="hidden sm:inline">Email</span>
                          </a>
                        </div>

                        {/* Notes and Delete */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedLeadForNote(lead)}
                            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#b992ff]" />
                            <span>Notes {lead.notes ? `(${lead.notes.length})` : ''}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteLead(lead.id, lead.name)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border border-rose-500/20"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 bg-[#141420] border border-white/10 rounded-2xl p-8">
                  <Users className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">No Leads Found</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'No leads matching your current search filters. Try clearing the filter.' 
                      : 'When visitors fill out the website contact form, their inquiries will automatically appear here.'}
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                    className="px-4 py-2 rounded-xl bg-[#6A00FF] text-white text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= VIEW: TEAM & ROLES (SUPERADMIN RBAC) ================= */}
        {activeTab === 'team' && currentUser.role === 'superadmin' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Team & Role Access Control</h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold uppercase">
                    Superadmin Only
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Add staff accounts, grant custom access permissions, and reset team member passwords.
                </p>
              </div>

              <button
                onClick={() => setShowAddTeamModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#6A00FF] hover:bg-[#5800d4] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#6A00FF]/30 transition-all w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            {/* Team Members List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map(member => (
                <div 
                  key={member.id}
                  className="rounded-2xl bg-[#141420] border border-white/10 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl ${member.avatarBg} flex items-center justify-center text-white font-bold text-base shadow-md`}>
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                            <span>{member.name}</span>
                            {member.role === 'superadmin' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase">
                                SUPERADMIN
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#6A00FF]/20 text-[#b992ff] border border-[#6A00FF]/30 font-bold uppercase">
                                {member.roleName || 'Custom Role'}
                              </span>
                            )}
                          </h3>
                          <div className="text-xs text-[#b992ff] font-medium">{member.title}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">{member.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Permissions list */}
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1.5">Custom Access Permissions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.permissions.map((perm, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">
                            {perm.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions for this user */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    {!member.isPrimarySuperadmin && member.role !== 'superadmin' && member.id !== currentUser.id ? (
                      <button
                        onClick={() => setResetTargetUser(member)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-[#a855f7]" />
                        <span>Reset User Password</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-500 italic flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Superadmin (Change via Security Tab)</span>
                      </span>
                    )}

                    {!member.isPrimarySuperadmin && member.role !== 'superadmin' && member.id !== currentUser.id && (
                      <button
                        onClick={() => handleDeleteTeamMember(member.id, member.name)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Remove Team Access"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW: SECURITY & PASSWORD SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl animate-fadeIn">
            <div className="pb-4 border-b border-white/10">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Security & Password Settings</h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Manage your credentials, change your password by providing your current password, and inspect active session security.
              </p>
            </div>

            {/* Change Password Card */}
            <div className="rounded-2xl bg-[#141420] border border-white/10 p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#a855f7]" />
                <span>Change Your Admin Password</span>
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Requires verification of your old password before setting a new security key.
              </p>

              {pwdStatus.message && (
                <div className={`mb-5 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  pwdStatus.type === 'success' 
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                    : 'bg-red-950/40 border-red-500/30 text-red-300'
                }`}>
                  {pwdStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{pwdStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleChangeOwnPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Current (Old) Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={pwdForm.oldPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, oldPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    New Secure Password * (Min 6 characters)
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      required
                      value={pwdForm.newPassword}
                      onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={pwdForm.confirmPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                    placeholder="Re-enter new password"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6A00FF] to-[#8B3DFF] hover:from-[#5C00E6] hover:to-[#7A2CE6] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    Update Admin Password
                  </button>
                </div>
              </form>
            </div>

            {/* Account Overview Card */}
            <div className="rounded-2xl bg-[#141420] border border-white/10 p-5 sm:p-7">
              <h2 className="text-base font-bold text-white mb-3">Logged In Profile</h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Account Name:</span>
                  <strong className="text-white">{currentUser.name}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Email Address:</span>
                  <strong className="text-white font-mono">{currentUser.email}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Administrative Role:</span>
                  <strong className="text-[#a855f7] uppercase font-mono">{currentUser.role}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Active Session Established:</span>
                  <span className="text-gray-300">{new Date(currentUser.loginTime).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= MOBILE BOTTOM APP NAVIGATION BAR ================= */}
      {/* App-like floating bar designed specifically for smartphones */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e16]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 pb-safe shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.8)]">
        <div className={`grid ${currentUser.role === 'superadmin' ? 'grid-cols-4' : 'grid-cols-3'} gap-1 max-w-md mx-auto`}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === 'dashboard' ? 'text-[#a855f7] bg-[#6A00FF]/15 font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-1" />
            <span className="text-[10px] tracking-tight">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === 'leads' ? 'text-[#a855f7] bg-[#6A00FF]/15 font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Users className="w-4 h-4 mb-1" />
              {newLeadsCount > 0 && (
                <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                  {newLeadsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">Leads</span>
          </button>

          {currentUser.role === 'superadmin' && (
            <button
              onClick={() => setActiveTab('team')}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
                activeTab === 'team' ? 'text-[#a855f7] bg-[#6A00FF]/15 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4 mb-1" />
              <span className="text-[10px] tracking-tight">Team</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === 'settings' ? 'text-[#a855f7] bg-[#6A00FF]/15 font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4 mb-1" />
            <span className="text-[10px] tracking-tight">Security</span>
          </button>
        </div>
      </div>

      {/* ================= MODAL: LEAD INTERNAL NOTES ================= */}
      {selectedLeadForNote && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-[#141420] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <div className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">Internal Follow-Up Notes</div>
                <h3 className="text-base font-bold text-white">{selectedLeadForNote.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLeadForNote(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="mb-4 space-y-2">
              <textarea
                required
                rows={2}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add team note (e.g. Called client, shared proposal, scheduled demo for 3 PM)..."
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A00FF]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#6A00FF] hover:bg-[#5800d4] text-white text-xs font-bold transition-all shadow-md"
              >
                Save Note
              </button>
            </form>

            {/* Notes timeline */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {selectedLeadForNote.notes && selectedLeadForNote.notes.length > 0 ? (
                selectedLeadForNote.notes.map((note, nIdx) => (
                  <div key={nIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                      <span className="font-bold text-[#b992ff]">{note.author || 'Team Member'}</span>
                      <span>{new Date(note.date).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">{note.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-gray-500">
                  No notes recorded yet for this client inquiry.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MANUAL ADD LEAD ================= */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-[#141420] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#a855f7]" />
                <span>Create New Client Lead</span>
              </h3>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    placeholder="Client Name"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Company / Business</label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    placeholder="Acme Enterprises"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Software Service</label>
                <select
                  value={newLeadForm.service}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12121b] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                >
                  <option value="Custom Problem-Solving Software">Custom Problem-Solving Software</option>
                  <option value="Cloud SaaS Platform Engineering">Cloud SaaS Platform Engineering</option>
                  <option value="ERP, Inventory & GST Automation">ERP, Inventory & GST Automation</option>
                  <option value="AI & Process Automation Pipeline">AI & Process Automation Pipeline</option>
                  <option value="Mobile & Web Application (PWA)">Mobile & Web Application (PWA)</option>
                  <option value="Legacy Modernization & Cloud Migration">Legacy Modernization & Cloud Migration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Budget</label>
                <select
                  value={newLeadForm.budget}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                  className="w-full px-3 py-2 bg-[#12121b] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                >
                  <option value="INR 50k – 1.5 Lakh">INR 50,000 – 1.5 Lakh</option>
                  <option value="INR 1.5 Lakh – 5 Lakh">INR 1.5 Lakh – 5 Lakh</option>
                  <option value="INR 5 Lakh – 15 Lakh">INR 5 Lakh – 15 Lakh</option>
                  <option value="Enterprise Custom">Enterprise Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Requirement Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  placeholder="Notes from initial call or meeting..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6A00FF] hover:bg-[#5800d4] text-white text-xs font-bold shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD TEAM MEMBER (SUPERADMIN) ================= */}
      {showAddTeamModal && currentUser.role === 'superadmin' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-[#141420] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#a855f7]" />
                <span>Add Team Member & Assign Role</span>
              </h3>
              <button
                onClick={() => setShowAddTeamModal(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTeamMember} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newTeamForm.name}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, name: e.target.value })}
                  placeholder="e.g. Alok Verma"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address * (For Login)</label>
                <input
                  type="email"
                  required
                  value={newTeamForm.email}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, email: e.target.value })}
                  placeholder="e.g. alok@grocave.online"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Initial Password * (Min 6 chars)</label>
                <input
                  type="password"
                  required
                  value={newTeamForm.password}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, password: e.target.value })}
                  placeholder="Temporary password"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6A00FF]"
                />
              </div>

              {/* Custom Role Definition */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-gray-300">
                    Custom Role Name *
                  </label>
                  <span className="text-[10px] text-[#a855f7] font-semibold">Customizable</span>
                </div>
                <input
                  type="text"
                  required
                  value={newTeamForm.roleName}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, roleName: e.target.value })}
                  placeholder="e.g. Lead Operations Manager, Sales Executive, Support Lead..."
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF] mb-2"
                />
                
                {/* Quick preset chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['Lead Operations Manager', 'Sales & Inquiries Head', 'Technical Support Specialist', 'Project Analyst'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNewTeamForm({ ...newTeamForm, roleName: preset, title: preset })}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Designation Title</label>
                <input
                  type="text"
                  value={newTeamForm.title}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, title: e.target.value })}
                  placeholder="e.g. Senior Lead Executive"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                />
              </div>

              {/* Granular Permissions Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Assign Custom Access Permissions</label>
                <div className="space-y-2.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <label className="flex items-start gap-2.5 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTeamForm.permissions.includes('manage_leads')}
                      onChange={(e) => {
                        const perms = e.target.checked 
                          ? [...newTeamForm.permissions, 'manage_leads']
                          : newTeamForm.permissions.filter(p => p !== 'manage_leads');
                        setNewTeamForm({ ...newTeamForm, permissions: perms });
                      }}
                      className="mt-0.5 rounded border-white/20 text-[#6A00FF] focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">Manage Leads</span>
                      <span className="text-[11px] text-gray-400">View inquiries, update lead status, write notes, and 1-tap call/WhatsApp clients.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTeamForm.permissions.includes('create_leads')}
                      onChange={(e) => {
                        const perms = e.target.checked 
                          ? [...newTeamForm.permissions, 'create_leads']
                          : newTeamForm.permissions.filter(p => p !== 'create_leads');
                        setNewTeamForm({ ...newTeamForm, permissions: perms });
                      }}
                      className="mt-0.5 rounded border-white/20 text-[#6A00FF] focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">Create & Add Leads</span>
                      <span className="text-[11px] text-gray-400">Enter manual client leads acquired through offline calls or meetings.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTeamForm.permissions.includes('export_leads')}
                      onChange={(e) => {
                        const perms = e.target.checked 
                          ? [...newTeamForm.permissions, 'export_leads']
                          : newTeamForm.permissions.filter(p => p !== 'export_leads');
                        setNewTeamForm({ ...newTeamForm, permissions: perms });
                      }}
                      className="mt-0.5 rounded border-white/20 text-[#6A00FF] focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">Export Leads (CSV)</span>
                      <span className="text-[11px] text-gray-400">Download formatted client contact and project data into spreadsheets.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTeamForm.permissions.includes('delete_leads')}
                      onChange={(e) => {
                        const perms = e.target.checked 
                          ? [...newTeamForm.permissions, 'delete_leads']
                          : newTeamForm.permissions.filter(p => p !== 'delete_leads');
                        setNewTeamForm({ ...newTeamForm, permissions: perms });
                      }}
                      className="mt-0.5 rounded border-white/20 text-[#6A00FF] focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">Delete Leads</span>
                      <span className="text-[11px] text-gray-400">Permission to permanently remove archived or spam inquiries.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTeamForm.permissions.includes('view_analytics')}
                      onChange={(e) => {
                        const perms = e.target.checked 
                          ? [...newTeamForm.permissions, 'view_analytics']
                          : newTeamForm.permissions.filter(p => p !== 'view_analytics');
                        setNewTeamForm({ ...newTeamForm, permissions: perms });
                      }}
                      className="mt-0.5 rounded border-white/20 text-[#6A00FF] focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">View Analytics & Pipeline Metrics</span>
                      <span className="text-[11px] text-gray-400">Inspect total inquiries, conversion rates, and performance overview.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newTeamForm.permissions.includes('settings')}
                      onChange={(e) => {
                        const perms = e.target.checked 
                          ? [...newTeamForm.permissions, 'settings']
                          : newTeamForm.permissions.filter(p => p !== 'settings');
                        setNewTeamForm({ ...newTeamForm, permissions: perms });
                      }}
                      className="mt-0.5 rounded border-white/20 text-[#6A00FF] focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">Security & Password Management</span>
                      <span className="text-[11px] text-gray-400">Access security tab and change own login password with old password.</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTeamModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6A00FF] hover:bg-[#5800d4] text-white text-xs font-bold shadow-md"
                >
                  Create Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: SUPERADMIN RESET USER PASSWORD ================= */}
      {resetTargetUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-[#141420] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Reset User Password</span>
                </h3>
                <div className="text-xs text-gray-400 mt-0.5">Target: {resetTargetUser.name} ({resetTargetUser.email})</div>
              </div>
              <button
                onClick={() => setResetTargetUser(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  New Password for {resetTargetUser.name} *
                </label>
                <input
                  type="text"
                  required
                  value={resetNewPassword}
                  onChange={(e) => setResetNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#6A00FF]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResetTargetUser(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-md"
                >
                  Set New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
