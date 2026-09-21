'use server'

import { revalidatePath } from 'next/cache'

/**
 * Called by the admin dashboard after publishing or deleting content.
 * Revalidates the learn and explore pages so users see fresh content
 * without needing a full deployment.
 */
export async function revalidateContent() {
  revalidatePath('/learn', 'page')
  revalidatePath('/explore', 'page')
}

