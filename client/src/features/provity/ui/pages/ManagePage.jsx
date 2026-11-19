import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Grid2X2,
  List,
  BriefcaseBusiness,
  Camera,
  MoreVertical,
  ExternalLink,
  Copy,
  Mail,
  Globe,
  Code2,
  FolderKanban,
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
} from "lucide-react";
import ProvityLogo from "../components/ProvityLogo";
import BackBtn from "../components/BackBtn";
import { useManageHandleHook } from "../../hooks/ManageHandleHook";

const initialHandles = [
  {
    id: 1,
    name: "GitHub",
    category: "Social Media",
    description: "My code repositories and open source work.",
    username: "@sanjaydotenv",
    url: "https://github.com/sanjaydotenv",
    icon: Code2,
    color: "#ffffff",
    bg: "rgba(255,255,255,0.12)",
    favorite: true,
  },
  {
    id: 2,
    name: "LinkedIn",
    category: "Social Media",
    description: "Professional network and career updates.",
    username: "@sanjay-vaishnav-bairagi",
    url: "https://linkedin.com",
    icon: BriefcaseBusiness,
    color: "#0A9BEF",
    bg: "rgba(10,155,239,0.15)",
    favorite: true,
  },
  {
    id: 3,
    name: "Portfolio",
    category: "Websites",
    description: "My personal portfolio and projects.",
    username: "mayur-io-portfolio.netlify.app",
    url: "https://mayur-io-portfolio.netlify.app",
    icon: Globe,
    color: "#b44aff",
    bg: "rgba(180,74,255,0.15)",
    favorite: true,
  },
  {
    id: 4,
    name: "Gmail",
    category: "Emails",
    description: "My primary email for everything.",
    username: "mayur.bairagi@gmail.com",
    url: "mailto:mayur.bairagi@gmail.com",
    icon: Mail,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    favorite: false,
  },
  {
    id: 5,
    name: "Instagram",
    category: "Social Media",
    description: "Follow for updates and reels.",
    username: "@mayur_xr",
    url: "https://instagram.com",
    icon: Camera,
    color: "#e879f9",
    bg: "rgba(232,121,249,0.15)",
    favorite: false,
  },
  {
    id: 6,
    name: "Provity",
    category: "Projects",
    description: "My personal productivity tracker.",
    username: "My Project",
    url: "https://github.com/sanjaydotenv/Provity",
    icon: FolderKanban,
    color: "#fc6c26",
    bg: "rgba(252,108,38,0.15)",
    favorite: true,
  },
  {
    id: 7,
    name: "MongoDB Atlas",
    category: "Developer Tools",
    description: "Database management for my projects.",
    username: "cloud.mongodb.com",
    url: "https://cloud.mongodb.com",
    icon: Layers,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.13)",
    favorite: false,
  },
];

const categories = [
  { name: "All", icon: Grid2X2 },
  { name: "Projects", icon: Code2 },
  { name: "Social Media", icon: User },
  { name: "Emails", icon: Mail },
  { name: "Websites", icon: Globe },
  { name: "Developer Tools", icon: Wrench },
  { name: "Other", icon: Layers },
];

const ManagePage = () => {
  const [handles, setHandles] = useState(initialHandles);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("Recently Added");
  const [showModal, setShowModal] = useState(false);
  const [menuId, setMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const { form, setForm, handleSubmit } = useManageHandleHook();

  // Filter and sort handles
  const filteredHandles = useMemo(() => {
    let result = [...handles];

    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((item) =>
        [item.name, item.category, item.description, item.username]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }

    if (sort === "Alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "Favorites") {
      result.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    }

    return result;
  }, [handles, activeCategory, search, sort]);

  // Statistics
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

  // Copy handle
  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);

      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      console.error("Unable to copy link");
    }
  };

  // Add or update handle

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);

    setForm({
      name: "",
      category: "Projects",
      description: "",
      username: "",
      url: "",
    });
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
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
                    : "flex flex-col gap-3"
                }
              >
                {filteredHandles.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.id}
                      className={`group relative border border-[var(--border-color)] bg-gradient-to-br from-[var(--main-bg-2)]/80 to-transparent rounded-2xl hover:border-[var(--primary-color)]/50 hover:shadow-[0_8px_35px_rgba(252,108,38,0.07)] transition-all duration-300 ${
                        view === "grid"
                          ? "p-5"
                          : "p-4 flex flex-col sm:flex-row sm:items-center gap-5"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: item.bg,
                            color: item.color,
                          }}
                        >
                          <Icon size={30} />
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <button
                              onClick={() =>
                                setMenuId(menuId === item.id ? null : item.id)
                              }
                              className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5"
                            >
                              <MoreVertical size={19} />
                            </button>

                            {menuId === item.id && (
                              <div className="absolute right-0 top-10 z-30 w-36 rounded-xl border border-[var(--border-color)] bg-[#201e1e] p-1 shadow-xl">
                                <button className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 rounded-lg">
                                  Edit Handle
                                </button>

                                <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg">
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={view === "list" ? "flex-1" : "mt-4"}>
                        <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-semibold bg-[var(--primary-color)]/15 text-[var(--primary-color)] mb-2">
                          {item.category}
                        </span>

                        <h4 className="text-lg font-semibold">{item.name}</h4>

                        <p className="text-sm text-white/50 mt-1 min-h-10">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-2 mt-3 text-xs text-white/65 min-w-0">
                          <User
                            size={14}
                            className="text-[var(--primary-color)] shrink-0"
                          />

                          <div className="flex flex-col">
                            <span className="truncate">{item.username}</span>
                            {item.category === "Emails" && (
                              <button
                                onClick={() =>
                                  console.log("Check Password", item)
                                }
                                className="group flex items-center justify-center gap-2 w-full mt-3 py-2 px-3 rounded-lg border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-xs font-medium hover:bg-[var(--primary-color)] hover:text-black hover:border-[var(--primary-color)] transition-all duration-300"
                              >
                                <ShieldCheck size={14} />
                                <span>Check Password</span>
                                <Eye
                                  size={14}
                                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                                />
                              </button>
                            )}
                            {item.category === "Social Media" && (
                              <button
                                onClick={() =>
                                  console.log("Check Password", item)
                                }
                                className="group flex items-center justify-center gap-2 w-full mt-3 py-2 px-3 rounded-lg border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-xs font-medium hover:bg-[var(--primary-color)] hover:text-black hover:border-[var(--primary-color)] transition-all duration-300"
                              >
                                <ShieldCheck size={14} />
                                <span>Check Password</span>
                                <Eye
                                  size={14}
                                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-2 pt-4 border-t border-[var(--border-color)] ${
                          view === "list"
                            ? "sm:border-0 sm:pt-0 sm:w-64"
                            : "mt-4"
                        }`}
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-black text-xs font-semibold transition-all"
                        >
                          Open
                          <ExternalLink size={14} />
                        </a>

                        <button
                          onClick={() => handleCopy(item)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] hover:bg-white/5 text-xs transition"
                          title="Copy URL"
                        >
                          {copiedId === item.id ? (
                            <Check size={15} className="text-green-400" />
                          ) : (
                            <Copy size={15} />
                          )}

                          <span>
                            {copiedId === item.id ? "Copied" : "Copy"}
                          </span>
                        </button>
                      </div>
                    </article>
                  );
                })}

                {/* Add New Card */}
                {view === "grid" && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="min-h-[230px] rounded-2xl border border-dashed border-[var(--primary-color)]/50 bg-[var(--primary-color)]/[0.03] flex flex-col items-center justify-center gap-3 hover:bg-[var(--primary-color)]/[0.08] hover:border-[var(--primary-color)] transition-all group"
                  >
                    <div className="w-14 h-14 rounded-full border border-[var(--primary-color)]/50 flex items-center justify-center text-[var(--primary-color)] group-hover:scale-110 transition">
                      <Plus size={28} />
                    </div>

                    <h4 className="font-semibold">Add New Handle</h4>

                    <p className="text-xs text-white/40 text-center max-w-[180px]">
                      Add a new project, social link or important resource.
                    </p>
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

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    type="text"
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
