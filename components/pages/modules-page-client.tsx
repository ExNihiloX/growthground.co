'use client';
import { useRouter } from 'next/navigation';
import { ModulesGrid } from '@/components/dashboard/modules-grid';
import { Module } from '@/lib/services/content-service.client';

export function ModulesPageClient() {
  const router = useRouter();
  return (
    <ModulesGrid onStartModule={(module: Module) => router.push(`/modules/${module.id}`)} />
  );
}
