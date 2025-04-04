import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  User, 
  Shield, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  UserCog,
  AlertTriangle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

// Define user types
type UserRole = 'admin' | 'user' | 'viewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'inactive';
  dateAdded: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    dateAdded: '2023-06-12'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    dateAdded: '2023-07-03'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'viewer',
    status: 'active',
    dateAdded: '2023-08-15'
  },
  {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'user',
    status: 'pending',
    dateAdded: '2023-10-02'
  }
];

const roleDescriptions = {
  admin: 'Full access to all features, including user management and system settings',
  user: 'Can create, edit, and manage projects, supplements, and documents',
  viewer: 'Read-only access to projects and documents they are assigned to'
};

const UsersSection = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleAddUser = () => {
    if (!name || !email) {
      toast({
        variant: "destructive",
        title: "Required fields",
        description: "Please fill in all required fields",
      });
      return;
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      role,
      status: 'pending',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);
    
    toast({
      title: "User invited",
      description: `Invitation sent to ${email}`,
    });
    
    setName('');
    setEmail('');
    setRole('user');
    setDialogOpen(false);
  };

  const handleUpdateUser = () => {
    if (!editingUser || !name || !email) {
      toast({
        variant: "destructive",
        title: "Required fields",
        description: "Please fill in all required fields",
      });
      return;
    }

    const updatedUsers = users.map(user => 
      user.id === editingUser.id ? 
      { ...user, name, email, role } : 
      user
    );

    setUsers(updatedUsers);
    
    toast({
      title: "User updated",
      description: `${name}'s information has been updated`,
    });
    
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('user');
    setDialogOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    toast({
      title: "User removed",
      description: "The user has been removed successfully",
    });
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "Role updated",
      description: `User role has been updated to ${newRole}`,
    });
  };

  const handleChangeStatus = (userId: string, newStatus: 'active' | 'inactive') => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "Status updated",
      description: `User status has been set to ${newStatus}`,
    });
  };

  const openRoleDialog = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setRoleDialogOpen(true);
  };

  const handleRoleChange = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? { ...user, role: selectedRole } : user
    );
    
    setUsers(updatedUsers);
    setRoleDialogOpen(false);
    
    toast({
      title: "Role updated",
      description: `${selectedUser.name}'s role has been updated to ${selectedRole}`,
    });
  };

  const confirmDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const executeDelete = () => {
    if (!userToDelete) return;
    
    const updatedUsers = users.filter(user => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    setDeleteDialogOpen(false);
    
    toast({
      title: "User removed",
      description: `${userToDelete.name} has been removed from the organization`,
    });
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20';
      case 'user':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20';
      case 'viewer':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20';
      default:
        return '';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20';
      case 'pending':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20';
      case 'inactive':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Users & Permissions</h2>
        <p className="text-muted-foreground">
          Manage user access and permissions for your organization
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Badge variant="outline" className="mr-2">
            {users.length} Users
          </Badge>
          <Badge variant="outline" className="mr-2">
            {users.filter(u => u.role === 'admin').length} Admins
          </Badge>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingUser(null);
              setName('');
              setEmail('');
              setRole('user');
            }}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? 'Update user information and permissions' 
                  : 'Invite a new team member to join your workspace'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter user name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      Admin
                    </SelectItem>
                    <SelectItem value="user">
                      User
                    </SelectItem>
                    <SelectItem value="viewer">
                      Viewer
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <p className="text-xs text-muted-foreground mt-2">
                  {roleDescriptions[role]}
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={editingUser ? handleUpdateUser : handleAddUser}>
                {editingUser ? 'Update User' : 'Invite User'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage users and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id} 
                  className="cursor-pointer hover:bg-muted/80"
                  onClick={() => openRoleDialog(user)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-normal border-0 ${getRoleBadgeColor(user.role)}`}
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-normal border-0 ${getStatusBadgeColor(user.status)}`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.dateAdded).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleEditUser(user);
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            openRoleDialog(user);
                          }}
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChangeStatus(
                              user.id, 
                              user.status === 'active' ? 'inactive' : 'active'
                            );
                          }}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(user);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              {selectedUser ? `Update role for ${selectedUser.name}` : 'Update user role'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            {selectedUser && (
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{selectedUser.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    Admin
                  </SelectItem>
                  <SelectItem value="user">
                    User
                  </SelectItem>
                  <SelectItem value="viewer">
                    Viewer
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <p className="text-xs text-muted-foreground mt-2">
                {roleDescriptions[selectedRole]}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRoleChange}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {userToDelete?.name} from your organization? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Remove User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding the access levels for each role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-md border">
              <div className="flex items-center mb-2">
                <Badge
                  variant="outline"
                  className="mr-2 font-normal border-0 bg-red-50 text-red-700 dark:bg-red-900/20"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Admin
                </Badge>
              </div>
              <p className="text-sm">{roleDescriptions.admin}</p>
            </div>
            
            <div className="p-4 rounded-md border">
              <div className="flex items-center mb-2">
                <Badge
                  variant="outline"
                  className="mr-2 font-normal border-0 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  User
                </Badge>
              </div>
              <p className="text-sm">{roleDescriptions.user}</p>
            </div>
            
            <div className="p-4 rounded-md border">
              <div className="flex items-center mb-2">
                <Badge
                  variant="outline"
                  className="mr-2 font-normal border-0 bg-gray-50 text-gray-700 dark:bg-gray-900/20"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Viewer
                </Badge>
              </div>
              <p className="text-sm">{roleDescriptions.viewer}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          Note: Only users with Admin roles can modify user permissions and invite new members.
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsersSection;
