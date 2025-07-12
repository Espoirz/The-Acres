import React from "react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Crown, Lock, Sparkles, ArrowRight } from "lucide-react";

interface PremiumPromptProps {
  feature: string;
  description: string;
  benefit: string;
  className?: string;
}

export function PremiumPrompt({
  feature,
  description,
  benefit,
  className = "",
}: PremiumPromptProps) {
  return (
    <Card
      className={`border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lock className="w-5 h-5 text-amber-600" />
          <span>Premium Feature</span>
          <Badge className="bg-amber-100 text-amber-800 ml-auto">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-amber-900 mb-2">{feature}</h3>
          <p className="text-sm text-amber-700 mb-3">{description}</p>
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-amber-800">{benefit}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/premium" className="flex-1">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="text-xs text-amber-600 text-center">
          Starting at $5/month or 20 gems
        </div>
      </CardContent>
    </Card>
  );
}

interface PremiumBannerProps {
  feature: string;
  currentLimit: number;
  premiumLimit: number;
  itemType: string;
}

export function PremiumBanner({
  feature,
  currentLimit,
  premiumLimit,
  itemType,
}: PremiumBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="w-6 h-6 text-amber-600" />
          <div>
            <div className="font-semibold text-amber-900">{feature}</div>
            <div className="text-sm text-amber-700">
              You have {currentLimit} {itemType}. Premium users get{" "}
              {premiumLimit}!
            </div>
          </div>
        </div>
        <Link href="/premium">
          <Button
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface FeatureLockedProps {
  feature: string;
  description: string;
}

export function FeatureLocked({ feature, description }: FeatureLockedProps) {
  return (
    <div className="text-center py-12 px-6">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-amber-600" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{feature}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      <Link href="/premium">
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Crown className="w-4 h-4 mr-2" />
          Unlock with Premium
        </Button>
      </Link>
    </div>
  );
}
