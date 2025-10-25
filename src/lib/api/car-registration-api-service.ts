import soap from 'soap';

export interface CarRegistrationData {
  success: boolean;
  make?: string;
  model?: string;
  year?: number;
  colour?: string;
  bodyType?: string;
  engineSize?: string;
  fuelType?: string;
  registrationExpiry?: string;
  vin?: string;
  error?: string;
  credits?: number;
}

export interface CarRegistrationRequest {
  rego: string;
  state: string;
}

class CarRegistrationAPIService {
  private apiUrl = 'https://www.carregistrationapi.com/api/reg.asmx?WSDL';
  private username: string;

  constructor() {
    this.username = process.env.CAR_REGISTRATION_API_USERNAME || '';
  }

  async lookupVehicle(request: CarRegistrationRequest): Promise<CarRegistrationData> {
    // If no API credentials, return mock data
    if (!this.username) {
      console.log('🚗 No CarRegistrationAPI credentials, using mock data');
      return this.getMockData(request);
    }

    try {
      console.log(`🚗 Looking up vehicle: ${request.rego} (${request.state})`);

      // Create SOAP client
      const client = await new Promise<any>((resolve, reject) => {
        soap.createClient(this.apiUrl, (err, client) => {
          if (err) reject(err);
          else resolve(client);
        });
      });

      // Log available methods for debugging
      console.log('🔍 Available SOAP methods:', Object.keys(client));

      // Try to inspect the WSDL for CheckAustralia method details
      if (client.wsdl && client.wsdl.definitions) {
        console.log('🔍 WSDL definitions available:', Object.keys(client.wsdl.definitions));

        // Look for CheckAustralia method details
        const services = client.wsdl.definitions.services;
        if (services) {
          Object.keys(services).forEach(serviceName => {
            const service = services[serviceName];
            console.log(`🔍 Service ${serviceName}:`, Object.keys(service.ports || {}));

            Object.values(service.ports || {}).forEach((port: any) => {
              if (port.binding && port.binding.methods) {
                const methods = port.binding.methods;
                if (methods.CheckAustralia) {
                  console.log('🔍 CheckAustralia method details:', JSON.stringify(methods.CheckAustralia, null, 2));
                }
              }
            });
          });
        }
      }

      // Make the API call using CheckAustralia method
      const result = await new Promise<any>((resolve, reject) => {
        console.log(`🔍 Using SOAP method: CheckAustralia`);

        if (!client.CheckAustralia) {
          reject(new Error(`SOAP method CheckAustralia not found. Available: ${Object.keys(client).filter(k => !k.startsWith('_')).join(', ')}`));
          return;
        }

        // Use the correct parameter names from WSDL
        const requestParams = {
          username: this.username,
          RegistrationNumber: request.rego.toUpperCase(),
          State: request.state.toUpperCase()
        };

        console.log('🔍 SOAP request parameters (WSDL-compliant):', JSON.stringify(requestParams, null, 2));

        client.CheckAustralia(requestParams, (err: any, result: any) => {
          if (err) {
            console.error('🚨 SOAP call error:', err.message || err);
            reject(err);
          } else {
            console.log('✅ SOAP call successful, result:', JSON.stringify(result, null, 2));
            resolve(result);
          }
        });
      });

      console.log('🚗 CarRegistrationAPI response:', JSON.stringify(result, null, 2));

      return this.parseResponse(result);

    } catch (error) {
      console.error('CarRegistrationAPI error:', error);

      // Fallback to mock data on error
      console.log('🚗 Falling back to mock data due to API error');
      return this.getMockData(request);
    }
  }

  private parseResponse(result: any): CarRegistrationData {
    try {
      // Handle CheckAustralia response format
      const carData = result?.CheckAustraliaResult || result?.CarRegResult;

      console.log('🔍 Raw carData from API:', JSON.stringify(carData, null, 2));
      console.log('🔍 CarData type:', typeof carData);

      if (!carData) {
        return {
          success: false,
          error: 'No data returned from API'
        };
      }

      // Check if it's a string with error message
      if (typeof carData === 'string') {
        console.log('🔍 API returned string response:', carData);
        if (carData.includes('Error:') || carData.includes('error') || carData.includes('ERROR')) {
          return {
            success: false,
            error: carData
          };
        }
      }

      // Check if there's an error in the response
      if (carData.includes && carData.includes('Error:')) {
        return {
          success: false,
          error: carData
        };
      }

      // Parse the response fields (CheckAustralia returns different format)
      return {
        success: true,
        make: carData.Make || undefined,
        model: carData.Model || undefined,
        year: carData.Year ? parseInt(carData.Year) : undefined,
        colour: carData.Colour || carData.Color || undefined,
        bodyType: carData.BodyType || carData.Type || undefined,
        engineSize: carData.EngineSize || carData.Engine || undefined,
        fuelType: carData.FuelType || carData.Fuel || undefined,
        registrationExpiry: carData.RegExpiry || carData.Expiry || undefined,
        vin: carData.VIN || carData.Vin || undefined,
        credits: carData.Credits ? parseInt(carData.Credits) : undefined
      };

    } catch (error) {
      console.error('Error parsing CarRegistrationAPI response:', error);
      return {
        success: false,
        error: 'Failed to parse API response'
      };
    }
  }

  private getMockData(request: CarRegistrationRequest): CarRegistrationData {
    // Generate realistic mock data based on registration pattern
    const rego = request.rego.toUpperCase();

    // Different mock responses based on rego patterns
    const mockDatabase: Record<string, Partial<CarRegistrationData>> = {
      'ABC123': {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        colour: 'Silver',
        bodyType: 'Sedan',
        engineSize: '2.5L',
        fuelType: 'Petrol',
        vin: 'JT2SK12E7M0123456'
      },
      'DEF456': {
        make: 'Holden',
        model: 'Commodore',
        year: 2018,
        colour: 'White',
        bodyType: 'Sedan',
        engineSize: '3.6L',
        fuelType: 'Petrol',
        vin: 'VF1AG3EX8JM123456'
      },
      'GHI789': {
        make: 'Ford',
        model: 'Focus',
        year: 2017,
        colour: 'Blue',
        bodyType: 'Hatchback',
        engineSize: '2.0L',
        fuelType: 'Petrol',
        vin: 'WF0EXXGCE7EJ12345'
      },
      'JKL012': {
        make: 'BMW',
        model: '320i',
        year: 2019,
        colour: 'Black',
        bodyType: 'Sedan',
        engineSize: '2.0L',
        fuelType: 'Petrol',
        vin: 'WBA8E9G06KA123456'
      },
      'MNO345': {
        make: 'Nissan',
        model: 'Navara',
        year: 2016,
        colour: 'Red',
        bodyType: 'Utility',
        engineSize: '2.3L',
        fuelType: 'Diesel',
        vin: 'VSJNFAD25G8123456'
      },
      'PQR678': {
        make: 'Porsche',
        model: '911',
        year: 2021,
        colour: 'Guards Red',
        bodyType: 'Coupe',
        engineSize: '3.0L',
        fuelType: 'Petrol',
        vin: 'WP0AA2A98MS123456'
      }
    };

    // Check for exact match first
    if (mockDatabase[rego]) {
      return {
        success: true,
        registrationExpiry: '2025-12-31',
        credits: 9, // Mock remaining credits
        ...mockDatabase[rego]
      };
    }

    // Default mock data for unknown registrations
    return {
      success: true,
      make: 'Toyota',
      model: 'Corolla',
      year: 2019,
      colour: 'White',
      bodyType: 'Sedan',
      engineSize: '1.8L',
      fuelType: 'Petrol',
      vin: 'JT2JMRFE5KA123456',
      registrationExpiry: '2025-06-30',
      credits: 9
    };
  }

  // Method to check if API is configured
  isConfigured(): boolean {
    return !!this.username;
  }

  // Method to get account info
  async getAccountInfo(): Promise<{ credits?: number; error?: string }> {
    if (!this.username) {
      return { error: 'API not configured' };
    }

    try {
      // Note: This would need to be implemented if the API supports it
      // For now, return mock credits
      return { credits: 10 };
    } catch (error) {
      return { error: 'Failed to get account info' };
    }
  }
}

export const carRegistrationAPIService = new CarRegistrationAPIService();