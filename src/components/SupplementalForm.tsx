
import { useState } from 'react';
import { FileText, Clipboard, Download, Send, ArrowRight, Plus, Check, Upload, Paperclip, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface SupplementItem {
  id: string;
  code: string;
  description: string;
  changeType: 'added' | 'removed' | 'modified';
  previousAmount?: number;
  newAmount?: number;
  difference?: number;
}

interface SupplementalFormProps {
  projectName?: string;
  claimNumber?: string;
  policyNumber?: string;
  adjusterName?: string;
  adjusterEmail?: string;
  items?: SupplementItem[];
  totalAmount?: number;
  className?: string;
  onSubmit?: (formData: any) => void;
}

const SupplementalForm = ({
  projectName = '',
  claimNumber = '',
  policyNumber = '',
  adjusterName = '',
  adjusterEmail = '',
  items = [],
  totalAmount = 0,
  className,
  onSubmit
}: SupplementalFormProps) => {
  const [formData, setFormData] = useState({
    projectName,
    claimNumber,
    policyNumber,
    adjusterName,
    adjusterEmail,
    supplementReason: '',
    additionalNotes: '',
    requestType: 'email',
    items,
    totalAmount
  });
  
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Generate PDF for download
  const handleDownload = () => {
    setIsSaving(true);
    
    // Simulate PDF generation with timeout
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Supplemental request saved",
        description: "Your request has been saved as a PDF",
      });
    }, 1500);
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    const formattedText = `
SUPPLEMENTAL REQUEST

Project: ${formData.projectName}
Claim #: ${formData.claimNumber}
Policy #: ${formData.policyNumber}
Adjuster: ${formData.adjusterName}

Reason for Supplement:
${formData.supplementReason}

Changes:
${formData.items.map(item => 
  `- ${item.code}: ${item.description} (${item.changeType})\n  ${
    item.changeType === 'modified' 
      ? `Previous: ${formatCurrency(item.previousAmount || 0)}, New: ${formatCurrency(item.newAmount || 0)}, Difference: ${formatCurrency(item.difference || 0)}`
      : item.changeType === 'added'
        ? `Amount: ${formatCurrency(item.newAmount || 0)}`
        : `Amount: ${formatCurrency(item.previousAmount || 0)}`
  }`
).join('\n')}

Total Supplemental Amount: ${formatCurrency(formData.totalAmount)}

Additional Notes:
${formData.additionalNotes}
    `.trim();
    
    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Supplemental request has been copied to your clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Send via email
  const handleSend = () => {
    setIsSending(true);
    
    // Validate form
    if (!formData.supplementReason) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide a reason for the supplement request",
      });
      setIsSending(false);
      return;
    }
    
    // Simulate sending with timeout
    setTimeout(() => {
      setIsSending(false);
      
      if (onSubmit) {
        onSubmit({
          ...formData,
          attachedFiles: attachedFiles.map(file => file.name)
        });
      }
      
      toast({
        title: "Supplemental request sent",
        description: `Your request has been sent to the adjuster with ${attachedFiles.length} attachment(s)`,
      });
    }, 2000);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files attached",
        description: `${newFiles.length} file(s) attached to the request`,
      });
    }
  };

  // Remove attached file
  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Supplemental Request Form</CardTitle>
        <CardDescription>
          Complete this form to generate a supplemental request
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="claimNumber">Claim Number</Label>
            <Input
              id="claimNumber"
              value={formData.claimNumber}
              onChange={(e) => handleInputChange('claimNumber', e.target.value)}
              placeholder="Enter claim number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="policyNumber">Policy Number</Label>
            <Input
              id="policyNumber"
              value={formData.policyNumber}
              onChange={(e) => handleInputChange('policyNumber', e.target.value)}
              placeholder="Enter policy number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="adjusterName">Adjuster Name</Label>
            <Input
              id="adjusterName"
              value={formData.adjusterName}
              onChange={(e) => handleInputChange('adjusterName', e.target.value)}
              placeholder="Enter adjuster name"
            />
          </div>
          
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="adjusterEmail">Adjuster Email</Label>
            <Input
              id="adjusterEmail"
              type="email"
              value={formData.adjusterEmail}
              onChange={(e) => handleInputChange('adjusterEmail', e.target.value)}
              placeholder="Enter adjuster email"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="supplementReason" className="text-base font-medium">
            Reason for Supplement <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="supplementReason"
            value={formData.supplementReason}
            onChange={(e) => handleInputChange('supplementReason', e.target.value)}
            placeholder="Explain why this supplement is needed"
            className="min-h-[100px]"
            required
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-medium">Selected Changes</Label>
            <div className="text-sm text-muted-foreground">
              {items.length} items • Total: {formatCurrency(totalAmount)}
            </div>
          </div>
          
          <Card className="border border-border/80">
            <div className="max-h-[200px] overflow-y-auto">
              {items.length > 0 ? (
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-3 flex justify-between items-center">
                      <div className="min-w-0">
                        <div className="flex items-center">
                          {item.changeType === 'added' ? (
                            <span className="mr-2 text-green-500 flex-shrink-0">
                              <Plus className="h-4 w-4" />
                            </span>
                          ) : item.changeType === 'removed' ? (
                            <span className="mr-2 text-red-500 flex-shrink-0">-</span>
                          ) : (
                            <span className="mr-2 text-blue-500 flex-shrink-0">~</span>
                          )}
                          <span className="font-medium mr-2 truncate">{item.code}</span>
                          <span className="text-sm text-muted-foreground truncate">{item.description}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm font-medium ml-2 flex-shrink-0">
                        {item.changeType === 'modified' && item.difference ? (
                          <span className={item.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                            {item.difference > 0 ? '+' : ''}
                            {formatCurrency(item.difference)}
                          </span>
                        ) : item.changeType === 'added' && item.newAmount ? (
                          <span className="text-green-600">
                            +{formatCurrency(item.newAmount)}
                          </span>
                        ) : item.changeType === 'removed' && item.previousAmount ? (
                          <span className="text-red-600">
                            -{formatCurrency(item.previousAmount)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No items selected. Please go back and select items from the comparison view.
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* File Attachments Section */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Supporting Documents</Label>
          
          <div className="border border-dashed border-border/80 rounded-md p-4">
            <div className="flex flex-col items-center justify-center p-4 text-center gap-2">
              <Paperclip className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Attach supporting documents</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Upload PDF, images, ESX files, or other supporting documents
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('fileUpload')?.click()}
                className="mt-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Select Files
              </Button>
              <input 
                type="file" 
                id="fileUpload" 
                multiple 
                className="hidden" 
                onChange={handleFileUpload} 
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.esx,.xls,.xlsx"
              />
            </div>

            {attachedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Attached Files ({attachedFiles.length})</p>
                <div className="max-h-40 overflow-y-auto">
                  {attachedFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 bg-secondary/30 rounded-md mt-1 text-sm"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            placeholder="Any additional information or context"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="requestType">Request Type</Label>
          <Select
            value={formData.requestType}
            onValueChange={(value) => handleInputChange('requestType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email to Adjuster</SelectItem>
              <SelectItem value="pdf">Generate PDF</SelectItem>
              <SelectItem value="clipboard">Copy to Clipboard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={handleDownload}
          disabled={isSaving}
        >
          {isSaving ? (
            <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin mr-1" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Save as PDF
        </Button>
        
        <Button 
          className="w-full sm:w-auto ml-auto flex items-center gap-2 animated-button"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? (
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-1" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Send Request
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupplementalForm;
