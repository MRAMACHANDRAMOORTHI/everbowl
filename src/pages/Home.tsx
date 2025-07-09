import React from 'react';
import { Layout } from '../components/common/Layout';
import Hero from '../components/home/Hero';
import WhyEverBowl from '../components/home/WhyEverBowl';
import MenuPreview from '../components/home/MenuPreview';
import FeedbackForm from '../components/feedback/FeedbackForm';

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <WhyEverBowl />
      <MenuPreview />
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeedbackForm />
        </div>
      </section>
    </Layout>
  );
};

export default Home;