// ** Icon imports

import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'
import CalendarClock from 'mdi-material-ui/CalendarClock'
import {Motorbike, Receipt, OrderBoolAscending, PlaylistCheck, ToolboxOutline, WashingMachine} from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Analytics',
      icon: ChartTimelineVariant,
      path: '/analytics'
      // badgeContent: 'new',
      // badgeColor: 'error',
    },
    // {
    //   sectionTitle: 'Apps & Pages'
    // },
    // {
    //   title: 'Bookings',
    //   icon: OrderBoolAscending,
    //   path: '/apps/bookings/list'
    // },
    // {
    //   title: 'Billing',
    //   icon: OrderBoolAscending,
    //   children: [
    //     {
    //       title: 'Invoice',
    //       path: '/apps/billings/invoice/list'
    //     },
    //     {
    //       title: 'Subscriptions',
    //       path: '/apps/subscriptions/list'
    //     }
    //   ]
    // },
    {
      title: 'Invoice',
      icon: Receipt,
      path: '/apps/billings/invoice/list'
    },
    {
      title: 'Offline Invoice',
      icon: Receipt,
      path: '/apps/offline-invoice/list'
    },
    {
      title: 'Rides',
      icon: Motorbike,
      path: '/apps/rides/list'
    },
    {
      icon: CalendarClock,
      title: 'Subscriptions',
      path: '/apps/subscriptions/list'

    },
    // {
    //   title: 'Rides',
    //   icon: Motorbike,
    //   path: '/apps/rides/list'
    // },
    // {
    //   title: 'Purchases',
    //   icon: OrderBoolAscending,
    //   children: [
    //     {
    //       title: 'Subscriptions',
    //       path: '/apps/purchases/subscriptions/list'
    //     },
    //   ]

    // },

    {
      title: 'Services',
      icon: WashingMachine,
      children: [
        {
          title: 'Categories',
          path: '/apps/services/categories/list',
        },
        {
          title: 'Item',
          path: '/apps/services/item/list',
        },
        {
          title: 'Helper',
          path: '/apps/services/helper/list',
        }
      ]
    },

    {
      title: 'Accounts',
      icon: AccountOutline,
      children: [
        {
          action: 'read',
          subject: 'admin-list',

          title: 'Internal',
          path: '/apps/user/admin/list',
        },
        {
          title: 'Rider',
          path: '/apps/user/rider/list',
        },
        {
          title: 'Customer',
          path: '/apps/user/customer/list',
        }
      ]
    },


    {
      icon: AccountOutline,
      title: 'Others',
      children: [
        {
          title: 'Plans',
          // icon: PlaylistCheck,
          path: '/apps/plans/list',
        },
        {
          title: 'Coupons',
          // icon: PlaylistCheck,
          path: '/apps/coupons/list',
        },
        {
          title: 'Time Slotting',
          // icon: Motorbike,
          path: '/apps/time-slot'
        },
        {
          title: 'Setting',
          // icon: Motorbike,
          path: '/apps/settings'
        }
      ]
    },
    // {
    //   title: 'Second Page',
    //   icon: EmailOutline,
    //   path: '/second-page'
    // },
    // {
    //   title: 'Access Control',
    //   icon: ShieldOutline,
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    // },
    // {
    //   action: 'read',
    //   subject: 'user-nav',
    //   title: 'Test',
    //   icon: ShieldOutline,
    //   path: '/acl',
    // }
  ]
}

export default navigation
