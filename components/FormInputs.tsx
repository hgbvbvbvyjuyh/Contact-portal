/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface InputLabelProps {
  htmlFor: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

function InputLabel({ htmlFor, label, required, disabled }: InputLabelProps) {
  if (!label) return null;
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-[12px] font-semibold text-foreground tracking-tight select-none leading-none mb-1.5 inline-block',
        disabled && 'opacity-50'
      )}
    >
      {label}
      {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
    </label>
  );
}

interface InputHelperProps {
  id: string;
  helperText?: string;
  error?: string;
}

function InputHelper({ id, helperText, error }: InputHelperProps) {
  if (error) {
    return (
      <p id={`${id}-error`} role="alert" className="text-[11px] text-rose-500 font-medium leading-normal mt-1">
        {error}
      </p>
    );
  }
  if (helperText) {
    return (
      <p id={`${id}-helper`} className="text-[11px] text-muted-foreground leading-normal mt-1">
        {helperText}
      </p>
    );
  }
  return null;
}

/* ==========================================================================
   TextInput Component
   ========================================================================== */

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, helperText, error, required, disabled, className, ...props }, ref) => {
    const defaultId = useId();
    const id = props.id || defaultId;

    return (
      <div className="w-full flex flex-col font-sans">
        <InputLabel htmlFor={id} label={label} required={required} disabled={disabled} />
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={cn(
            'h-9.5 w-full rounded-input border border-border/50 bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 ease-out',
            'hover:border-border/80 focus:border-primary/80 focus:ring-4 focus:ring-primary/10',
            disabled && 'bg-muted/50 text-muted-foreground cursor-not-allowed border-border/20',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
        <InputHelper id={id} helperText={helperText} error={error} />
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

/* ==========================================================================
   Textarea Component
   ========================================================================== */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, required, disabled, className, ...props }, ref) => {
    const defaultId = useId();
    const id = props.id || defaultId;

    return (
      <div className="w-full flex flex-col font-sans">
        <InputLabel htmlFor={id} label={label} required={required} disabled={disabled} />
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={cn(
            'min-h-[90px] w-full rounded-input border border-border/50 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 ease-out resize-y',
            'hover:border-border/80 focus:border-primary/80 focus:ring-4 focus:ring-primary/10',
            disabled && 'bg-muted/50 text-muted-foreground cursor-not-allowed border-border/20',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
        <InputHelper id={id} helperText={helperText} error={error} />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

/* ==========================================================================
   Select Component
   ========================================================================== */

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, options, required, disabled, className, ...props }, ref) => {
    const defaultId = useId();
    const id = props.id || defaultId;

    return (
      <div className="w-full flex flex-col font-sans">
        <InputLabel htmlFor={id} label={label} required={required} disabled={disabled} />
        <div className="relative">
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={cn(
              'h-9.5 w-full rounded-input border border-border/50 bg-background px-3 text-xs text-foreground outline-none transition-all duration-200 ease-out appearance-none pr-8 cursor-pointer',
              'hover:border-border/80 focus:border-primary/80 focus:ring-4 focus:ring-primary/10',
              disabled && 'bg-muted/50 text-muted-foreground cursor-not-allowed border-border/20',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        <InputHelper id={id} helperText={helperText} error={error} />
      </div>
    );
  }
);
Select.displayName = 'Select';

/* ==========================================================================
   Checkbox Component
   ========================================================================== */

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  helperText?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, disabled, className, ...props }, ref) => {
    const defaultId = useId();
    const id = props.id || defaultId;

    return (
      <div className="flex flex-col font-sans">
        <div className="flex items-start gap-2.5">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled}
            className={cn(
              'h-4.5 w-4.5 rounded-[5px] border border-border/50 bg-background text-primary focus:ring-1 focus:ring-primary cursor-pointer mt-0.5 outline-none accent-primary transition-all shrink-0',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'border-rose-500'
            )}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              'text-xs text-foreground/90 select-none cursor-pointer leading-tight pt-0.5',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
        </div>
        <div className="pl-7">
          <InputHelper id={id} helperText={helperText} error={error} />
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

/* ==========================================================================
   Radio Group Component
   ========================================================================== */

interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioGroupOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export function RadioGroup({
  name,
  options,
  selectedValue,
  onChange,
  label,
  helperText,
  error,
  disabled = false,
}: RadioGroupProps) {
  const groupLabelId = useId();

  return (
    <div className="flex flex-col font-sans" role="radiogroup" aria-labelledby={groupLabelId}>
      {label && (
        <span id={groupLabelId} className="text-[12px] font-semibold text-foreground tracking-tight leading-none mb-2 inline-block">
          {label}
        </span>
      )}
      <div className="space-y-2">
        {options.map((opt) => {
          const radioId = `${name}-${opt.value}`;
          const isSelected = selectedValue === opt.value;
          const isOptionDisabled = disabled || opt.disabled;

          return (
            <div key={opt.value} className="flex items-center gap-2.5">
              <input
                type="radio"
                id={radioId}
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={isOptionDisabled}
                onChange={() => onChange?.(opt.value)}
                className={cn(
                  'h-4.5 w-4.5 rounded-full border border-border/50 bg-background text-primary focus:ring-1 focus:ring-primary cursor-pointer accent-primary outline-none transition-all shrink-0',
                  isOptionDisabled && 'cursor-not-allowed opacity-50'
                )}
              />
              <label
                htmlFor={radioId}
                className={cn(
                  'text-xs text-foreground/90 select-none cursor-pointer leading-none',
                  isOptionDisabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>
      <InputHelper id={groupLabelId} helperText={helperText} error={error} />
    </div>
  );
}

/* ==========================================================================
   Switch Component
   ========================================================================== */

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export function Switch({
  checked = false,
  onCheckedChange,
  label,
  description,
  disabled = false,
  id: customId,
}: SwitchProps) {
  const defaultId = useId();
  const id = customId || defaultId;

  return (
    <div className="flex items-start justify-between font-sans gap-4 py-1">
      {(label || description) && (
        <div className="flex flex-col space-y-0.5 min-w-0">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-xs font-semibold text-foreground tracking-tight select-none cursor-pointer leading-tight',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-[11px] text-muted-foreground leading-normal">
              {description}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          'relative inline-flex h-5.5 w-9.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          checked ? 'bg-primary' : 'bg-muted',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-card shadow-low ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-4' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
}
