const { db } = require('../config/firebaseAdmin');

// 檢查用戶是否具有特定角色 (RBAC) (尚未使用)
const hasRole = async (uid, requiredRole) => {
  const userDoc = await db.collection("users").doc(uid).get();
  if (userDoc.exists) {
    const roles = userDoc.data().roles || [];
    return roles.includes(requiredRole);
  }
  return false;
};

// 檢查用戶是否具有特定權限 (PBAC) (尚未使用)
const hasPermission = async (uid, requiredPermission) => {
  const userDoc = await db.collection("users").doc(uid).get();
  if (userDoc.exists) {
    const permissions = userDoc.data().permissions || [];
    return permissions.includes(requiredPermission);
  }
  return false;
};

// 檢查用戶是否為受保護帳號
const isProtectedAccount = async (uid) => {
  const userDoc = await db.collection("users").doc(uid).get();
  return userDoc.exists && userDoc.data().isProtected === true;
};

module.exports = { hasRole, hasPermission, isProtectedAccount };