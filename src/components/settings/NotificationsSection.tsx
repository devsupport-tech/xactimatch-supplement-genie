
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationsSection = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved successfully."
    });
  };

  return (
    <Card id="notifications">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how you want to be notified about updates and events
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emailNotifications">Email notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email about project updates
            </p>
          </div>
          <Switch 
            id="emailNotifications" 
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="pushNotifications">Push notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications on your device when online
            </p>
          </div>
          <Switch 
            id="pushNotifications" 
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveNotifications}>Save preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsSection;
