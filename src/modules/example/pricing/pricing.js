import { LightningElement, api } from 'lwc';

export default class Pricing extends LightningElement {
  @api plans = [
    {
      title: "Basic",
      description: "The essentials of cloud computing",
      currency: "USD",
      frequency: "Monthly",
      price: 50,
      features: [
        "1 GB of cloud storage",
        "5 projects",
        "Up to 5 users",
        "48-hour support"
      ],
      cta: "Get started"
    },
    {
      title: "Plus",
      popular: true,
      description: "A plan that is more than just cloud computing",
      currency: "USD",
      frequency: "Monthly",
      price: 100,
      features: [
        "5 GB of cloud storage",
        "25 projects",
        "Up to 50 users",
        "24-hour support response",
        "Marketing automation"
      ],
      cta: "Get started"
    },
    {
      title: "Pro",
      description: "Dedicated cloud computing for your business",
      currency: "USD",
      frequency: "Monthly",
      price: 150,
      features: [
        "5 GB of cloud storage",
        "25 projects",
        "Up to 50 users",
        "24-hour support response",
        "Marketing automation",
        "24/7 support",
        "100% uptime",
        "Salesforce marketo integration support, and more"
      ],
      cta: "Get started"
    }

  ];
}
