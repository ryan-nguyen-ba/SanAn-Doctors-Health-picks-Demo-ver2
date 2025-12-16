"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SupplementWidgetProps {
  supplement: {
    id: string;
    name: string;
    imageUrl?: string;
    productCode?: string;
  };
}

export function SupplementWidget({ supplement }: SupplementWidgetProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Supplement Image Placeholder */}
          <div className="w-32 h-40 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 mb-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-3xl">💊</span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="font-bold text-sm mb-1 text-gray-900">
              健康には+ {supplement.name}
            </p>
            {supplement.productCode && (
              <p className="text-xs text-gray-500 font-mono">{supplement.productCode}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

