import "./style.css";

/**
 * A functional component that renders a loading spinner.
 *
 * The spinner is visually styled using CSS classes "loader-container" and "loader".
 * It provides a simple animated loading indicator, typically used to show that 
 * content is being loaded or a process is ongoing.
 */
const Spinner = () => {
  return (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;
