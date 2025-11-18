// Analytics tracking utilities

// Declare gtag types
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log(`Analytics: ${eventName}`, eventParams);
  }
};

// Funnel step tracking
export const trackFunnelStep = (step: string, metadata?: Record<string, any>) => {
  trackEvent('funnel_step', {
    step_name: step,
    ...metadata,
  });
};

// Conversion funnel events
export const analytics = {
  // Homepage events
  formStarted: (vehicleType: 'vin' | 'rego') => {
    trackEvent('form_started', { vehicle_type: vehicleType });
  },

  formSubmitted: (vehicleType: 'vin' | 'rego', vehicleId: string) => {
    trackEvent('form_submitted', {
      vehicle_type: vehicleType,
      vehicle_id: vehicleId,
    });
    trackFunnelStep('form_submitted', { vehicle_type: vehicleType });
  },

  // Checkout page events
  checkoutViewed: (vehicleInfo: any) => {
    trackEvent('checkout_viewed', { vehicle_info: vehicleInfo });
    trackFunnelStep('checkout_viewed');
  },

  emailEntered: () => {
    trackEvent('email_entered');
    trackFunnelStep('email_entered');
  },

  paymentButtonClicked: (emailProvided: boolean) => {
    trackEvent('payment_button_clicked', { email_provided: emailProvided });
    trackFunnelStep('payment_button_clicked');
  },

  // Stripe checkout
  redirectedToStripe: () => {
    trackEvent('redirected_to_stripe');
    trackFunnelStep('redirected_to_stripe');
  },

  // Success
  purchaseCompleted: (sessionId: string) => {
    trackEvent('purchase_completed', { session_id: sessionId });
    trackFunnelStep('purchase_completed');
  },

  // Drop-off tracking
  pageExit: (pageName: string, timeOnPage: number) => {
    trackEvent('page_exit', {
      page_name: pageName,
      time_on_page_seconds: Math.round(timeOnPage / 1000),
    });
  },
};
