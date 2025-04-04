
// Web Worker for intensive financial calculations

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  try {
    const { id, type, payload } = event.data;
    
    let result;
    
    // Handle different types of calculations
    switch (type) {
      case 'calculateSupplementTotals':
        result = calculateSupplementTotals(payload);
        break;
      case 'analyzeTrends':
        result = analyzeTrends(payload);
        break;
      case 'generateProjectReport':
        result = generateProjectReport(payload);
        break;
      default:
        throw new Error(`Unknown calculation type: ${type}`);
    }
    
    // Send the result back to the main thread
    self.postMessage({
      id,
      result
    });
  } catch (error) {
    // Handle errors and send them back to the main thread
    self.postMessage({
      id: event.data.id,
      error: error.message || 'Unknown error in web worker'
    });
  }
});

/**
 * Calculate supplement totals and statistics
 */
function calculateSupplementTotals(supplements) {
  // Simulate complex calculation
  const totalAmount = supplements.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  
  // Group by category
  const categoryTotals = {};
  supplements.forEach(item => {
    const category = item.category || 'uncategorized';
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += parseFloat(item.amount) || 0;
  });
  
  // Calculate month-over-month changes
  const monthlyData = supplements.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = 0;
    }
    
    acc[monthKey] += parseFloat(item.amount) || 0;
    return acc;
  }, {});
  
  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyData).sort();
  const monthlyTotals = sortedMonths.map(month => ({
    month,
    total: monthlyData[month]
  }));
  
  return {
    totalAmount,
    categoryTotals,
    monthlyTotals,
  };
}

/**
 * Analyze project trends from historical data
 */
function analyzeTrends(projects) {
  // Simulate intensive data analysis
  
  // Group projects by status
  const statusGroups = projects.reduce((acc, project) => {
    const status = project.status || 'unknown';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(project);
    return acc;
  }, {});
  
  // Calculate average duration by project type
  const projectTypeData = projects.reduce((acc, project) => {
    const type = project.type || 'unknown';
    if (!acc[type]) {
      acc[type] = { total: 0, count: 0, amounts: [] };
    }
    
    acc[type].count++;
    acc[type].amounts.push(parseFloat(project.totalAmount) || 0);
    
    if (project.startDate && project.completionDate) {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.completionDate);
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24); // days
      if (!isNaN(duration) && duration > 0) {
        if (!acc[type].durations) acc[type].durations = [];
        acc[type].durations.push(duration);
      }
    }
    
    return acc;
  }, {});
  
  // Calculate averages and medians
  Object.keys(projectTypeData).forEach(type => {
    const data = projectTypeData[type];
    
    // Calculate average amount
    data.averageAmount = data.amounts.reduce((sum, amount) => sum + amount, 0) / data.count;
    
    // Calculate median amount
    const sortedAmounts = [...data.amounts].sort((a, b) => a - b);
    const midIndex = Math.floor(sortedAmounts.length / 2);
    data.medianAmount = sortedAmounts.length % 2 === 0
      ? (sortedAmounts[midIndex - 1] + sortedAmounts[midIndex]) / 2
      : sortedAmounts[midIndex];
    
    // Calculate average duration if available
    if (data.durations && data.durations.length) {
      data.averageDuration = data.durations.reduce((sum, dur) => sum + dur, 0) / data.durations.length;
    }
    
    // Clean up the return object
    delete data.amounts;
    delete data.durations;
  });
  
  return {
    statusCounts: Object.keys(statusGroups).reduce((acc, status) => {
      acc[status] = statusGroups[status].length;
      return acc;
    }, {}),
    projectTypeStats: projectTypeData,
    totalProjects: projects.length
  };
}

/**
 * Generate comprehensive project report
 */
function generateProjectReport(data) {
  const { project, supplements, lineItems } = data;
  
  // Simulate heavy calculation for comprehensive report
  
  // Process line items
  const lineItemsTotal = lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const lineItemsByCategory = lineItems.reduce((acc, item) => {
    const category = item.category || 'uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
  
  // Process supplements
  const supplementsTotal = supplements.reduce((sum, supp) => sum + (parseFloat(supp.amount) || 0), 0);
  
  // Calculate profit margins
  const originalAmount = parseFloat(project.originalAmount) || 0;
  const totalWithSupplements = originalAmount + supplementsTotal;
  const profitMargin = ((totalWithSupplements - lineItemsTotal) / totalWithSupplements) * 100;
  
  // Generate summary statistics
  const summary = {
    projectTitle: project.title,
    clientName: project.clientName,
    originalAmount,
    supplementsTotal,
    lineItemsTotal,
    totalAmount: totalWithSupplements,
    profitMargin,
    lineItemCategories: Object.keys(lineItemsByCategory).map(category => ({
      category,
      count: lineItemsByCategory[category].length,
      total: lineItemsByCategory[category].reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0),
    })),
    status: project.status,
    lastUpdated: new Date().toISOString(),
  };
  
  return summary;
}
