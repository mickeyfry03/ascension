export function FormField({ label, name, errors, children }: { label: string; name: string; errors?: string[]; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-bold">{label}</label>
      {children}
      {errors?.map((e) => <p key={e} className="text-sm text-red-700" role="alert">{e}</p>)}
    </div>
  );
}
