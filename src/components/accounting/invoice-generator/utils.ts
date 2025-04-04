
/**
 * Format currency value as USD
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Calculate fees based on original estimate and supplement amount
 */
export const calculateFees = (
  originalEstimate: number,
  supplementAmount: number,
  baseRate: number,
  percentageFee: number
) => {
  const difference = supplementAmount - originalEstimate;
  const isDifference = difference > 0;
  
  const calculatedPercentageFee = isDifference ? 
    (difference * (percentageFee / 100)) : 
    (supplementAmount * (percentageFee / 100));
  
  const subtotal = baseRate + calculatedPercentageFee;
  const tax = subtotal * 0.0; // No tax for this example
  const total = subtotal + tax;

  return {
    originalEstimate,
    supplementAmount,
    difference,
    baseRate,
    percentageFee: calculatedPercentageFee,
    subtotal,
    tax,
    total
  };
};
