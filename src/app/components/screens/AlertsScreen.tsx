import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Switch } from '../ui/switch';
import svgPaths from '../../../imports/07Alerts/svg-0ob0kuqd5i';

export const AlertsScreen = () => {
  const navigate = useNavigate();
  const { alerts, toggleAlertMonitoring } = useApp();

  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const triggeredAlerts = alerts.filter((a) => a.status === 'triggered');

  return (
    <div className="bg-[#fafafa] flex flex-col h-full">
      {/* Header */}
      <div className="bg-white flex h-[68px] items-center px-[16px] py-[8px] shrink-0 border-b border-[#e4e4e7]">
        <div className="flex gap-[8px] items-center shrink-0">
          <div className="relative shrink-0 size-[35px]">
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 35 35"
            >
              <g>
                <path
                  d={svgPaths.p266cd570}
                  fill="#FAFAFA"
                  stroke="#09090B"
                />
                <g>
                  <path d={svgPaths.p32859800} fill="#18181B" />
                  <path d={svgPaths.pe1c7a00} fill="#18181B" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-px flex justify-center pr-[32px]">
          <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[32px] text-[#18181b] text-[24px] tracking-[-0.24px] whitespace-nowrap">
            Alerts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between p-[16px] overflow-y-auto">
        <div className="flex flex-col gap-[4px]">
          <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
            ACTIVE ({activeAlerts.length})
          </p>

          {/* Active Alerts */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] border border-[#e4e4e7] rounded-[8px] flex items-center justify-between px-[24px] py-[16px]"
                >
                  <div className="flex-1 flex flex-col gap-[3px]">
                    <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                      {alert.pair}
                    </p>
                    <p className="font-['Avenir_Next:Regular',sans-serif] leading-[20px] text-[#71717a] text-[14px]">
                      {alert.type === 'rises_above'
                        ? `Rises above ${alert.targetRate.toFixed(4)}`
                        : `Falls below ${alert.targetRate.toFixed(2)}`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[4px] items-end">
                    <p className="font-['Avenir_Next:Regular',sans-serif] leading-[18px] text-[#18181b] text-[12px]">
                      {alert.monitoring ? 'Monitoring' : 'Disabled'}
                    </p>
                    <Switch
                      checked={alert.monitoring}
                      onCheckedChange={() => toggleAlertMonitoring(alert.id)}
                      className="data-[state=checked]:bg-[#0077e9]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Info Banner */}
            <div className="bg-[rgba(0,119,233,0.2)] rounded-[10px] p-[19px]">
              <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
                You'll be notified instantly when your alert conditions are met.
              </p>
            </div>
          </div>

          {/* Triggered Alerts */}
          {triggeredAlerts.length > 0 && (
            <div className="flex flex-col gap-[5px] mt-[24px]">
              <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
                TRIGGERED ({triggeredAlerts.length})
              </p>
              {triggeredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-[#e76e50] rounded-[16px] p-[24px] flex items-center justify-between"
                >
                  <div className="flex flex-col gap-[5px]">
                    <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                      {alert.pair}
                    </p>
                    <p className="font-['Avenir_Next:Medium',sans-serif] leading-[18px] text-[#18181b] text-[12px]">
                      {alert.type === 'rises_above'
                        ? `Rises above ${alert.targetRate}`
                        : `Falls below ${alert.targetRate}`}
                    </p>
                  </div>
                  <p className="font-['Avenir_Next:Regular',sans-serif] leading-[20px] text-[#18181b] text-[14px] whitespace-pre">
                    Triggered  {alert.triggeredDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Alert Button */}
        <button
          onClick={() => navigate('/alerts/create')}
          className="bg-gradient-to-r from-[#9b60e1] to-[#0074e8] h-[56px] rounded-[8px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex items-center justify-center gap-[8px] hover:opacity-90 transition-opacity mt-[16px]"
        >
          <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#fafafa] text-[24px]">
            add
          </span>
          <span className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#fafafa] text-[16px]">
            Create New Alert
          </span>
        </button>
      </div>
    </div>
  );
};