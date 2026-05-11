import svgPaths from '../../../imports/09Profile/svg-hc6ybc1m2e';

export const ProfileScreen = () => {
  const menuItems = {
    preferences: [
      { label: 'Default Currency', icon: 'chevron_right' },
      { label: 'Language & Region', icon: 'chevron_right' },
      { label: 'Number Format', icon: 'chevron_right' },
      { label: 'Dark / Light Theme', icon: 'chevron_right' },
    ],
    notifications: [
      { label: 'Push Notifications', icon: 'chevron_right' },
      { label: 'Email Alerts', icon: 'chevron_right' },
      { label: 'Alert Frequency', icon: 'chevron_right' },
    ],
    help: [
      { label: 'FAQ', icon: 'chevron_right' },
      { label: 'Contact Support', icon: 'chevron_right' },
      { label: 'About', icon: 'chevron_right' },
    ],
  };

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
            Profile
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-[16px]">
        <div className="flex flex-col gap-[24px]">
          {/* Profile Info */}
          <div className="flex flex-col items-center gap-[14px]">
            <div className="bg-[#0077e9] rounded-full size-[80px] flex items-center justify-center">
              <p className="font-['Avenir_Next:Bold',sans-serif] text-white text-[22px]">
                SM
              </p>
            </div>
            <div className="flex flex-col gap-[8px] items-center w-full">
              <div className="flex flex-col gap-[2px] items-center whitespace-nowrap">
                <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[32px] text-[#18181b] text-[24px] tracking-[-0.24px]">
                  Sarah Mitchell
                </p>
                <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] text-[#71717a] text-[14px]">
                  sarah@email.com
                </p>
              </div>
              <button className="bg-white border border-[#0077e9] rounded-[16px] px-[19px] py-[6px] h-[32px] hover:bg-gray-50 transition-colors">
                <p className="font-['Avenir_Next:Medium',sans-serif] leading-[18px] text-[#18181b] text-[12px]">
                  Edit Profile
                </p>
              </button>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] rounded-[16px] pt-[16px] flex flex-col gap-[32px]">
            {/* Preferences */}
            <div className="flex flex-col gap-[4px]">
              <div className="px-[16px]">
                <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
                  PREFERENCES
                </p>
              </div>
              <div className="flex flex-col">
                {menuItems.preferences.map((item, index) => (
                  <button
                    key={item.label}
                    className={`flex items-center justify-between p-[16px] hover:bg-gray-50 transition-colors ${
                      index < menuItems.preferences.length - 1 ? 'border-b border-[#e4e4e7]' : ''
                    }`}
                  >
                    <p className="font-['Avenir_Next:Medium',sans-serif] leading-[24px] text-[#18181b] text-[16px]">
                      {item.label}
                    </p>
                    <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#18181b] text-[22px]">
                      {item.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="flex flex-col gap-[4px]">
              <div className="px-[16px]">
                <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
                  NOTIFICATIONS
                </p>
              </div>
              <div className="flex flex-col">
                {menuItems.notifications.map((item, index) => (
                  <button
                    key={item.label}
                    className={`flex items-center justify-between p-[16px] hover:bg-gray-50 transition-colors ${
                      index < menuItems.notifications.length - 1 ? 'border-b border-[#e4e4e7]' : ''
                    }`}
                  >
                    <p className="font-['Avenir_Next:Medium',sans-serif] leading-[24px] text-[#18181b] text-[16px]">
                      {item.label}
                    </p>
                    <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#18181b] text-[22px]">
                      {item.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Help & Support */}
            <div className="flex flex-col gap-[4px]">
              <div className="px-[16px]">
                <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px] uppercase">
                  Help & Support
                </p>
              </div>
              <div className="flex flex-col">
                {menuItems.help.map((item, index) => (
                  <button
                    key={item.label}
                    className={`flex items-center justify-between p-[16px] hover:bg-gray-50 transition-colors ${
                      index < menuItems.help.length - 1 ? 'border-b border-[#e4e4e7]' : ''
                    }`}
                  >
                    <p className="font-['Avenir_Next:Medium',sans-serif] leading-[24px] text-[#18181b] text-[16px]">
                      {item.label}
                    </p>
                    <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#18181b] text-[22px]">
                      {item.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logout */}
            <div className="flex flex-col">
              <button className="flex items-center gap-[201px] p-[16px] hover:bg-gray-50 transition-colors">
                <p className="font-['Avenir_Next:Medium',sans-serif] leading-[24px] text-[#18181b] text-[16px]">
                  Logout
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};