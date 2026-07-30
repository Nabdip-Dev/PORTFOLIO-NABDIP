"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile, changePassword } from "@/services/api/profileService";
import { uploadAvatar } from "@/services/api/uploadService";

const profileSchema = z.object({ name: z.string().trim().min(2, "Name is too short") });
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function AdminProfilePage() {
  const { user } = useAuth();

  const profileForm = useForm<{ name: string }>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "" },
  });

  const passwordForm = useForm<{ currentPassword: string; newPassword: string; confirmPassword: string }>({
    resolver: zodResolver(passwordSchema),
  });

  async function onProfileSubmit(values: { name: string }) {
    try {
      await updateProfile(values);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  }

  async function handleAvatarSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const { url, publicId } = await uploadAvatar(file);
      await updateProfile({ avatar: { url, publicId } });
      toast.success("Avatar updated");
    } catch {
      toast.error("Failed to upload avatar");
    }
  }

  async function onPasswordSubmit(values: { currentPassword: string; newPassword: string }) {
    try {
      await changePassword(values);
      toast.success("Password changed");
      passwordForm.reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to change password");
    }
  }

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h1 className="font-display text-xl font-semibold">Profile</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">{user?.email}</p>
      </div>

      <div className="flex items-center gap-4 rounded-card glass p-6">
        {user?.avatar?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatar.url} alt={user.name} className="h-14 w-14 rounded-full object-cover" />
        ) : (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-[var(--accent-foreground)]"
            style={{ background: "var(--gradient-accent)" }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <label className="flex cursor-pointer items-center gap-2 rounded-full bg-[var(--surface-elevated)] px-4 py-2 text-xs font-medium hover:text-[var(--accent)]">
          <FiUpload size={13} /> Change avatar
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect} />
        </label>
      </div>

      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 rounded-card glass p-6">
        <h2 className="font-display text-sm font-semibold">Basic info</h2>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">Name</label>
          <input
            {...profileForm.register("name")}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          {profileForm.formState.errors.name && (
            <p className="mt-1 text-xs text-red-400">{profileForm.formState.errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={profileForm.formState.isSubmitting}
          className="rounded-full px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          style={{ background: "var(--gradient-accent)" }}
        >
          Save profile
        </button>
      </form>

      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 rounded-card glass p-6">
        <h2 className="font-display text-sm font-semibold">Change password</h2>
        <div>
          <input
            {...passwordForm.register("currentPassword")}
            type="password"
            placeholder="Current password"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          {passwordForm.formState.errors.currentPassword && (
            <p className="mt-1 text-xs text-red-400">{passwordForm.formState.errors.currentPassword.message}</p>
          )}
        </div>
        <div>
          <input
            {...passwordForm.register("newPassword")}
            type="password"
            placeholder="New password"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          {passwordForm.formState.errors.newPassword && (
            <p className="mt-1 text-xs text-red-400">{passwordForm.formState.errors.newPassword.message}</p>
          )}
        </div>
        <div>
          <input
            {...passwordForm.register("confirmPassword")}
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          {passwordForm.formState.errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-400">{passwordForm.formState.errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={passwordForm.formState.isSubmitting}
          className="rounded-full px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          style={{ background: "var(--gradient-accent)" }}
        >
          Update password
        </button>
      </form>
    </div>
  );
}
