
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Settings as SettingsIcon } from 'lucide-react';

const AdvancedSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <Card id="advanced">
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Configure advanced options for XactiMatch
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">
              Data Storage Options
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="localData" />
                <Label htmlFor="localData">Store data locally</Label>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep a local copy of your data for faster access
              </p>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="exportRegularly" defaultChecked />
                <Label htmlFor="exportRegularly">Automatic data backup</Label>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Create regular backups of your project data
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default AdvancedSection;
