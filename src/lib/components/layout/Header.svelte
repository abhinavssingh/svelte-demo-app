<script lang="ts">
  import { currentLanguage, LANGUAGES, availableLanguages } from '$lib/i18n/store';

  interface NavItem {
    label: string;
    href: string;
  }

  interface Props {
    logo?: string;
    logoText?: string;
    navItems?: NavItem[];
    sticky?: boolean;
  }

  const {
    logo = '',
    logoText = 'Brand',
    navItems = [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/features' },
      { label: 'About', href: '/about' }
    ],
    sticky = true
  } = $props<Props>();

  let mobileMenuOpen = $state(false);
</script>

<header class={sticky ? 'sticky top-0 z-50' : 'relative'}>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          {#if logo}
            <img src={logo} alt={logoText} class="h-8 w-auto" />
          {/if}
          <span class="ml-2 text-xl font-bold text-gray-900">{logoText}</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          {#each navItems as item (item.href)}
            <a href={item.href} class="text-gray-700 hover:text-blue-600 transition-colors">
              {item.label}
            </a>
          {/each}

          <!-- Language Selector -->
          <select bind:value={$currentLanguage} class="px-3 py-2 border rounded-md">
            {#each availableLanguages as lang (lang.code)}
              <option value={lang.code}>
                {lang.nativeName}
              </option>
            {/each}
          </select>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden"
          on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      {#if mobileMenuOpen}
        <div class="md:hidden pb-4">
          {#each navItems as item (item.href)}
            <a
              href={item.href}
              class="block px-3 py-2 text-gray-700 hover:text-blue-600"
              on:click={() => (mobileMenuOpen = false)}
            >
              {item.label}
            </a>
          {/each}

          <!-- Mobile Language Selector -->
          <div class="px-3 py-2">
            <select bind:value={$currentLanguage} class="w-full px-3 py-2 border rounded-md">
              {#each availableLanguages as lang (lang.code)}
                <option value={lang.code}>
                  {lang.nativeName}
                </option>
              {/each}
            </select>
          </div>
        </div>
      {/if}
    </div>
  </nav>
</header>
