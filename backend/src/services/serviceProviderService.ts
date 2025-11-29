import { mockDB } from '../mockDB';
import { ServiceProviderDocument } from '../models/ServiceProvider';
import { Category } from '../types/analysis';

const providersCollection = mockDB.collection<ServiceProviderDocument>('serviceProviders');

// Initialize default service providers
export function initializeServiceProviders(): void {
  const existing = providersCollection.countDocuments();
  
  if (existing === 0) {
    console.log('📋 [ServiceProviders] Creating default service providers...');
    
    // Plumbing Service Provider
    providersCollection.insertOne({
      name: 'Hans Andersen',
      category: 'plumbing',
      email: 'hans@fixhub-plumbing.dk',
      phone: '+45 12 34 56 78',
      company: 'FixHub Plumbing Services',
      specialties: ['pipe leaks', 'water damage', 'drainage', 'heating systems'],
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    // Electronics Service Provider
    providersCollection.insertOne({
      name: 'Maria Nielsen',
      category: 'electronics',
      email: 'maria@fixhub-electronics.dk',
      phone: '+45 23 45 67 89',
      company: 'FixHub Electronics Repair',
      specialties: ['smartphones', 'laptops', 'tablets', 'TVs', 'audio equipment'],
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    // Appliance Service Provider
    providersCollection.insertOne({
      name: 'Lars Hansen',
      category: 'appliance',
      email: 'lars@fixhub-appliances.dk',
      phone: '+45 34 56 78 90',
      company: 'FixHub Appliance Repair',
      specialties: ['washing machines', 'dishwashers', 'refrigerators', 'ovens'],
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    // General/Furniture Service Provider
    providersCollection.insertOne({
      name: 'Sofia Johansen',
      category: 'furniture',
      email: 'sofia@fixhub-general.dk',
      phone: '+45 45 67 89 01',
      company: 'FixHub General Repairs',
      specialties: ['furniture', 'woodwork', 'general repairs', 'other'],
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    console.log('✅ [ServiceProviders] 4 service providers created');
  } else {
    console.log(`📋 [ServiceProviders] ${existing} service providers already exist`);
  }
}

/**
 * Get service provider for a specific category
 */
export function getProviderForCategory(category: Category): ServiceProviderDocument | null {
  // Map analysis categories to provider categories
  const categoryMap: Record<string, 'plumbing' | 'electronics' | 'appliance' | 'furniture' | 'other'> = {
    'plumbing': 'plumbing',
    'electronics': 'electronics',
    'appliance': 'appliance',
    'furniture': 'furniture',
    'other': 'furniture', // Default to general provider
    // Legacy support
    'vvs': 'plumbing', // Danish for plumbing
  };

  const providerCategory = categoryMap[category] || 'furniture';
  
  console.log(`🔍 [ServiceProvider] Looking for provider for category: ${category} → ${providerCategory}`);
  
  const provider = providersCollection.findOne({ 
    category: providerCategory,
    isActive: true 
  });

  if (!provider) {
    console.warn(`⚠️  [ServiceProvider] No provider found for ${providerCategory}, using fallback`);
    // Fallback to general provider
    return providersCollection.findOne({ category: 'furniture', isActive: true });
  }

  console.log(`✅ [ServiceProvider] Found provider: ${provider.name} (${provider.company})`);
  return provider;
}

/**
 * Get all active providers
 */
export function getAllProviders(): ServiceProviderDocument[] {
  return providersCollection.find({ isActive: true });
}

/**
 * Get provider by ID
 */
export function getProviderById(id: string): ServiceProviderDocument | null {
  return providersCollection.findById(id);
}

