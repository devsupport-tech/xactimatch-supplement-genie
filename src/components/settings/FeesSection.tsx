
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, PercentIcon, Save, RotateCcw, Clock, Building } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Interface for the fee structure
interface FeeSettings {
  feeType: 'percentage' | 'flat' | 'mixed';
  flatFeeAmount: number;
  percentageFee: number;
  minimumFee: number;
  applyToAll: boolean;
  customProjectFees: {
    projectId: string;
    projectName: string;
    feeType: 'percentage' | 'flat';
    flatFeeAmount: number;
    percentageFee: number;
  }[];
}

const initialFeeSettings: FeeSettings = {
  feeType: 'percentage',
  flatFeeAmount: 750,
  percentageFee: 10,
  minimumFee: 500,
  applyToAll: true,
  customProjectFees: [
    {
      projectId: '1',
      projectName: 'Thompson Residence',
      feeType: 'flat',
      flatFeeAmount: 950,
      percentageFee: 0
    },
    {
      projectId: '2',
      projectName: 'Bayview Commercial',
      feeType: 'percentage',
      flatFeeAmount: 0,
      percentageFee: 12
    }
  ]
};

const FeesSection = () => {
  const [feeSettings, setFeeSettings] = useState<FeeSettings>(initialFeeSettings);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const handleFeeTypeChange = (value: 'percentage' | 'flat' | 'mixed') => {
    setFeeSettings({ ...feeSettings, feeType: value });
    setHasPendingChanges(true);
  };

  const handleFlatFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setFeeSettings({ ...feeSettings, flatFeeAmount: value });
    setHasPendingChanges(true);
  };

  const handlePercentageFeeChange = (values: number[]) => {
    setFeeSettings({ ...feeSettings, percentageFee: values[0] });
    setHasPendingChanges(true);
  };

  const handleMinimumFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setFeeSettings({ ...feeSettings, minimumFee: value });
    setHasPendingChanges(true);
  };

  const handleApplyToAllChange = (checked: boolean) => {
    setFeeSettings({ ...feeSettings, applyToAll: checked });
    setHasPendingChanges(true);
  };

  const handleCustomProjectFeeChange = (projectId: string, field: string, value: any) => {
    const updatedCustomFees = feeSettings.customProjectFees.map(fee => {
      if (fee.projectId === projectId) {
        return { ...fee, [field]: value };
      }
      return fee;
    });
    
    setFeeSettings({ ...feeSettings, customProjectFees: updatedCustomFees });
    setHasPendingChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database or API
    toast({
      title: "Fee settings saved",
      description: "Your fee structure changes have been applied",
    });
    setHasPendingChanges(false);
  };

  const handleResetChanges = () => {
    setFeeSettings(initialFeeSettings);
    setHasPendingChanges(false);
    toast({
      title: "Changes reset",
      description: "Fee settings have been reset to their original values",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Fee Settings</h2>
        <p className="text-muted-foreground">
          Configure how fees are calculated for your projects and supplements
        </p>
      </div>

      <Tabs defaultValue="global">
        <TabsList className="mb-4">
          <TabsTrigger value="global">
            Global Fee Structure
          </TabsTrigger>
          <TabsTrigger value="custom">
            Custom Project Fees
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="global">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Default Fee Structure
              </CardTitle>
              <CardDescription>
                Set the default fee structure applied to all projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Fee Type</Label>
                  <RadioGroup 
                    value={feeSettings.feeType} 
                    onValueChange={(value) => handleFeeTypeChange(value as 'percentage' | 'flat' | 'mixed')}
                    className="flex flex-col space-y-3 mt-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage" className="font-normal flex items-center">
                        <PercentIcon className="h-4 w-4 mr-2" />
                        Percentage of Claim Value
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flat" id="flat" />
                      <Label htmlFor="flat" className="font-normal flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Flat Fee
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="mixed" />
                      <Label htmlFor="mixed" className="font-normal flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Mixed (Percentage with Minimum Fee)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                {(feeSettings.feeType === 'flat' || feeSettings.feeType === 'mixed') && (
                  <div className="space-y-2">
                    <Label htmlFor="flatFee">Flat Fee Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="flatFee"
                        type="number"
                        className="pl-8"
                        value={feeSettings.flatFeeAmount}
                        onChange={handleFlatFeeChange}
                      />
                    </div>
                    {feeSettings.feeType === 'flat' && (
                      <p className="text-sm text-muted-foreground">
                        A fixed amount of {formatCurrency(feeSettings.flatFeeAmount)} will be charged for each project/supplement.
                      </p>
                    )}
                  </div>
                )}
                
                {(feeSettings.feeType === 'percentage' || feeSettings.feeType === 'mixed') && (
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="percentageFee">Percentage Fee</Label>
                        <span className="text-sm font-medium">{feeSettings.percentageFee}%</span>
                      </div>
                      <Slider
                        id="percentageFee"
                        min={1}
                        max={30}
                        step={0.5}
                        value={[feeSettings.percentageFee]}
                        onValueChange={handlePercentageFeeChange}
                        className="mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        {feeSettings.percentageFee}% of the total claim value will be charged as a fee.
                      </p>
                    </div>
                    
                    {feeSettings.feeType === 'mixed' && (
                      <div className="space-y-2">
                        <Label htmlFor="minimumFee">Minimum Fee Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="minimumFee"
                            type="number"
                            className="pl-8"
                            value={feeSettings.minimumFee}
                            onChange={handleMinimumFeeChange}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          If the percentage fee calculates to less than {formatCurrency(feeSettings.minimumFee)}, the minimum fee will be applied instead.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="applyAll" className="text-base">Apply to All Projects</Label>
                    <p className="text-sm text-muted-foreground">
                      Use this fee structure for all projects unless overridden
                    </p>
                  </div>
                  <Switch
                    id="applyAll"
                    checked={feeSettings.applyToAll}
                    onCheckedChange={handleApplyToAllChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleResetChanges} disabled={!hasPendingChanges}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSaveChanges} disabled={!hasPendingChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fee Calculator</CardTitle>
              <CardDescription>
                See how your fees will be calculated based on your settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="claimValue">Example Claim Value</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="claimValue"
                      type="number"
                      className="pl-8"
                      defaultValue={10000}
                    />
                  </div>
                </div>
                
                <div className="p-4 rounded-md bg-muted/50 mt-4">
                  <h4 className="font-medium mb-2">Fee Calculation</h4>
                  <p className="text-sm mb-2">Based on a $10,000 claim value:</p>
                  
                  {feeSettings.feeType === 'percentage' && (
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Percentage Fee:</span> $10,000 × {feeSettings.percentageFee}% = {formatCurrency(10000 * (feeSettings.percentageFee / 100))}
                      </p>
                      <p className="text-lg font-medium mt-2">
                        Total Fee: {formatCurrency(10000 * (feeSettings.percentageFee / 100))}
                      </p>
                    </div>
                  )}
                  
                  {feeSettings.feeType === 'flat' && (
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Flat Fee:</span> {formatCurrency(feeSettings.flatFeeAmount)}
                      </p>
                      <p className="text-lg font-medium mt-2">
                        Total Fee: {formatCurrency(feeSettings.flatFeeAmount)}
                      </p>
                    </div>
                  )}
                  
                  {feeSettings.feeType === 'mixed' && (
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Percentage Fee:</span> $10,000 × {feeSettings.percentageFee}% = {formatCurrency(10000 * (feeSettings.percentageFee / 100))}
                      </p>
                      <p>
                        <span className="font-medium">Minimum Fee:</span> {formatCurrency(feeSettings.minimumFee)}
                      </p>
                      <p className="text-lg font-medium mt-2">
                        Total Fee: {formatCurrency(Math.max(10000 * (feeSettings.percentageFee / 100), feeSettings.minimumFee))}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {10000 * (feeSettings.percentageFee / 100) < feeSettings.minimumFee ? 
                          "The minimum fee applies because the percentage fee is lower." : 
                          "The percentage fee applies because it's higher than the minimum fee."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Custom Project Fee Overrides
              </CardTitle>
              <CardDescription>
                Set up custom fee structures for specific projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feeSettings.customProjectFees.length > 0 ? (
                <div className="space-y-4">
                  {feeSettings.customProjectFees.map((projectFee) => (
                    <Card key={projectFee.projectId} className="overflow-hidden">
                      <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="text-base">{projectFee.projectName}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm">Fee Type</Label>
                            <RadioGroup 
                              value={projectFee.feeType} 
                              onValueChange={(value) => handleCustomProjectFeeChange(
                                projectFee.projectId, 
                                'feeType', 
                                value as 'percentage' | 'flat'
                              )}
                              className="flex gap-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="percentage" id={`percentage-${projectFee.projectId}`} />
                                <Label htmlFor={`percentage-${projectFee.projectId}`} className="font-normal text-sm">
                                  Percentage
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="flat" id={`flat-${projectFee.projectId}`} />
                                <Label htmlFor={`flat-${projectFee.projectId}`} className="font-normal text-sm">
                                  Flat Fee
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          {projectFee.feeType === 'flat' ? (
                            <div className="space-y-2">
                              <Label htmlFor={`flatFee-${projectFee.projectId}`} className="text-sm">Flat Fee Amount</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id={`flatFee-${projectFee.projectId}`}
                                  type="number"
                                  className="pl-8"
                                  value={projectFee.flatFeeAmount}
                                  onChange={(e) => handleCustomProjectFeeChange(
                                    projectFee.projectId,
                                    'flatFeeAmount',
                                    e.target.value === '' ? 0 : parseFloat(e.target.value)
                                  )}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <Label htmlFor={`percentageFee-${projectFee.projectId}`} className="text-sm">Percentage Fee</Label>
                                <span className="text-sm font-medium">{projectFee.percentageFee}%</span>
                              </div>
                              <Slider
                                id={`percentageFee-${projectFee.projectId}`}
                                min={1}
                                max={30}
                                step={0.5}
                                value={[projectFee.percentageFee]}
                                onValueChange={(values) => handleCustomProjectFeeChange(
                                  projectFee.projectId,
                                  'percentageFee',
                                  values[0]
                                )}
                              />
                            </div>
                          )}
                          
                          <div className="text-sm bg-muted/50 p-3 rounded-md">
                            <span className="font-medium">Effective Fee: </span>
                            {projectFee.feeType === 'percentage' 
                              ? `${projectFee.percentageFee}% of claim value` 
                              : formatCurrency(projectFee.flatFeeAmount)
                            }
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No custom project fees configured
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleResetChanges} disabled={!hasPendingChanges}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSaveChanges} disabled={!hasPendingChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeesSection;
