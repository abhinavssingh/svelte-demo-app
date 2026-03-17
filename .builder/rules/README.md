# Builder Rules Configuration

This directory contains AI instruction files that guide code generation and development practices for this Builder.io + SvelteKit application.

## Files

### [application-overview.mdc](./application-overview.mdc)
**Purpose**: High-level context about the entire application

Covers:
- Technology stack and versions
- Directory structure and key files
- Core principles and development workflow
- Environment variables and code style guidelines

**Use when**: Setting up new features, onboarding, general architecture questions

### [component-architecture.mdc](./component-architecture.mdc)
**Purpose**: Detailed guidelines for component development with Svelte 5 runes

Covers:
- Component structure and template patterns using $props runes
- Component categories (layout, hero, features)
- Registration pattern with customComponents.ts
- Input types and props best practices
- Reusability guidelines and anti-patterns

**Use when**: Creating new components, registering with Builder, component design

### [builder-integration.mdc](./builder-integration.mdc)
**Purpose**: How the Builder.io SDK integrates with the application

Covers:
- Initialization flow without devtools
- Custom components via customComponents.ts
- Content component rendering with customComponents prop
- Page rendering in dynamic routes
- Environment configuration
- Page creation workflow
- Error handling and debugging

**Use when**: Working with Builder.io SDK, handling Builder content, debugging integration issues

### [i18n-guidelines.mdc](./i18n-guidelines.mdc)
**Purpose**: Internationalization implementation and translation management

Covers:
- Supported languages (10 languages including RTL)
- Translation stores and reactivity
- Adding and managing translations
- Language selection and persistence
- RTL support
- Date/number formatting
- Testing and migration strategies

**Use when**: Adding translations, implementing multilingual features, language-related functionality

## How AI Agents Use This

These files are automatically discovered by Builder.io and other AI coding assistants to:

1. **Provide Context** - Understand project structure and patterns
2. **Guide Decisions** - Follow established architectural patterns
3. **Maintain Consistency** - Use consistent naming, structure, and practices
4. **Prevent Errors** - Follow proven patterns and avoid anti-patterns
5. **Improve Output** - Generate code that fits the project style

## Integration with Other Config Files

These Builder rules work alongside:

- **AGENTS.md** - Root-level overview and quick reference
- **.builderrules** - (Optional) Directory-specific rules with JSON frontmatter
- **Individual .builderrules** - Component-level configuration if needed

## When to Update

Update these rules when:

- [ ] Technology versions change significantly
- [ ] Adding new major features or patterns
- [ ] Changing code style or conventions
- [ ] Implementing new framework integrations
- [ ] Discovering and documenting new best practices

## Reading Order for New Developers

1. **application-overview.mdc** - Understand the big picture
2. **component-architecture.mdc** - Learn component patterns
3. **builder-integration.mdc** - Understand Builder.io setup
4. **i18n-guidelines.mdc** - Learn translation system

## Quick Reference

### To add a component:
→ See [component-architecture.mdc](./component-architecture.mdc)

### To integrate with Builder:
→ See [builder-integration.mdc](./builder-integration.mdc)

### To add translations:
→ See [i18n-guidelines.mdc](./i18n-guidelines.mdc)

### To understand architecture:
→ See [application-overview.mdc](./application-overview.mdc)

## Related Documentation

- [AGENTS.md](../AGENTS.md) - Root documentation
- [src/lib/builders/customComponents.ts](../src/lib/builders/customComponents.ts) - Custom components for Builder.io
- [src/lib/builders/integration.ts](../src/lib/builders/integration.ts) - Builder SDK setup
- [src/lib/i18n/store.ts](../src/lib/i18n/store.ts) - Translation store
- [src/lib/types/index.ts](../src/lib/types/index.ts) - TypeScript types
