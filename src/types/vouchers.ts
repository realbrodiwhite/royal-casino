
import type { ShopItem } from '@/types/inventory';

export type VoucherRewardType = 'credits' | 'item';

export interface VoucherReward {
  type: VoucherRewardType;
  amount?: number; // For credits
  itemId?: string; // For item, maps to ShopItem ID
  itemName?: string; // For display purposes
}

// 'specific_users_once': For a list of users, each can use it once.
// 'once_per_user': Any user can use it once.
// 'limited_total': X total redemptions allowed globally. Can be combined with once_per_user.
// 'unlimited_total': No global redemption limit. Can be combined with once_per_user.
export type VoucherUsageLimitType = 'specific_users_once' | 'once_per_user' | 'limited_total' | 'unlimited_total';

export interface Voucher {
  id: string; // Unique ID for the voucher
  code: string; // The actual code players enter
  description: string; // Admin-facing description of the voucher's purpose
  reward: VoucherReward;
  usageLimit: {
    type: VoucherUsageLimitType;
    maxRedemptions?: number; // For 'limited_total'
    allowedUserIds?: string[]; // For 'specific_users_once' - user IDs
    enforceOncePerUserWithGlobalLimit?: boolean; // If 'limited_total', should it also be once per user?
  };
  redemptionCount: number; // How many times this voucher has been redeemed globally
  redeemedBy: Record<string, { userId: string, redeemedAt: string }>; // Tracks users who redeemed it and when
  isActive: boolean;
  createdAt: string; // ISO date string
  // expiryDate?: string; // TODO: Future enhancement
}
