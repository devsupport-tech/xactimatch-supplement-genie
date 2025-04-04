
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TeamManagementDialog = ({ open, onOpenChange }: TeamManagementDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Team</DialogTitle>
          <DialogDescription>
            Add or remove team members and manage their permissions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            {[
              { name: "John Doe", role: "Admin", avatar: "JD" },
              { name: "Jane Smith", role: "Editor", avatar: "JS" },
              { name: "Robert Johnson", role: "Viewer", avatar: "RJ" }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between border border-border/60 p-3 rounded-md">
                <div className="flex gap-3 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            ))}
          </div>
          
          <Separator className="my-1" />
          
          <div className="grid gap-2">
            <Label htmlFor="email">Add team member</Label>
            <div className="flex gap-2">
              <Input id="email" placeholder="Email address" className="flex-1" />
              <Button>Add</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
