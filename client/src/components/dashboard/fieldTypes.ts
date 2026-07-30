export type FieldType = "text" | "textarea" | "number" | "boolean" | "array" | "select" | "date" | "image" | "file";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[]; // for type "select"
  required?: boolean;
  placeholder?: string;
  /** For type "image": upload function to call when a file is chosen. */
  uploadFn?: (file: File) => Promise<{ url: string; publicId: string }>;
  /** For type "image": store the result wrapped in an array (matches Project.images: [{url,publicId}]). */
  arrayWrap?: boolean;
  /** Restricts the file picker for type "file" (e.g. "application/pdf"). */
  accept?: string;
}

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => string;
}
