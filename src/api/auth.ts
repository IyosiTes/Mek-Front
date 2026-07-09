import api from "./api";

export async function register(data: {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}) {
  const res = await api.post(
    "/auth/register/",
    data
  );

  return res.data;
}

export async function login(
  username: string,
  password: string
) {
  const res = await api.post(
    "/auth/login/",
    {
      username,
      password,
    }
  );

  return res.data;
}