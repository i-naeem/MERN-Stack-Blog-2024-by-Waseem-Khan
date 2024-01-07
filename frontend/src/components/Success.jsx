export const Success = (props) => {
  return (
    props.success && (
      <div
        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400"
        role="alert"
      >
        <span className="font-medium">{props.success}</span>
      </div>
    )
  );
};
