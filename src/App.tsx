import { useEffect } from 'react';
import SolutionsHomePage from './pages/Home/SolutionsHomePage';
import { trackMarketingEvent } from './lib/marketingCapture';

export default function App() {
  useEffect(() => {
    void trackMarketingEvent({
      eventType: 'VIEW',
      actionCode: 'page:home',
      actionLabel: document.title,
      category: 'NAVIGATION',
    });
  }, []);

  return <SolutionsHomePage />;
}
