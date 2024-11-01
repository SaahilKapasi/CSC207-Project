import React from 'react';

const StatsDisplay: React.FC = () => {
    return (
        <div className="stats-display">
            <h4>Stats for &lt;File 1.0&gt;</h4>
            <ul>
                <li>Population:</li>
                <li>GAP:</li>
                <li>Mean:</li>
                <li>Median:</li>
                <li>Mode:</li>
                <li>Range:</li>
                {/* Add more stats as needed */}
            </ul>
        </div>
    );
};

export default StatsDisplay;