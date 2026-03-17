<script lang="ts">
  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    text?: string;
    link?: string;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
  }

  const {
    text = 'Click Me',
    link = '#',
    variant = 'primary',
    size = 'md',
    disabled = false
  } = $props<Props>();

  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 inline-block';

  const variantClasses: Record<Variant, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-400',
    ghost: 'text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
  };

  const sizeClasses: Record<Size, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
</script>

<a href={link} class={classes} {disabled}>
  {text}
</a>

<style>
  a[disabled] {
    @apply cursor-not-allowed opacity-50;
  }
</style>
