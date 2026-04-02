export const FEATURE_FLAGS = {
  NEW_ONBOARDING_V2: {
    key: 'new-onboarding-v2',
    description: 'Streamlined onboarding without fitness assessment',
    targeting: {
      rolloutPercentage: 40,
      filters: [
        {
          property: 'user.level',
          operator: 'is_not',
          value: 'beginner',
        },
      ],
    },
  },
  PUSH_NOTIFICATIONS_V3: {
    key: 'push-notification-service-v3',
    description: 'New push notification service with FCM migration',
    targeting: {
      rolloutPercentage: 100,
    },
  },
};
