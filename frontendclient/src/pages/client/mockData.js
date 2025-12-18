// Mock data for development and testing
import voucherImg1 from '../../assets/images/voucherImg1.png';
import voucherImg2 from '../../assets/images/voucherImg2.png';
import voucherImg3 from '../../assets/images/voucherImg3.png';
import voucherImg4 from '../../assets/images/voucherImg4.png';
import voucherImg5 from '../../assets/images/voucherImg5.png';
import voucherImg6 from '../../assets/images/voucherImg6.png';
import voucherImg7 from '../../assets/images/voucherImg7.png';
import voucherImg8 from '../../assets/images/voucherImg8.png';

export const mockUser = {
    user_id: 1,
    user_name: 'John Doe',
    email: 'john.doe@example.com',
    points: 1250,
    usertype_id: 2,
    created_at: '2024-01-15T10:30:00Z'
};

export const mockRewards = [
    {
      id: 1,
      reward_name: 'FREEDRINK',
      reward_desc: 'Get a free drink of any choice from any Braddex location',
      reward_points: 25,
      reward_image: voucherImg1,
      reward_color: '#A62C2C',
      reward_category: 'Drinks',
      isDeleted: 0
    },
    {
      id: 2,
      reward_name: 'SIDEDISH50',
      reward_desc: 'Get Php 50 off any side dish order at any Braddex location',
      reward_points: 50,
      reward_image: voucherImg2,
      reward_color: '#134686',
      reward_category: 'Side Dishes',
      isDeleted: 0
    },
    {
      id: 3,
      reward_name: 'BUYROLLSTAKE1',
      reward_desc: 'Receive a Buy 1 Take 1 promo for any rolls meal or order',
      reward_points: 75,
      reward_image: voucherImg3,
      reward_color: '#EA7300',
      reward_category: 'Main Meals',
      isDeleted: 0
    },
    {
      id: 4,
      reward_name: 'FREERICEMEAL',
      reward_desc: 'Get a free rice meal of your choice from any Braddex location',
      reward_points: 100,
      reward_image: voucherImg4,
      reward_color: '#EA7300',
      reward_category: 'Main Meals',
      isDeleted: 0
    },
    {
      id: 5,
      reward_name: 'FREESIOMAI',
      reward_desc: 'Receive one free order of Braddex siomai!',
      reward_points: 125,
      reward_image: voucherImg5,
      reward_color: '#A62C2C',
      reward_category: 'Main Meals',
      isDeleted: 0
    },
    {
      id: 6,
      reward_name: '10PERCENT',
      reward_desc: 'Get a voucher for 10% off your next order (minimum purchase applies)',
      reward_points: 150,
      reward_image: voucherImg6,
      reward_color: '#134686',
      reward_category: 'Discounts',
      isDeleted: 0
    },
    {
      id: 7,
      reward_name: 'BATCHOYLOVE',
      reward_desc: 'Receive a free order of batchoy at any Braddex location',
      reward_points: 175,
      reward_image: voucherImg7,
      reward_color: '#EA7300',
      reward_category: 'Main Meals',
      isDeleted: 0
    },
    {
      id: 8,
      reward_name: 'PARTYPACK200',
      reward_desc: 'Php 200 off the next group order! (Group orders apply)',
      reward_points: 200,
      reward_image: voucherImg8,
      reward_color: '#EA7300',
      reward_category: 'Combo Meals',
      isDeleted: 0
    }
  ];
  
  

export const mockVouchers = [
    {
        id: 1,
        voucher_name: '10% Discount',
        voucher_code: 'SAVE10',
        discount_percentage: 10,
        status: 'active',
        expires_at: '2024-12-31T23:59:59Z',
        redeemed_at: null
    },
    {
        id: 2,
        voucher_name: 'Free Shipping',
        voucher_code: 'FREESHIP',
        discount_percentage: 0,
        status: 'active',
        expires_at: '2024-11-30T23:59:59Z',
        redeemed_at: null
    },
    {
        id: 3,
        voucher_name: 'Buy 1 Get 1',
        voucher_code: 'BOGO2024',
        discount_percentage: 50,
        status: 'used',
        expires_at: '2024-10-15T23:59:59Z',
        redeemed_at: '2024-09-20T14:30:00Z'
    }
];

export const mockNotifications = [
    {
        id: 1,
        title: 'New Reward Available!',
        message: 'Check out our new premium gift set reward for 1000 points',
        type: 'reward',
        isRead: false,
        created_at: '2024-10-01T09:00:00Z'
    },
    {
        id: 2,
        title: 'Points Added',
        message: 'You earned 50 points from your recent purchase',
        type: 'points',
        isRead: false,
        created_at: '2024-09-28T15:30:00Z'
    },
    {
        id: 3,
        title: 'Voucher Expiring Soon',
        message: 'Your 10% discount voucher expires in 3 days',
        type: 'voucher',
        isRead: true,
        created_at: '2024-09-25T10:00:00Z'
    },
    {
        id: 4,
        title: 'Reward Redeemed',
        message: 'You successfully redeemed "Free Coffee" reward',
        type: 'redemption',
        isRead: true,
        created_at: '2024-09-20T11:15:00Z'
    }
];

export const mockPurchaseHistory = [
    {
        id: 1,
        purchase_date: '2024-09-28T15:30:00Z',
        amount: 150.00,
        points_earned: 50,
        items: ['Coffee', 'Sandwich', 'Cookie']
    },
    {
        id: 2,
        purchase_date: '2024-09-25T12:00:00Z',
        amount: 75.50,
        points_earned: 25,
        items: ['Latte', 'Muffin']
    },
    {
        id: 3,
        purchase_date: '2024-09-20T11:15:00Z',
        amount: 200.00,
        points_earned: 100,
        items: ['Meal Combo', 'Drink']
    }
];

// Export all mock data as a single object for easy access
export const mockData = {
    user: mockUser,
    rewards: mockRewards,
    vouchers: mockVouchers,
    notifications: mockNotifications,
    purchaseHistory: mockPurchaseHistory
};

