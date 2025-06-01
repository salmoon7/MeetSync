import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    title: "Starter",
    price: "Free",
    description: "Perfect for individuals or small teams getting started.",
    features: ["1 Host", "Unlimited 1-on-1 Meetings", "Limited Group Calls"],
    bgColor: "bg-white",
    textColor: "text-gray-900",
    highlight: false,
  },
  {
    title: "Pro",
    price: "$9.99/mo",
    description:
      "For professionals needing advanced features and integrations.",
    features: [
      "Up to 10 Hosts",
      "Group Meetings (100+)",
      "Cloud Recordings",
      "Priority Support",
    ],
    bgColor: "bg-blue-900",
    textColor: "text-white",
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Custom solutions tailored for your business.",
    features: [
      "Unlimited Hosts",
      "SLA & Security Compliance",
      "Dedicated Manager",
      "Integrations",
    ],
    bgColor: "bg-white",
    textColor: "text-gray-900",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-gray-50 py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Choose a plan that works for your team — scale as you grow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-md hover:shadow-xl transition duration-300 p-8 relative border ${
                plan.highlight ? "scale-105 z-10" : ""
              } ${plan.bgColor} ${plan.textColor}`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-yellow-300 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <p className="text-3xl font-semibold mb-4">{plan.price}</p>
              <p className="text-sm mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className={`text-green-500`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-semibold transition ${
                  plan.highlight
                    ? "bg-white text-blue-900 hover:bg-gray-100"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
