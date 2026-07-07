/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Button as BaseButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <BaseButton
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          fullWidth && 'w-full flex',
          isLoading && 'relative text-transparent! select-none pointer-events-none',
          className
        )}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-current">
            <Loader2 className="h-4 w-4 animate-spin text-foreground dark:text-background" />
          </div>
        )}
        <span className={cn('flex items-center gap-1.5 justify-center w-full', isLoading && 'opacity-0')}>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </span>
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';
