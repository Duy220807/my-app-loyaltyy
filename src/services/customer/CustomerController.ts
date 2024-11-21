/** API for Customer Management */

import { request } from '@umijs/max';
import { API } from './typings';

/** GET /api/customers - Fetch all customers */
export async function queryCustomerList(
  params: {
    keyword?: string;
    current?: number;
    pageSize?: number;
    search?: any;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_Customer_>('/api/customers', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** GET /api/customers/{customerId} - Get customer details */
export async function getCustomerDetail(
  params: {
    customerId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_Customer_>(`/api/customers/${params.customerId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** POST /api/customers - Create a new customer */
export async function addCustomer(
  body: API.Customer,
  options?: { [key: string]: any },
) {
  return request<API.Result_Customer_>('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  });
}

/** PUT /api/customers/{customerId} - Update a customer */
export async function modifyCustomer(
  params: {
    customerId: string;
  },
  body: API.Customer,
  options?: { [key: string]: any },
) {
  return request<API.Result_Customer_>(`/api/customers/${params.customerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  });
}

/** DELETE /api/customers/{customerId} - Delete a customer */
export async function deleteCustomer(
  params: {
    customerId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/customers/${params.customerId}', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** GET /api/customers/{customerId}/tier - Get customer's current membership tier */
export async function getCustomerTier(
  params: {
    customerId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_MembershipTier_>(
    `/api/customers/${params.customerId}/tier`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** PUT /api/customers/{customerId}/tier - Update customer's membership tier */
export async function updateCustomerTier(
  params: { customerId: string; tierId: string },
  body: { tierId: string },
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/api/customers/${params.customerId}/tier`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/tiers - Fetch all membership tiers */
export async function queryMembershipTiers(options?: { [key: string]: any }) {
  return request<API.Result_Array_MembershipTier_>('/api/tiers', {
    method: 'GET',
    ...(options || {}),
  });
}

/** GET /api/tiers/{tierId} - Get details of a specific membership tier */
export async function getMembershipTierDetail(
  params: {
    tierId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_MembershipTier_>(`/api/tiers/${params.tierId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
