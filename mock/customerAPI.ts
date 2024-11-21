export const customers = [
  {
    customerId: '1',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+84 123456789',
    status: 'active',
    customerTierStatus: {
      currentTier: {
        tierId: '1',
        tierName: 'Bronze',
      },
    },
  },
  {
    customerId: '2',
    fullName: 'Jane Smith',
    email: 'janesmith@example.com',
    phoneNumber: '+84 987654321',
    status: 'inactive',
    customerTierStatus: {
      currentTier: {
        tierId: '2',
        tierName: 'Silver',
      },
    },
  },
];

const getTierName = (tierId: string): string => {
  const tierMap: { [key: string]: string } = {
    '1': 'Bronze',
    '2': 'Silver',
    '3': 'Gold',
    '4': 'Platinum',
  };
  return tierMap[tierId] || 'Unknown Tier';
};

export default {
  // API GET để lấy danh sách khách hàng
  'GET /api/customers': (req: any, res: any) => {
    const { current = 1, pageSize = 10 } = req.query;
    const startIndex = (current - 1) * pageSize;
    const endIndex = current * pageSize;

    const paginatedData = customers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        list: paginatedData,
        total: customers.length,
        current: Number(current),
        pageSize: Number(pageSize),
      },
    });
  },

  'PUT /api/customers/:customerId/tier': (req: any, res: any) => {
    const { customerId } = req.params; // Lấy customerId từ URL
    const { tierId } = req.body; // Lấy tierId từ payload

    const customerIndex = customers.findIndex(
      (c) => c.customerId === customerId,
    );
    if (customerIndex !== -1) {
      const tierName = getTierName(tierId); // Lấy tên hạng từ `tierMap`

      customers[customerIndex].customerTierStatus.currentTier = {
        tierId,
        tierName,
      };

      res.json({
        success: true,
        message: 'Customer tier updated successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }
  },

  // API PUT để cập nhật thông tin khách hàng
  'PUT /api/customers/:id': (req: any, res: any) => {
    const { id } = req.params; // Lấy customerId từ URL
    const { status, tierId } = req.body;

    const customerIndex = customers.findIndex((c) => c.customerId === id);
    if (customerIndex !== -1) {
      if (status) customers[customerIndex].status = status;
      if (tierId) {
        const tierMap: Record<string, string> = {
          '1': 'Bronze',
          '2': 'Silver',
          '3': 'Gold',
          '4': 'Platinum',
        };
        customers[customerIndex].customerTierStatus.currentTier = {
          tierId,
          tierName: tierMap[tierId] || '',
        };
      }

      res.json({
        success: true,
        errorCode: 0,
        message: 'Customer updated successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        errorCode: 404,
        message: 'Customer not found',
      });
    }
  },
};
