import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI, productsAPI } from '../services/api';
import { fadeUp, staggerContainer, scaleIn } from '../animations/animations';

const CATEGORIES = ['Tiles', 'Marble', 'Sanitary', 'Fittings'];

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Please enter username and password.');
      return;
    }
    try {
      setLoading(true);
      const res = await authAPI.login(form);
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify({ username: res.data.username }));
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-2">Admin</p>
          <h1 className="font-display text-3xl font-light text-stone-100">Secure Login</h1>
          <div className="w-12 h-px bg-gold-500 mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          <div>
            <label className="block font-body text-xs text-stone-500 tracking-widest uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 focus:border-gold-500 text-stone-100 font-body text-sm px-4 py-3 outline-none transition-colors"
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block font-body text-xs text-stone-500 tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 focus:border-gold-500 text-stone-100 font-body text-sm px-4 py-3 outline-none transition-colors"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-400 font-body text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing In...
              </span>
            ) : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductFormModal({ product, onClose, onSaved }) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'Tiles',
    featured: product?.featured || false,
  });
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [removeImageIds, setRemoveImageIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const objectUrlsRef = useRef([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((f) => {
      const url = URL.createObjectURL(f);
      objectUrlsRef.current.push(url);
      return { url, isNew: true };
    });
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Revoke all object URLs when the modal unmounts
  useEffect(() => {
    return () => { objectUrlsRef.current.forEach(URL.revokeObjectURL); };
  }, []);

  const removeExistingImage = (publicId) => {
    setRemoveImageIds((prev) => [...prev, publicId]);
  };

  const removeNewPreview = (idx) => {
    const adjustedIdx = idx - (product?.images?.length || 0) + removeImageIds.length;
    const updated = [...newFiles];
    updated.splice(adjustedIdx, 1);
    setNewFiles(updated);
    const updatedPreviews = [...previews];
    updatedPreviews.splice(idx, 1);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.description.trim()) {
      setError('Name and description are required.');
      return;
    }
    if (!isEdit && newFiles.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('featured', form.featured);
      newFiles.forEach((f) => formData.append('images', f));
      removeImageIds.forEach((id) => formData.append('removeImageIds', id));

      if (isEdit) {
        await productsAPI.update(product._id, formData);
      } else {
        await productsAPI.create(formData);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  // Existing images excluding removed ones
  const existingImages = (product?.images || []).filter(
    (img) => !removeImageIds.includes(img.publicId)
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl bg-stone-900 border border-stone-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
          <h2 className="font-display text-xl font-light text-stone-100">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-gold-400 transition-colors text-2xl font-light"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block font-body text-xs text-stone-500 tracking-widest uppercase mb-2">
              Product Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={150}
              className="w-full bg-stone-950 border border-stone-700 focus:border-gold-500 text-stone-100 font-body text-sm px-4 py-3 outline-none transition-colors"
              placeholder="e.g. Carrara White Marble 600x600mm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-body text-xs text-stone-500 tracking-widest uppercase mb-2">
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={1000}
              rows={4}
              className="w-full bg-stone-950 border border-stone-700 focus:border-gold-500 text-stone-100 font-body text-sm px-4 py-3 outline-none transition-colors resize-none"
              placeholder="Describe the product — size, finish, material, ideal use..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-body text-xs text-stone-500 tracking-widest uppercase mb-2">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 focus:border-gold-500 text-stone-100 font-body text-sm px-4 py-3 outline-none transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-gold-500"
            />
            <label htmlFor="featured" className="font-body text-sm text-stone-400 cursor-pointer">
              Mark as Featured Product
            </label>
          </div>

          {/* Images */}
          <div>
            <label className="block font-body text-xs text-stone-500 tracking-widest uppercase mb-2">
              Images {!isEdit && '*'}
            </label>

            {/* Existing images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {existingImages.map((img) => (
                  <div key={img.publicId} className="relative group w-20 h-20">
                    <img
                      src={img.url}
                      alt="product"
                      className="w-full h-full object-cover border border-stone-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.publicId)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New preview images */}
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {previews.map((p, i) => (
                  <div key={i} className="relative group w-20 h-20">
                    <img
                      src={p.url}
                      alt="preview"
                      className="w-full h-full object-cover border border-gold-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewPreview(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gold-500/80 text-stone-950 text-[8px] text-center py-0.5 font-body">
                      New
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload area */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-stone-700 hover:border-gold-500/50 py-8 flex flex-col items-center gap-2 transition-colors"
            >
              <svg className="w-8 h-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-body text-stone-500 text-sm">Click to upload images</span>
              <span className="font-body text-stone-700 text-xs">JPEG, PNG, WebP — max 5MB each</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {error && (
            <p className="text-red-400 font-body text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : isEdit ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline-gold px-6"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
export default function Admin() {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCat, setFilterCat] = useState('All');
  const [modal, setModal] = useState(null); // null | 'add' | {edit: product}
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productsAPI.getAll();
      setProducts(res.data);
    } catch (err) {
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      // Verify token is still valid
      authAPI.getMe().catch(() => {
        handleLogout();
      });
      fetchProducts();
    }
  }, [admin]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
  };

  const handleSaved = () => {
    setModal(null);
    fetchProducts();
    showToast('Product saved successfully!');
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      setDeleteLoading(true);
      await productsAPI.delete(deleteConfirm._id);
      setDeleteConfirm(null);
      fetchProducts();
      showToast('Product deleted.');
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const displayProducts = filterCat === 'All'
    ? products
    : products.filter((p) => p.category === filterCat);

  if (!admin) {
    return <LoginForm onLogin={(data) => setAdmin({ username: data.username })} />;
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | Annapurna Marbles & Sanitary</title>
      </Helmet>

      <div className="min-h-screen bg-stone-950">
        {/* Admin header */}
        <header className="bg-stone-900 border-b border-stone-800 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <p className="font-accent text-gold-500 text-[10px] tracking-[0.25em] uppercase">Admin Panel</p>
            <p className="font-display text-stone-200 text-lg font-light">Annapurna Marbles</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-body text-stone-500 text-xs">
              Logged in as <span className="text-stone-300">{admin.username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="font-body text-xs text-stone-500 hover:text-red-400 transition-colors tracking-wider uppercase"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-light text-stone-100">Products</h1>
              <p className="font-body text-stone-600 text-sm mt-1">
                {products.length} total product{products.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => setModal('add')}
              className="btn-gold whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`font-body text-xs tracking-widest uppercase px-4 py-2 border transition-all ${
                  filterCat === cat
                    ? 'border-gold-500 bg-gold-500 text-stone-950'
                    : 'border-stone-700 text-stone-400 hover:border-stone-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-stone-900 border border-stone-800">
                  <div className="aspect-[4/3] bg-stone-800 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-stone-800 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-stone-800 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && displayProducts.length === 0 && (
            <div className="text-center py-20 border border-dashed border-stone-800">
              <p className="font-display text-2xl text-stone-700 font-light mb-2">No products yet</p>
              <p className="font-body text-stone-600 text-sm mb-6">Add your first product to get started.</p>
              <button onClick={() => setModal('add')} className="btn-gold">Add First Product</button>
            </div>
          )}

          {/* Products table/grid */}
          {!loading && displayProducts.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {displayProducts.map((p) => (
                <motion.div
                  key={p._id}
                  variants={fadeUp}
                  className="bg-stone-900 border border-stone-800 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-stone-800">
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-700 text-sm">
                        No Image
                      </div>
                    )}
                    <span className="absolute top-2 left-2 font-body text-[10px] tracking-widest uppercase px-2 py-1 bg-stone-950/80 text-gold-500 border border-gold-500/30">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="absolute top-2 right-2 font-body text-[9px] tracking-widest uppercase px-2 py-1 bg-gold-500 text-stone-950">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-body text-sm text-stone-200 font-medium truncate mb-1">{p.name}</h3>
                    <p className="font-body text-xs text-stone-600 line-clamp-2 mb-3">{p.description}</p>
                    <p className="font-body text-xs text-stone-700">
                      {p.images?.length || 0} image{(p.images?.length || 0) !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={() => setModal({ edit: p })}
                      className="flex-1 font-body text-xs tracking-wider uppercase py-2 border border-gold-500/40 text-gold-500 hover:bg-gold-500 hover:text-stone-950 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(p)}
                      className="flex-1 font-body text-xs tracking-wider uppercase py-2 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Product modal */}
      <AnimatePresence>
        {modal && (
          <ProductFormModal
            product={modal === 'add' ? null : modal.edit}
            onClose={() => setModal(null)}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/90 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-stone-900 border border-stone-700 p-8 max-w-sm w-full"
            >
              <h3 className="font-display text-xl font-light text-stone-100 mb-2">Confirm Delete</h3>
              <p className="font-body text-stone-400 text-sm mb-6">
                Are you sure you want to delete <strong className="text-stone-200">"{deleteConfirm.name}"</strong>? This will also remove all associated images from Cloudinary.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-body text-xs tracking-widest uppercase py-3 transition-colors disabled:opacity-50"
                >
                  {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-stone-700 text-stone-400 hover:text-stone-200 font-body text-xs tracking-widest uppercase py-3 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 font-body text-sm tracking-wide ${
              toast.type === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-gold-500 text-stone-950'
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
