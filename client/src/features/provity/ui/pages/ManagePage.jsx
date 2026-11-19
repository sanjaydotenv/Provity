import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Grid2X2,
  List,
  MoreVertical,
  ExternalLink,
  Copy,
  Mail,
  Globe,
  Code2,
  Wrench,
  Tag,
  Download,
  Trash2,
  BarChart3,
  X,
  User,
  Layers,
  Sparkles,
  Check,
  ShieldCheck,
  Eye,
  Lock,
} from "lucide-react";
import ProvityLogo from "../components/ProvityLogo";
import BackBtn from "../components/BackBtn";
import { useManageHandleHook } from "../../hooks/ManageHandleHook";
import { useSelector } from "react-redux";

const categories = [
  { name: "All", icon: Grid2X2 },
  { name: "Projects", icon: Code2 },
  { name: "Social Media", icon: User },
  { name: "Emails", icon: Mail },
  { name: "Websites", icon: Globe },
  { name: "Developer Tools", icon: Wrench },
  { name: "Other", icon: Layers },
];

const handleUiConfig = {
  Projects: { icon: Code2, color: "#fc6c26", bg: "rgba(252,108,38,0.15)" },
  "Social Media": {
    icon: User,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.15)",
  },
  Emails: { icon: Mail, color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  Websites: { icon: Globe, color: "#b44aff", bg: "rgba(180,74,255,0.15)" },
  "Developer Tools": {
    icon: Wrench,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.13)",
  },
  Other: { icon: Layers, color: "#9ca3af", bg: "rgba(156,163,175,0.13)" },
};

const getPlatformLogo = (name) => {
  const platforms = {
    github: "github",
    linkedin: "linkedin",
    instagram: "instagram",
    facebook: "facebook",
    twitter: "x",
    x: "x",
    youtube: "youtube",
    google: "google",
    gmail: "gmail",
    discord: "discord",
    reddit: "reddit",
    whatsapp: "whatsapp",
    telegram: "telegram",
    portfolio: "vercel",
    vercel: "vercel",
    netlify: "netlify",
    stackoverflow: "stackoverflow",
    leetcode: "leetcode",
    npm: "npm",
    codepen: "codepen",
  };

  const key = Object.keys(platforms).find((platform) =>
    name?.toLowerCase().includes(platform),
  );

  return key ? `https://cdn.simpleicons.org/${platforms[key]}` : null;
};

const ManagePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("Recently Added");
  const [showModal, setShowModal] = useState(false);
  const [menuId, setMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [copiedField, setCopiedField] = useState("");

  const SECURITY_PIN = "******";
  const [showPinModal, setShowPinModal] = useState(false);
  const [securityPin, setSecurityPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [passwordItem, setPasswordItem] = useState(null);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const copyText = async (text, field) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);

      setTimeout(() => {
        setCopiedField("");
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const openPasswordVerification = (item) => {
    setPasswordItem(item);
    setSecurityPin("");
    setPinError("");
    setPasswordCopied(false);
    setShowPinModal(true);
  };

  const closePinModal = () => {
    setShowPinModal(false);
    setSecurityPin("");
    setPinError("");
    setPasswordItem(null);
    setPasswordCopied(false);
  };

  const verifyAndCopyPassword = async (e) => {
    e.preventDefault();

    if (securityPin !== SECURITY_PIN) {
      setPinError("Incorrect Security PIN. Please try again.");
      setSecurityPin("");
      return;
    }

    if (!passwordItem?.password) {
      setPinError("Password is not available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(passwordItem.password);
      setPasswordCopied(true);
      setPinError("");

      setTimeout(() => {
        closePinModal();
      }, 1200);
    } catch (error) {
      console.error("Password copy failed:", error);
      setPinError("Unable to copy password. Please check clipboard permissions.");
    }
  };

  const { form, setForm, handleSubmit, getAllHandles } = useManageHandleHook();

  const { allHandles } = useSelector((state) => state.handles);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) getAllHandles(accessToken);
  }, [accessToken]);

  // Add UI-only icon and color properties to MongoDB records.
  const handles = useMemo(() => {
    return (Array.isArray(allHandles) ? allHandles : []).map((handle) => {
      const ui = handleUiConfig[handle.category] || handleUiConfig.Other;

      return {
        ...handle,
        id: handle._id || handle.id,
        icon: ui.icon,
        color: ui.color,
        bg: ui.bg,
        favorite: Boolean(handle.favorite),
      };
    });
  }, [allHandles]);

  const filteredHandles = useMemo(() => {
    let result = [...handles];

    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((item) =>
        [item.name, item.category, item.description, item.username, item.url]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }

    if (sort === "Alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Favorites") {
      result.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    } else {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    return result;
  }, [handles, activeCategory, search, sort]);

  const stats = [
    {
      title: "Total Handles",
      value: handles.length,
      icon: Grid2X2,
      color: "#fc6c26",
      growth: "Your digital assets",
    },
    {
      title: "Projects",
      value: handles.filter((h) => h.category === "Projects").length,
      icon: Code2,
      color: "#fc6c26",
      growth: "Development projects",
    },
    {
      title: "Socials",
      value: handles.filter((h) => h.category === "Social Media").length,
      icon: User,
      color: "#a855f7",
      growth: "Social profiles",
    },
    {
      title: "Emails",
      value: handles.filter((h) => h.category === "Emails").length,
      icon: Mail,
      color: "#22c55e",
      growth: "Email addresses",
    },
  ];

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({
      name: "",
      category: "Projects",
      password: "",
      description: "",
      username: "",
      url: "",
    });
  };

  const handleFormSubmit = async (e) => {
    try {
      const response = await handleSubmit(e);

      if (response?.data?.success) {
        await getAllHandles(accessToken);
        closeModal();
      }
    } catch (error) {
      console.error(
        "Create handle failed:",
        error.response?.data || error.message,
      );
    }
  };

  // Copy handle URL
  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.url || "");
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      console.error("Unable to copy link");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--main-bg)] text-[var(--text-color)]">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-[var(--primary-color)] opacity-[0.06] blur-[150px] rounded-full" />
        <div className="absolute top-[500px] right-0 w-80 h-80 bg-[var(--primary-color2)] opacity-[0.04] blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <div className="ml-8 flex justify-between items-center p-3">
          <ProvityLogo />
          <BackBtn />
        </div>

        <div className="line h-[1px] w-full bg-white/50"></div>

        <main className="max-w-[1600px] mx-auto px-5 md:px-9 py-8">
          {/* Hero Section */}
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Manage All Your{" "}
                <span className="text-[var(--primary-color)]">Handles</span>
              </h2>

              <p className="text-white/55 mt-3 text-sm md:text-base max-w-xl leading-relaxed">
                Keep all your projects, social media, emails and important links
                in one place. Stay organized, stay productive!
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[var(--primary-color)] hover:bg-[var(--primary-color2)] text-black font-semibold shadow-[0_8px_30px_rgba(252,108,38,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <Plus size={21} />
              Add New Handle
            </button>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--main-bg-2)]/50 p-5 hover:border-[var(--primary-color)]/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        color: stat.color,
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="text-right">
                      <p className="text-white/50 text-xs md:text-sm">
                        {stat.title}
                      </p>
                      <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 mt-4">{stat.growth}</p>

                  <div
                    className="absolute -bottom-8 -right-8 w-24 h-24 blur-3xl opacity-10 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              );
            })}
          </section>

          {/* Category Navigation */}
          <section className="mb-5 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((category) => {
                const Icon = category.icon;
                const active = activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      active
                        ? "bg-[var(--primary-color)] text-black shadow-[0_5px_20px_rgba(252,108,38,0.2)]"
                        : "bg-[var(--main-bg-2)]/60 border border-[var(--border-color)] text-white/60 hover:text-white hover:border-[var(--primary-color)]/40"
                    }`}
                  >
                    <Icon size={17} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Search and Controls */}
          <section className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="flex items-center gap-3 flex-1 max-w-3xl px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--main-bg-2)]/50 focus-within:border-[var(--primary-color)]/60 transition">
              <Search size={19} className="text-white/40" />

              <input
                type="text"
                placeholder="Search any handle... (e.g. GitHub, portfolio)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm placeholder:text-white/35"
              />

              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={17} className="text-white/40" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-[var(--main-bg-2)]/60 border border-[var(--border-color)] rounded-xl px-3 py-3">
                <span className="text-xs text-white/50 whitespace-nowrap">
                  Sort:
                </span>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-sm outline-none cursor-pointer"
                >
                  <option className="bg-[#222]" value="Recently Added">
                    Recently Added
                  </option>
                  <option className="bg-[#222]" value="Alphabetical">
                    Alphabetical
                  </option>
                  <option className="bg-[#222]" value="Favorites">
                    Favorites
                  </option>
                </select>
              </div>

              <div className="flex items-center bg-[var(--main-bg-2)]/60 border border-[var(--border-color)] rounded-xl p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2.5 rounded-lg transition ${
                    view === "grid"
                      ? "bg-[var(--primary-color)] text-black"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <Grid2X2 size={19} />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`p-2.5 rounded-lg transition ${
                    view === "list"
                      ? "bg-[var(--primary-color)] text-black"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <List size={19} />
                </button>
              </div>
            </div>
          </section>

          {/* Handle Cards */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-semibold">Your Handles</h3>
                <p className="text-xs text-white/40 mt-1">
                  {filteredHandles.length} handles found
                </p>
              </div>
            </div>

            {filteredHandles.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                    : "flex flex-col gap-3"
                }
              >
                {filteredHandles.map((item) => {
                  const Icon = item.icon;
                  const logo = getPlatformLogo(item.name);

                  const hasPasswordButton =
                    item.category === "Emails" ||
                    item.category === "Social Media";

                  return (
                    <article
                      key={item.id}
                      className={`group relative rounded-2xl border border-[var(--border-color)] bg-[var(--main-bg-2)]/60 hover:border-[var(--primary-color)]/40 transition-all duration-300 ${
                        view === "grid"
                          ? "p-5"
                          : "p-4 flex flex-col sm:flex-row sm:items-center gap-5"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Automatic Platform Logo */}
                          <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                            {logo ? (
                              <img
                                src={logo}
                                alt={item.name}
                                className="w-6 h-6 object-contain"
                              />
                            ) : (
                              <Icon size={23} style={{ color: item.color }} />
                            )}
                          </div>

                          {view === "list" && (
                            <div className="sm:hidden">
                              <h4 className="text-sm font-semibold">
                                {item.name}
                              </h4>
                              <p className="text-xs text-white/40">
                                {item.category}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Menu */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setMenuId(menuId === item.id ? null : item.id)
                            }
                            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition"
                          >
                            <MoreVertical size={19} />
                          </button>

                          {menuId === item.id && (
                            <div className="absolute right-0 top-10 z-30 w-40 rounded-xl border border-[var(--border-color)] bg-[#201e1e] p-1.5 shadow-xl">
                              <button
                                onClick={() => {
                                  setEditingId(item.id);
                                  setForm({
                                    name: item.name || "",
                                    category: item.category || "Projects",
                                    password: item.password || "",
                                    description: item.description || "",
                                    username: item.username || "",
                                    url: item.url || "",
                                  });
                                  setShowModal(true);
                                  setMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-lg"
                              >
                                Edit Handle
                              </button>

                              <button
                                onClick={() => {
                                  console.log("Delete Handle", item.id);
                                  setMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg"
                              >
                                Delete Handle
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={view === "list" ? "flex-1 min-w-0" : "mt-5"}
                      >
                        {view === "grid" && (
                          <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/[0.05] text-white/50 mb-3">
                            {item.category}
                          </span>
                        )}

                        <h4 className="text-base font-semibold text-white truncate">
                          {item.name}
                        </h4>

                        <p className="text-xs text-white/40 mt-1.5 leading-relaxed line-clamp-2 min-h-[34px]">
                          {item.description || "No description added."}
                        </p>

                        {/* Username / Email with Copy */}
                        <div className="flex items-center justify-between gap-2 mt-4 px-3 py-2.5 rounded-lg bg-black/20 border border-white/[0.05]">
                          <div className="flex items-center gap-2 min-w-0">
                            <User
                              size={14}
                              className="text-white/35 shrink-0"
                            />

                            <span className="text-xs text-white/65 truncate">
                              {item.username || "No username added"}
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              copyText(item.username, `${item.id}-username`)
                            }
                            disabled={!item.username}
                            title="Copy username"
                            className="shrink-0 text-white/40 hover:text-[var(--primary-color)] transition disabled:opacity-30"
                          >
                            {copiedField === `${item.id}-username` ? (
                              <Check size={15} className="text-green-400" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>

                        {/* Password Copy */}
                        {hasPasswordButton && (
                          <button
                            type="button"
                            onClick={() => openPasswordVerification(item)}
                            disabled={!item.password}
                            className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-lg border border-[var(--primary-color)]/20 bg-[var(--primary-color)]/[0.06] text-[var(--primary-color)] text-xs font-medium hover:bg-[var(--primary-color)] hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <ShieldCheck size={14} />
                            Copy Password
                            <Eye size={13} />
                          </button>
                        )}
                      </div>

                      {/* Footer */}
                      <div
                        className={`flex items-center gap-2 ${
                          view === "grid"
                            ? "mt-5 pt-4 border-t border-white/[0.06]"
                            : "sm:w-52 sm:shrink-0"
                        }`}
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--primary-color)] text-black text-xs font-semibold hover:opacity-90 transition"
                        >
                          Open Link
                          <ExternalLink size={14} />
                        </a>

                        <button
                          onClick={() => handleCopy(item)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition text-xs"
                        >
                          {copiedId === item.id ? (
                            <Check size={14} className="text-green-400" />
                          ) : (
                            <Copy size={14} />
                          )}

                          {copiedId === item.id ? "Copied" : "Copy URL"}
                        </button>
                      </div>
                    </article>
                  );
                })}

                {/* Add New Card */}
                {view === "grid" && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="min-h-[260px] rounded-2xl border border-dashed border-white/10 hover:border-[var(--primary-color)]/50 bg-white/[0.01] hover:bg-[var(--primary-color)]/[0.03] flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl border border-white/10 group-hover:border-[var(--primary-color)]/50 flex items-center justify-center text-white/40 group-hover:text-[var(--primary-color)] transition-all">
                      <Plus size={24} />
                    </div>

                    <div className="text-center">
                      <h4 className="text-sm font-semibold text-white/70 group-hover:text-white">
                        Add New Handle
                      </h4>

                      <p className="text-xs text-white/35 mt-1">
                        Add another digital asset
                      </p>
                    </div>
                  </button>
                )}
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-[var(--border-color)] rounded-2xl">
                <Search size={35} className="text-white/20 mb-4" />

                <h3 className="text-lg font-semibold">No handles found</h3>

                <p className="text-sm text-white/40 mt-2">
                  Try changing your search or category.
                </p>
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--main-bg-2)]/50 p-5">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={19} className="text-[var(--primary-color)]" />
              <h3 className="font-semibold">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Download,
                  title: "Export Handles",
                  desc: "Download your handles",
                },
                {
                  icon: BarChart3,
                  title: "Statistics",
                  desc: "View your overview",
                },
                { icon: Tag, title: "Manage Tags", desc: "Organize better" },
                {
                  icon: Trash2,
                  title: "Recently Deleted",
                  desc: "Restore if needed",
                },
              ].map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    className="flex items-center gap-3 text-left p-3 rounded-xl hover:bg-white/5 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)] flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">{action.title}</h4>
                      <p className="text-[11px] text-white/40 mt-1">
                        {action.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* Security PIN Modal */}
      {showPinModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          onClick={closePinModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#191919] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[var(--primary-color)]/10 blur-[80px] pointer-events-none" />

            <button
              type="button"
              onClick={closePinModal}
              aria-label="Close security verification"
              className="absolute right-4 top-4 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition"
            >
              <X size={18} />
            </button>

            <div className="relative flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20">
                <ShieldCheck size={32} className="text-[var(--primary-color)]" />
              </div>
            </div>

            <div className="text-center relative">
              <h2 className="text-xl font-bold text-white">
                Security Verification
              </h2>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">
                Enter your Security PIN to access and copy your saved password.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)]">
                <Lock size={19} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {passwordItem?.name}
                </p>
                <p className="text-xs text-white/40">
                  Password access requested
                </p>
              </div>
            </div>

            <form onSubmit={verifyAndCopyPassword} className="mt-6">
              <label
                htmlFor="security-pin"
                className="text-xs font-medium text-white/60 block mb-3"
              >
                Enter Security PIN
              </label>

              <input
                id="security-pin"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                maxLength={6}
                autoFocus
                value={securityPin}
                onChange={(e) => {
                  setSecurityPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setPinError("");
                }}
                placeholder="••••••"
                className="w-full text-center tracking-[14px] text-xl font-semibold py-4 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-[var(--primary-color)] transition placeholder:text-white/20"
              />

              {pinError && (
                <p className="text-xs text-red-400 mt-3 text-center">
                  {pinError}
                </p>
              )}

              {passwordCopied && (
                <p className="text-xs text-green-400 mt-3 text-center flex items-center justify-center gap-2">
                  <Check size={14} />
                  Password copied successfully!
                </p>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closePinModal}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={securityPin.length !== 6 || passwordCopied}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--primary-color)] text-black text-sm font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShieldCheck size={16} />
                  Verify PIN
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-white/30">
              <Lock size={12} />
              Protected Password Access
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-[var(--border-color)] bg-[#1a1818] shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {editingId ? "Edit Handle" : "Add New Handle"}
                </h2>

                <p className="text-xs text-white/40 mt-1">
                  Organize your digital identity.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-white/5 text-white/50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {[
                {
                  name: "name",
                  label: "Handle Name",
                  placeholder: "e.g. GitHub",
                },
                {
                  name: "username",
                  label: "Username / Email",
                  placeholder: "e.g. @username",
                },
                {
                  name: "password",
                  label: "Password",
                  placeholder: "Handle Password",
                },
                {
                  name: "url",
                  label: "URL / Link",
                  placeholder: "https://example.com",
                },
                {
                  name: "description",
                  label: "Description",
                  placeholder: "What is this handle for?",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs text-white/60 block mb-2">
                    {field.label}
                  </label>

                  <input
                    required={field.name === "name" || field.name === "url"}
                    type={field.name === "password" ? "password" : "text"}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-[var(--border-color)] outline-none focus:border-[var(--primary-color)] text-sm transition"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs text-white/60 block mb-2">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#242020] border border-[var(--border-color)] outline-none focus:border-[var(--primary-color)] text-sm"
                >
                  {categories
                    .filter((c) => c.name !== "All")
                    .map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border border-[var(--border-color)] text-sm hover:bg-white/5 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[var(--primary-color)] text-black font-semibold text-sm hover:bg-[var(--primary-color2)] transition"
                >
                  {editingId ? "Save Changes" : "Create Handle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePage;
