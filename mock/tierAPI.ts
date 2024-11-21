const tiers = [
  {
    tierId: '1',
    tierName: 'Bronze',
    description: 'Basic membership tier with minimal benefits.',
    tierOrder: 1,
    benefits: 'Access to standard support',
    status: 'active',
  },
  {
    tierId: '2',
    tierName: 'Silver',
    description: 'Intermediate membership tier with additional benefits.',
    tierOrder: 2,
    benefits: 'Priority support and free shipping',
    status: 'active',
  },
  {
    tierId: '3',
    tierName: 'Gold',
    description: 'Advanced membership tier with premium benefits.',
    tierOrder: 3,
    benefits: 'Exclusive discounts and dedicated support',
    status: 'active',
  },
  {
    tierId: '4',
    tierName: 'Platinum',
    description: 'Elite membership tier with all-inclusive benefits.',
    tierOrder: 4,
    benefits: 'Unlimited access to all services and perks',
    status: 'active',
  },
];

export default {
  // API GET để lấy danh sách hạng thành viên
  'GET /api/tiers': (req: any, res: any) => {
    res.json({
      success: true,
      data: tiers,
    });
  },

  // API GET để lấy chi tiết một hạng thành viên
  'GET /api/tiers/:tierId': (req: any, res: any) => {
    const { tierId } = req.params;
    const tier = tiers.find((t) => t.tierId === tierId);

    if (tier) {
      res.json({
        success: true,
        data: tier,
      });
    } else {
      res.status(404).json({
        success: false,
        errorCode: 404,
        message: 'Tier not found',
      });
    }
  },
};
