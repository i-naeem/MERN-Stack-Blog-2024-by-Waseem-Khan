export const Error = (props) => {
  return (
    props.error && (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">{props.error}</span>
      </div>
    )
  );
};
