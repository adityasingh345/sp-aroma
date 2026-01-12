// ===============================
// API CONFIG
// ===============================

// In dev: Vite proxy → relative paths
// In prod: absolute backend URL
export const API_BASE = import.meta.env.VITE_API_BASE ?? '';

const TOKEN_KEY = 'spAromaToken';

function resolveUrl(path: string) {
  const p = path.startsWith('/') ? path : `/${path}`;

  // Dev → Vite proxy (relative)
  if (!API_BASE) return p;

  // Prod → absolute backend
  return `${API_BASE.replace(/\/$/, '')}${p}`;
}

// ===============================
// TOKEN HELPERS
// ===============================
export function setAuthToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// ===============================
// RESPONSE PARSER
// ===============================
async function parseResponse(res: Response) {
  const ct = res.headers.get('content-type') || '';

  if (ct.includes('application/json')) {
    const json = await res.json().catch(() => null);
    if (!res.ok) throw { status: res.status, body: json };
    return json;
  }

  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, body: json };
    return json;
  } catch {
    if (!res.ok) throw { status: res.status, body: text };
    return text;
  }
}

// ===============================
// CORE HTTP METHODS
// ===============================
function authHeaders(token?: string) {
  const t = token ?? getAuthToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function getJson(path: string, token?: string) {
  const res = await fetch(resolveUrl(path), {
    method: 'GET',
    credentials: 'include',
    headers: authHeaders(token),
  });
  return parseResponse(res);
}

export async function postJson(path: string, body: any, token?: string) {
  const res = await fetch(resolveUrl(path), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

export async function putJson(path: string, body: any, token?: string) {
  const res = await fetch(resolveUrl(path), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

export async function patchJson(path: string, body: any, token?: string) {
  const res = await fetch(resolveUrl(path), {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

export async function deleteJson(path: string, token?: string) {
  const res = await fetch(resolveUrl(path), {
    method: 'DELETE',
    credentials: 'include',
    headers: authHeaders(token),
  });
  return parseResponse(res);
}

// ===============================
// FORM (OAuth2 Login)
// ===============================
export async function postForm(path: string, form: Record<string, string>) {
  const res = await fetch(resolveUrl(path), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(form),
  });
  return parseResponse(res);
}

// ===============================
// AUTH API
// ===============================
export const apiRegister = (email: string, password: string, password_confirm: string) =>
  postJson('/accounts/register', { email, password, password_confirm });

export const apiVerifyRegistration = (email: string, otp: string) =>
  patchJson('/accounts/register/verify', { email, otp });

export const apiLogin = (username: string, password: string) =>
  postForm('/accounts/login', { username, password });

export const apiLogout = () => postJson('/accounts/logout', {});

export const apiResetPassword = (email: string) =>
  postJson('/accounts/reset-password', { email });

export const apiVerifyResetPassword = (
  email: string,
  otp: string,
  password: string,
  password_confirm: string
) =>
  patchJson('/accounts/reset-password/verify', {
    email,
    otp,
    password,
    password_confirm,
  });

export const apiResendOTP = (email: string, code_type: string) =>
  postJson('/accounts/otp', { email, code_type });

// ===============================
// USER API
// ===============================
export const apiGetCurrentUser = () => getJson('/accounts/me');

export const apiUpdateCurrentUser = (data: any) =>
  putJson('/accounts/me', data);

export const apiChangePassword = (
  current_password: string,
  password: string,
  password_confirm: string
) =>
  patchJson('/accounts/me/password', {
    current_password,
    password,
    password_confirm,
  });

export const apiChangeEmail = (email: string) =>
  postJson('/accounts/me/email', { email });

export const apiVerifyChangeEmail = (otp: string) =>
  patchJson('/accounts/me/email/verify', { otp });

export const apiGetUser = (userId: number) =>
  getJson(`/accounts/${userId}`);

// ===============================
// PRODUCTS API
// ===============================
export const apiGetProducts = () => getJson('/products/');

export const apiGetProduct = (productId: number | string) =>
  getJson(`/products/${productId}`);

export const apiCreateProduct = (data: any) =>
  postJson('/products/', data);

export const apiUpdateProduct = (productId: number, data: any) =>
  putJson(`/products/${productId}`, data);

export const apiDeleteProduct = (productId: number) =>
  deleteJson(`/products/${productId}`);

// ===============================
// PRODUCT VARIANTS API
// ===============================
export const apiGetVariant = (variantId: number) =>
  getJson(`/products/variants/${variantId}`);

export const apiUpdateVariant = (variantId: number, data: any) =>
  putJson(`/products/variants/${variantId}`, data);

export const apiGetProductVariants = (productId: number) =>
  getJson(`/products/${productId}/variants`);

// ===============================
// ADDRESSES API
// ===============================
export const apiGetAddresses = () => getJson('/addresses/');

export const apiGetAddress = (addressId: number) =>
  getJson(`/addresses/${addressId}`);

export const apiCreateAddress = (data: any) =>
  postJson('/addresses/', data);

export const apiUpdateAddress = (addressId: number, data: any) =>
  putJson(`/addresses/${addressId}`, data);

export const apiDeleteAddress = (addressId: number) =>
  deleteJson(`/addresses/${addressId}`);

// ===============================
// CART API
// ===============================
export const apiGetCart = () => getJson('/cart/');

export const apiAddToCart = (variant_id: number, quantity: number) =>
  postJson('/cart/add', { variant_id, quantity });

export const apiUpdateCartItem = (itemId: number, quantity: number) =>
  putJson(`/cart/item/${itemId}`, { quantity });

export const apiDeleteCartItem = (itemId: number) =>
  deleteJson(`/cart/item/${itemId}`);

export const apiCheckout = (addressId: number) =>
  postJson(`/cart/checkout`, {}, undefined);

// ===============================
// ORDERS API
// ===============================
export const apiGetOrders = () => getJson('/orders/');

export const apiGetOrder = (orderId: number) =>
  getJson(`/orders/${orderId}`);

export const apiGetAllOrders = () =>
  getJson('/orders/admin/allorders');

// ===============================
// PAYMENTS API
// ===============================
export const apiCreatePayment = (orderId: number) =>
  postJson(`/payments/create/${orderId}`, {});

// ===============================
// ATTRIBUTES API
// ===============================
export const apiGetAttributes = () => getJson('/attributes');
