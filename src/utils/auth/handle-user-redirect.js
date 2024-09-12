export function handleUserRedirect(user) {
  console.log(user, "user");
  if (user.user.role === "admin") {
    return {
      user: user.user,
      redirectUrl: "/admin/dashboard",
      token: user.token,
    };
  }

  return {
    user: user.user,
    redirectUrl: "/user/home",
    token: user.token,
  };
}
