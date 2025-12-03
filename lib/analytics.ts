import ReactGA from 'react-ga4';

// Initialize GA4 - Replace with your Measurement ID
// Format: G-XXXXXXXXXX
export const GA_MEASUREMENT_ID = 'G-PLACEHOLDER';

export const initGA = () => {
    // Only initialize if ID is set and not a placeholder
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-PLACEHOLDER') {
        ReactGA.initialize(GA_MEASUREMENT_ID);
    }
};

export const logPageView = () => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-PLACEHOLDER') {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }
};

export const logEvent = (category: string, action: string, label?: string) => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-PLACEHOLDER') {
        ReactGA.event({
            category,
            action,
            label,
        });
    }
};
