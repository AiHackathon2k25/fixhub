import { AnalysisResult } from './types/analysis';

export function mockAnalysis(description: string): AnalysisResult {
  const lower = description.toLowerCase();

  if (lower.includes('dishwasher')) {
    return {
      category: 'appliance',
      subCategory: 'dishwasher',
      severity: 'moderate',
      estimatedCost: '600–900 DKK',
      repairOrReplace: 'repair',
      insuranceSummary:
        'Customer reports that the dishwasher door dropped open and now fails to close properly. The hinge appears bent and misaligned, but there are no signs of water leakage or electrical damage. Damage is consistent with a mechanical impact to the door and hinge assembly. A hinge replacement and alignment adjustment are likely sufficient to restore normal function.',
    };
  }

  if (lower.includes('phone') || lower.includes('screen')) {
    return {
      category: 'electronics',
      subCategory: 'smartphone',
      severity: 'severe',
      estimatedCost: '1200–2000 DKK',
      repairOrReplace: 'replace',
      insuranceSummary:
        'Customer reports that the smartphone was dropped, resulting in a cracked front display and impaired touch functionality. The device shows visible damage to the screen and may have internal component impact. Given the extent of the damage, full screen replacement or device replacement is recommended rather than minor repair.',
    };
  }

  if (lower.includes('leak') || lower.includes('water')) {
    return {
      category: 'plumbing',
      subCategory: 'pipe leak',
      severity: 'moderate',
      estimatedCost: '800–1500 DKK',
      repairOrReplace: 'repair',
      insuranceSummary:
        'Customer reports a localized water leak near a visible pipe connection. Moisture is present around the fitting, but there is no widespread flooding or structural damage. The issue is consistent with a failing seal or loose joint. A plumbing technician should inspect, replace or reseal the affected connection, and verify that no additional hidden leaks are present.',
    };
  }

  return {
    category: 'appliance',
    subCategory: 'general household item',
    severity: 'minor',
    estimatedCost: '400–800 DKK',
    repairOrReplace: 'repair',
    insuranceSummary:
      'Customer reports damage to a household item with limited detail. The issue appears to be minor and localized. Based on the description, a standard inspection and repair are likely sufficient. Further information and photos may be required for a final cost estimate and repair decision.',
  };
}

