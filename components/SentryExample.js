import React, { useState } from 'react';
import { useSentry, useSentryForm, useSentryPerformance } from '../hooks/useSentry';

/**
 * Example component demonstrating Sentry integration
 * This shows how to use the Sentry wrapper and utility functions
 */
function SentryExample() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  
  // Initialize Sentry hooks
  const sentry = useSentry();
  const { trackAction } = useSentryPerformance('SentryExample');
  const { captureFormValidationError, trackFormSubmission, trackFormFieldError } = useSentryForm('exampleForm');

  // Example: Capture a custom error
  const handleCustomError = () => {
    try {
      throw new Error('This is a custom error for testing Sentry');
    } catch (error) {
      sentry.captureError(error, {
        component: 'SentryExample',
        action: 'custom-error-button',
        count,
      });
    }
  };

  // Example: Capture a message
  const handleCustomMessage = () => {
    sentry.captureMessage('Custom message from SentryExample component', 'info', {
      component: 'SentryExample',
      timestamp: Date.now(),
    });
  };

  // Example: Track user interaction
  const handleIncrement = () => {
    setCount(prev => prev + 1);
    trackAction('increment', { newCount: count + 1 });
    sentry.captureUserEvent('counter-increment', { count: count + 1 }, 'user-interaction');
  };

  // Example: Simulate API error
  const handleApiError = () => {
    sentry.captureApiError('/api/example', 500, { error: 'Internal server error' }, { method: 'GET' });
  };

  // Example: Track performance
  const handlePerformanceTest = () => {
    const startTime = Date.now();
    
    // Simulate some work
    setTimeout(() => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      sentry.capturePerformance('example-operation', duration);
    }, 100);
  };

  // Example: Form handling with Sentry
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
      trackFormFieldError('name', 'Name is required', formData.name);
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      trackFormFieldError('email', 'Email is required', formData.email);
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      captureFormValidationError(newErrors, formData);
      trackFormSubmission(false, { errors: newErrors });
      return;
    }
    
    // Simulate successful submission
    setErrors({});
    trackFormSubmission(true, { name: formData.name, email: formData.email });
    
    // Reset form
    setFormData({ name: '', email: '' });
  };

  // Example: Set user context
  const handleSetUser = () => {
    sentry.setUser({
      id: '123',
      email: 'user@example.com',
      username: 'testuser',
    });
    sentry.captureMessage('User context set', 'info');
  };

  // Example: Clear user context
  const handleClearUser = () => {
    sentry.clearUser();
    sentry.captureMessage('User context cleared', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sentry Integration Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Error Handling Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Error Handling</h2>
          
          <button
            onClick={handleCustomError}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Trigger Custom Error
          </button>
          
          <button
            onClick={handleCustomMessage}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Send Custom Message
          </button>
          
          <button
            onClick={handleApiError}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            Simulate API Error
          </button>
        </div>

        {/* User Interaction Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">User Interactions</h2>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleIncrement}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Increment Counter
            </button>
            <span className="text-lg font-medium">Count: {count}</span>
          </div>
          
          <button
            onClick={handlePerformanceTest}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Test Performance Tracking
          </button>
        </div>

        {/* User Context Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">User Context</h2>
          
          <button
            onClick={handleSetUser}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Set User Context
          </button>
          
          <button
            onClick={handleClearUser}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Clear User Context
          </button>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Form Validation</h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click buttons to trigger different Sentry events</li>
          <li>• Check your Sentry dashboard to see captured events</li>
          <li>• Try submitting the form with empty fields to see validation error tracking</li>
          <li>• All events include contextual information for better debugging</li>
        </ul>
      </div>
    </div>
  );
}

export default SentryExample;
