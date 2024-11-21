import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  modifyCustomer,
  queryCustomerList,
  queryMembershipTiers,
  updateCustomerTier,
} from '../../services/customer/CustomerController';
import CustomerTable, { CustomerTableItem } from './components/CustomerTable';
import SearchBar from './components/SearchBar';

const CustomerPage: React.FC = () => {
  const [data, setData] = useState<CustomerTableItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [tiers, setTiers] = useState<{ tierId: string; tierName: string }[]>(
    [],
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const fetchTiers = async () => {
    try {
      const response = await queryMembershipTiers();
      if (response.success) {
        const validTiers = (response.data || []).filter(
          (tier): tier is { tierId: string; tierName: string } =>
            tier.tierId !== undefined,
        );
        setTiers(validTiers);
      } else {
        message.error(
          response.errorMessage || 'Failed to fetch membership tiers',
        );
      }
    } catch {
      message.error('Error fetching membership tiers');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await queryCustomerList({
        current: pagination.current,
        pageSize: pagination.pageSize,
        search: searchTerm,
      });
      if (response.success && response.data) {
        const formattedData: CustomerTableItem[] = (
          response.data.list || []
        ).map((item) => ({
          customerId: item.customerId || 'unknown-id',
          fullName: item.fullName || 'Unknown Name',
          email: item.email || 'No Email',
          phoneNumber: item.phoneNumber || 'No Phone Number',
          status: item.status || 'inactive',
          customerTierStatus: {
            currentTier: {
              tierId:
                item.customerTierStatus?.currentTier?.tierId || 'unknown-tier',
              tierName:
                item.customerTierStatus?.currentTier?.tierName ||
                'Unknown Tier',
            },
          },
        }));
        setData(formattedData);
        setPagination({ ...pagination, total: response.data.total || 0 });
      } else {
        message.error(response.errorMessage || 'Failed to fetch customers');
      }
    } catch {
      message.error('Error fetching customer list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, searchTerm]);

  const handleTierChange = async (customerId: string, tierId: string) => {
    try {
      // Gọi API để cập nhật hạng thành viên
      const response = await updateCustomerTier(
        { customerId, tierId }, // Params (truyền trong URL)
        { tierId }, // Body (truyền trong payload)
      );

      if (response.success) {
        // Hiển thị thông báo thành công
        message.success('Cập nhật hạng thành viên thành công');
        // Làm mới dữ liệu để hiển thị thông tin mới
        fetchData();
      } else {
        // Hiển thị thông báo lỗi nếu có vấn đề từ server
        message.error(response.errorMessage || 'Cập nhật thất bại');
      }
    } catch (error) {
      // Bắt lỗi mạng hoặc lỗi không mong muốn
      console.error('Error updating tier:', error);
      message.error('Đã xảy ra lỗi khi cập nhật hạng thành viên');
    }
  };

  const handleStatusChange = async (
    customerId: string,
    status: 'active' | 'inactive',
  ) => {
    try {
      const response = await modifyCustomer({ customerId }, { status });
      if (response.success) {
        message.success('Status updated');
        fetchData();
      } else {
        message.error(response.errorMessage || 'Update failed');
      }
    } catch {
      message.error('Error updating status');
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPagination({ ...pagination, current: 1 }); // Reset to first page for new search
  };

  return (
    <PageContainer>
      <div style={{ marginBottom: 24 }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <CustomerTable
        data={data}
        loading={loading}
        tiers={tiers}
        pagination={pagination}
        onTierChange={handleTierChange}
        onStatusChange={handleStatusChange}
        onPaginationChange={(page: number, pageSize: number) =>
          setPagination({ ...pagination, current: page, pageSize })
        }
      />
    </PageContainer>
  );
};

export default CustomerPage;
