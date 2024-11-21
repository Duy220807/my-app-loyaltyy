import { Card, Select, Switch, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import React from 'react';

interface Tier {
  tierId: string;
  tierName: string;
}

export interface CustomerTableItem {
  customerId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: 'active' | 'inactive';
  customerTierStatus: {
    currentTier: {
      tierId: string;
      tierName: string;
    };
  };
}

interface CustomerTableProps {
  data: CustomerTableItem[];
  loading: boolean;
  tiers: Tier[];
  pagination: TablePaginationConfig;
  onTierChange: (customerId: string, tierId: string) => Promise<void>;
  onStatusChange: (
    customerId: string,
    status: 'active' | 'inactive',
  ) => Promise<void>;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  data,
  loading,
  tiers,
  pagination,
  onTierChange,
  onStatusChange,
  onPaginationChange,
}) => {
  const columns: ColumnsType<CustomerTableItem> = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Membership Tier',
      dataIndex: ['customerTierStatus', 'currentTier', 'tierId'],
      key: 'tierId',
      render: (tierId: string, record: CustomerTableItem) => (
        <Select
          style={{ width: 150 }}
          value={tierId}
          onChange={(value) => onTierChange(record.customerId, value)}
          options={tiers.map((tier) => ({
            label: tier.tierName,
            value: tier.tierId,
          }))}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive', record: CustomerTableItem) => (
        <Switch
          checked={status === 'active'}
          onChange={(checked) =>
            onStatusChange(record.customerId, checked ? 'active' : 'inactive')
          }
        />
      ),
    },
  ];

  return (
    <Card>
      <Table
        rowKey="customerId"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: onPaginationChange,
        }}
      />
    </Card>
  );
};

export default CustomerTable;
