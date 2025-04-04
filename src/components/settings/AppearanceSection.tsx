
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

const AppearanceSection = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card id="appearance">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how ClaimTrak looks on your device
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Tabs defaultValue={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="light">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </TabsTrigger>
              <TabsTrigger value="dark">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSection;
