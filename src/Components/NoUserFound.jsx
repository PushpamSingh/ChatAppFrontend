export const NoUserFound = ({ H1, P }) => {
  return (
    <div className="card bg-base-200 p-6 text-center">
      <h3 className="font-semibold text-lg mb-2">{H1}</h3>
      <p className="text-base-content opacity-70">
        {P}
      </p>
    </div>
  );
};
