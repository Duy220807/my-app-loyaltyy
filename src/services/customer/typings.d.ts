// import { request } from '@umijs/max';

/** API namespace for Customer Management and Membership Tiers */
declare namespace API {
  interface Customer {
    customerId?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    dob?: string; // ISO string for date
    joinDate?: string; // ISO string for date
    status?: 'active' | 'inactive';
    customerTierStatus?: CustomerTierStatus;
  }

  interface CustomerTierStatus {
    statusId?: number;
    currentTier?: MembershipTier;
    tierAchievedDate?: string; // ISO string for date
    lastTierUpdate?: string; // ISO string for date
  }

  interface MembershipTier {
    tierId?: string;
    tierName?: string;
    description?: string;
    tierOrder?: number;
    benefits?: string;
    status?: 'active' | 'inactive';
  }

  interface TierUpgradeCriteria {
    criteriaId?: string;
    targetTier?: MembershipTier;
    pointsRequired?: number;
    transactionCount?: number;
    minTransactionValue?: number;
    description?: string;
  }

  interface PageInfo_Customer_ {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Customer>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_Customer_ {
    success?: boolean;
    errorMessage?: string;
    data?: Customer;
  }

  interface Result_PageInfo_Customer_ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_Customer_;
  }

  interface Result_MembershipTier_ {
    success?: boolean;
    errorMessage?: string;
    data?: MembershipTier;
  }

  interface Result_Array_MembershipTier_ {
    success?: boolean;
    errorMessage?: string;
    data?: Array<MembershipTier>;
  }
}
