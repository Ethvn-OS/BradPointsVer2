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
    password: 'password123',
    created_at: '2024-01-15T10:30:00Z',
    profilePicture: null
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
        redeemed_at: null,
        reward_desc: 'Get a voucher for 10% off your next order (minimum purchase applies)',
        reward_image: voucherImg6,
        reward_color: '#134686',
        reward_points: 150
    },
    {
        id: 2,
        voucher_name: 'Free Shipping',
        voucher_code: 'FREESHIP',
        discount_percentage: 0,
        status: 'active',
        expires_at: '2024-11-30T23:59:59Z',
        redeemed_at: null,
        reward_desc: 'Free shipping on your next order',
        reward_image: voucherImg1,
        reward_color: '#A62C2C',
        reward_points: 50
    },
    {
        id: 3,
        voucher_name: 'Buy 1 Get 1',
        voucher_code: 'BOGO2024',
        discount_percentage: 50,
        status: 'used',
        expires_at: '2024-10-15T23:59:59Z',
        redeemed_at: '2024-09-20T14:30:00Z',
        reward_desc: 'Receive a Buy 1 Take 1 promo for any rolls meal or order',
        reward_image: voucherImg3,
        reward_color: '#EA7300',
        reward_points: 75,
        claimed: false
    },
    {
        id: 4,
        voucher_name: 'Free Drink',
        voucher_code: 'FREEDRINK',
        discount_percentage: 0,
        status: 'used',
        expires_at: '2024-12-01T23:59:59Z',
        redeemed_at: '2024-10-15T12:00:00Z',
        reward_desc: 'Get a free drink of any choice from any Braddex location',
        reward_image: voucherImg1,
        reward_color: '#A62C2C',
        reward_points: 25,
        claimed: true
    }
];

export const mockNotifications = [
  {
    id: 1,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed BUYROLLSTAKE1! Your voucher is now available.',
    customer_id: 2000015,
    timestamp: '2025-07-21T21:27:27',
    read: false
  },
  {
    id: 2,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed FREEDRINK! Your voucher is now available.',
    customer_id: 2000031,
    timestamp: '2025-07-21T22:21:08',
    read: false
  },
  {
    id: 3,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed SIDEDISH50! Your voucher is now available.',
    customer_id: 2000031,
    timestamp: '2025-07-21T22:21:38',
    read: false
  },
  {
    id: 4,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed FREEDRINK! Your voucher is now available.',
    customer_id: 2000028,
    timestamp: '2025-07-21T22:35:37',
    read: false
  },
  {
    id: 5,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed SIDEDISH50! Your voucher is now available.',
    customer_id: 2000028,
    timestamp: '2025-07-21T22:35:51',
    read: false
  },
  {
    id: 6,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed BUYROLLSTAKE1! Your voucher is now available.',
    customer_id: 2000028,
    timestamp: '2025-07-21T23:24:21',
    read: false
  },
  {
    id: 7,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed FREERICEMEAL! Your voucher is now available.',
    customer_id: 2000028,
    timestamp: '2025-07-21T23:31:48',
    read: false
  },
  {
    id: 8,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed FREESIOMAI! Your voucher is now available.',
    customer_id: 2000028,
    timestamp: '2025-07-21T23:33:44',
    read: false
  },
  {
    id: 9,
    type: 'redemption',
    title: 'Reward Redeemed!',
    message: 'You have successfully availed 10PERCENT! Your voucher is now available.',
    customer_id: 2000028,
    timestamp: '2025-07-22T15:12:56',
    read: false
  },
  {
    id: 12,
    type: 'claim',
    title: 'Reward Claimed!',
    message: 'Voucher BRAD72910_76 has been claimed by User ID 2000030.',
    customer_id: 2000030,
    timestamp: '2025-07-23T01:40:20',
    read: false
  },
  {
    id: 15,
    type: 'claim',
    title: 'Reward Claimed!',
    message: 'Voucher BRAD75383_77 has been claimed by User ID 2000030.',
    customer_id: 2000030,
    timestamp: '2025-07-23T01:52:42',
    read: false
  },
  {
    id: 20,
    type: 'claim',
    title: 'Reward Claimed!',
    message: 'Voucher BRAD94917_53 has been claimed by User ID 2000005.',
    customer_id: 2000005,
    timestamp: '2025-07-23T02:09:58',
    read: false
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

