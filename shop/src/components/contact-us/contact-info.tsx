export function ContactInfo({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-xs flex-row items-center pr-4 sm:pr-2 lg:max-w-sm lg:pr-0">
      <div className="flex w-12 flex-shrink-0 justify-center text-brand">
        {icon}
      </div>
      <div className="mt-0 ltr:pl-5 rtl:pr-5">
        <h3 className="mb-2 text-15px font-medium text-dark dark:text-light">
          {title}
        </h3>
        <p className="leading-[1.8em]">{description}</p>
      </div>
    </div>
  );
}
