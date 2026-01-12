import i18next from 'i18next';

/**
 * Translate code to the desired language, with optional placeholders.
 * meta.field is automatically translated via FIELDS
 */
export const translate = (
  code: string,
  options?: { lng?: string; meta?: Record<string, unknown> },
): string => {
  const meta = { ...options?.meta };

  if (meta.field) {
    meta.field = i18next.t(`FIELDS.${meta.field}`, { lng: options?.lng });
  }

  return i18next.t(code, {
    lng: options?.lng || i18next.language,
    ...meta,
    defaultValue: code, // fallback for the same key
  });
};
