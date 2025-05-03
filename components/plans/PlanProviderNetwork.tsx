'use client';

import { Plan } from '@/types/plans';
import { Network, Search, MapPin, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface PlanProviderNetworkProps {
  plan: Plan;
}

export default function PlanProviderNetwork({ plan }: PlanProviderNetworkProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const getNetworkDescription = () => {
    switch (plan.networkType) {
      case 'PPO':
        return "This plan uses a Preferred Provider Organization network. You'll pay less when using in-network providers.";
      case 'Open':
        return "This plan allows you to visit any provider of your choice with no network restrictions.";
      case 'Limited':
        return "This plan has a limited provider network. Check with the healthshare before visiting a provider.";
      default:
        return "Network information not available.";
    }
  };
  
  const getNetworkIcon = () => {
    switch (plan.networkType) {
      case 'PPO':
        return <Network className="h-10 w-10 text-blue-600" />;
      case 'Open':
        return <Check className="h-10 w-10 text-green-600" />;
      case 'Limited':
        return <Users className="h-10 w-10 text-amber-600" />;
      default:
        return <Network className="h-10 w-10 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="mr-4">
            {getNetworkIcon()}
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">{plan.networkType} Network</h3>
            <p className="text-gray-700">
              {getNetworkDescription()}
            </p>
            {plan.networkDetails && (
              <p className="mt-2 text-gray-700">
                {plan.networkDetails}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Find a Provider</h3>
        <p className="text-gray-700 mb-4">
          Search for providers in your area that may work with this healthshare.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Doctor name or specialty" 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative sm:w-64">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="Zip code" className="pl-10" />
          </div>
          <Button type="button" className="shrink-0">
            Search
          </Button>
        </div>
        
        <div className="text-center p-6 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-600">
            Please note that the provider directory is for reference only. We recommend verifying with the healthshare that your preferred provider is eligible before receiving care.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.open(plan.websiteUrl, '_blank')}
            disabled={!plan.websiteUrl}
          >
            Visit Healthshare Website
          </Button>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-md font-medium text-blue-800 mb-2">Provider Tips</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
            <span>Always mention you're a member of a healthshare when scheduling appointments.</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
            <span>Ask for cash-pay or self-pay rates, which are often lower than insurance rates.</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
            <span>Get cost estimates in writing before procedures when possible.</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 