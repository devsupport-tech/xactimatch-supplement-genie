
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, BarChart, PenTool, PieChart, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Simplify Your <span className="text-primary">Xactimate</span> Supplemental Process
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-md md:max-w-lg">
                Automatically compare estimates, identify changes, and generate supplemental requests with precision and ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/30 to-accent/30 blur-lg"></div>
                <Card className="relative glass-card p-6 border border-muted">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">ClaimTrak</h3>
                    </div>
                    <span className="text-sm text-muted-foreground">Supplemental #42</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
                  </div>
                  <Separator className="my-6" />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Total Added:</div>
                    <div className="font-medium">$2,457.89</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How ClaimTrak Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform streamlines every step of the supplemental process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <FileText className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">PDF Processing</h3>
              <p className="text-muted-foreground">
                Upload Xactimate PDFs and automatically extract all line items, quantities, and prices.
              </p>
            </Card>

            <Card className="p-6 border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <BarChart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comparison Engine</h3>
              <p className="text-muted-foreground">
                Compare new reports against previous versions to identify added, removed, and modified line items.
              </p>
            </Card>

            <Card className="p-6 border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <FileCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Form Generation</h3>
              <p className="text-muted-foreground">
                Automatically generate supplemental request forms showing all changes in an easy-to-understand format.
              </p>
            </Card>

            <Card className="p-6 border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <PieChart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Data Visualization</h3>
              <p className="text-muted-foreground">
                View interactive charts breaking down costs by category and tracking changes across versions.
              </p>
            </Card>

            <Card className="p-6 border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <PenTool className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Annotations</h3>
              <p className="text-muted-foreground">
                Add notes, comments, and supporting documentation to specific line items or changes.
              </p>
            </Card>

            <Card className="p-6 border-border/40 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center items-center h-10 w-10 rounded-md bg-primary text-primary-foreground mb-4">
                <span className="font-bold">+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">And More</h3>
              <p className="text-muted-foreground">
                Document management, project organization, and powerful export options for all your needs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
            <div className="relative p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Ready to transform your supplemental workflow?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of contractors who are saving time and increasing approval rates with ClaimTrak.
              </p>
              <Button size="lg" className="font-medium" asChild>
                <Link to="/dashboard">
                  Start Your First Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
