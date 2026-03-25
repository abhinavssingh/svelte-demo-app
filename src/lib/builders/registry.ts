/**
 * Component Registry for Builder.io
 * Exports component metadata and utilities for component discovery
 */

import { CUSTOM_COMPONENTS } from './customComponents';

/**
 * Get list of registered components for Builder.io
 * Used by /api/builder/components endpoint
 */
export function getComponentsList() {
  return CUSTOM_COMPONENTS.map(comp => ({
    name: comp.name,
    component: comp.component,
    inputs: comp.inputs,
    canHaveChildren: comp.canHaveChildren,
    shouldReceiveBuilderProps: comp.shouldReceiveBuilderProps
  }));
}

/**
 * Get component by name
 */
export function getComponentByName(name: string) {
  return CUSTOM_COMPONENTS.find(comp => comp.name === name);
}

/**
 * Register a new component dynamically
 */
export function registerComponent(component: any) {
  CUSTOM_COMPONENTS.push(component);
}

export { CUSTOM_COMPONENTS } from './customComponents';
