import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf, Heart, Users, Award } from "lucide-react";
import { Layout } from "../components/common/Layout";

export const About: FC = () => {
  return (
    <Layout>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-emerald-600">Story</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Born in Peelamedu, Ever Bowl was founded to bring truly healthy,
                delicious organic food to everyone. From smoothie bowls to
                cold-pressed juices, every item is crafted with care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  We believe that healthy eating shouldn't be complicated or
                  compromise on taste. Our mission is to make organic,
                  nutritious food accessible to everyone while supporting local
                  farmers and sustainable practices.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        100% Organic
                      </div>
                      <div className="text-sm text-gray-600">
                        Certified ingredients
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Made with Love
                      </div>
                      <div className="text-sm text-gray-600">
                        Hand-crafted daily
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our kitchen"
                  className="rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600">What drives us every day</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Community First",
                  description:
                    "Supporting local farmers and building stronger communities through sustainable partnerships.",
                },
                {
                  icon: Award,
                  title: "Quality Excellence",
                  description:
                    "Never compromising on quality. Every ingredient is carefully selected and every bowl is crafted to perfection.",
                },
                {
                  icon: Heart,
                  title: "Health & Wellness",
                  description:
                    "Promoting healthy living through nutritious, delicious food that nourishes body and soul.",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600">
                The passionate people behind Ever Bowl
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sanjay Periyasamy",
                  role: "Founder & CEO",
                  image:
                    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
                  description:
                    "Visionary leader with a of experience in nutrition and organic food innovation, driving Ever Bowl’s mission for healthy living.",
                },
                {
                  name: "Ramachandramoorthi",
                  role: "CTO & Co-Founder",
                  image:
                    "https://wjkpvnyjfltgvaxpifnv.supabase.co/storage/v1/object/sign/images/msr.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMGQ3MTkyZS0yMTYzLTRhYzgtOGE1ZS1jZjM2YzVkZWZlOTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbXNyLmpwZyIsImlhdCI6MTc1MTk3NTQ3MCwiZXhwIjo3MDg3MTk3NTQ3MH0.rI4RPzuw1R8uNqQrFjHl0Yf9MwYyg3nurDzu5ZEPgjo",
                  description:
                    "Tech architect building Ever Bowl’s digital backbone, with deep expertise in full-stack development and real-time platform engineering.",
                },
                {
                  name: "Sanmuga Sudhan",
                  role: "Operations Manager",
                  image:
                    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
                  description:
                    "Specialist in supply chain and logistics, ensuring sustainable sourcing and efficient operations across Ever Bowl’s kitchen network.",
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
