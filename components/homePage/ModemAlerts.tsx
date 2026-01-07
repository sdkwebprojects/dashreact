import React from 'react';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

interface ModemAlert {
  id: string;
  name: string;
  issue: string;
}

interface ModemAlertsProps {
  alerts: ModemAlert[];
}

const ModemAlerts: React.FC<ModemAlertsProps> = ({ alerts }) => {
  return (
    <div className="flex shrink min-w-[414px] flex-col border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between p-4 ">
        <h3 className="font-semibold text-stark">Alerte modem</h3>
        <div className="flex items-center gap-2">
          <button className="text-sm font-semibold text-[#0066CC] hover:underline flex items-center gap-1">
            Résoudre
          </button>
          <ExternalLinkIcon width={20} height={20} />
        </div>
      </div>
      <div className="flex flex-col px-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`py-4 ${index < alerts.length - 1 ? 'border-b border-gray-300' : ''}`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <div className="flex gap-4 font-semibold text-sm text-stark mb-1">
                  <span>{alert.id}</span>
                  <span> {alert.name}</span>
                </div>
                <div className="text-sm text-gray-600">{alert.issue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModemAlerts;
