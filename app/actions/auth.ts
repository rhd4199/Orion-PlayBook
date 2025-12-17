"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function register(prevState: any, formData: FormData) {
  const result = RegisterSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password, displayName } = result.data;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["Email already exists"],
      },
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  // Default status: 'active'
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      displayName,
      status: "active",
    },
  });

  // Create session
  await createSession(user.id, "user");

  redirect("/admin");
}

export async function login(prevState: any, formData: FormData) {
  const result = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return {
      errors: {
        email: ["Invalid credentials"],
      },
    };
  }

  await createSession(user.id, "admin"); // Simplified: Assume everyone is admin for demo
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
