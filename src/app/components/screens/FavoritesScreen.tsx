import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "motion/react";
import { useApp } from '../../context/AppContext';
import svgPaths from '../../../imports/05Favorites/svg-s3b3tumhz9';

export const FavoritesScreen = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite, addFavorite } = useApp();

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; from: string; to: string; rate: number } | null>(null);
  const [undoPair, setUndoPair] = useState<{ id: string; from: string; to: string; rate: number } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleViewRates = (from: string, to: string) => {
    navigate(`/rates/${from}/${to}`);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    setUndoPair(removed);
    removeFavorite(removed.id);
    setDeleteTarget(null);
    setShowToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 4000);
  };

  const handleUndo = () => {
    if (!undoPair) return;
    addFavorite(undoPair);
    setShowToast(false);
    setUndoPair(null);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  };

  return (
    <div className="bg-[#fafafa] flex flex-col h-full relative">
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
              </g>
              <g>
                <path d={svgPaths.p32859800} fill="#18181B" />
                <path d={svgPaths.pe1c7a00} fill="#18181B" />
              </g>
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-px flex justify-center pr-[32px]">
          <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[32px] text-[#18181b] text-[20px]">
            Favourites
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between p-[16px] overflow-y-auto">
        <div className="flex flex-col gap-[4px] w-full">
          <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
            You have {favorites.length} saved currency pairs
          </p>

          {/* Favorites List */}
          <div className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] rounded-[16px] overflow-hidden">
            {favorites.map((pair, index) => (
              <div
                key={pair.id}
                className={`bg-white px-[8px] ${
                  index < favorites.length - 1 ? 'border-b border-[#e4e4e7]' : ''
                }`}
              >
                <div className="flex items-center justify-between p-[16px]">
                  <div className="flex-1 flex flex-col gap-[3px]">
                    <div className="flex gap-[4px] items-start">
                      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                        {pair.from}
                      </p>
                      <span className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                        arrow_forward
                      </span>
                      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                        {pair.to}
                      </p>
                    </div>
                    <p className="font-['Avenir_Next:Regular',sans-serif] leading-[20px] text-[#71717a] text-[14px]">
                      1 {pair.from} = {pair.rate.toFixed(4)} {pair.to}
                    </p>
                  </div>
                  <button
                    onClick={() => handleViewRates(pair.from, pair.to)}
                    className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-['Material_Icons:Regular',sans-serif] text-[#71717a] text-[18px]">
                      ssid_chart
                    </span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(pair); }}
                    className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#71717a] text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Pair Button */}
        <button
          onClick={() => navigate('/favorites/add')}
          className="bg-gradient-to-r from-[#9b60e1] to-[#0074e8] h-[56px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.12)] flex items-center justify-center gap-[8px] mt-[16px]"
        >
          <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#fafafa] text-[24px]">
            add
          </span>
          <span className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#fafafa] text-[16px]">
            Add Pair
          </span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-50 bg-black/50"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 z-[60] flex items-center justify-center px-[24px]"
              style={{ pointerEvents: "none" }}
            >
              <div
                className="bg-white rounded-[16px] p-[24px] w-full shadow-[0px_8px_24px_rgba(0,0,0,0.12)]"
                style={{ pointerEvents: "auto" }}
              >
                <p className="font-['Avenir_Next:Bold',sans-serif] text-[18px] text-[#18181b] mb-[8px]">
                  Remove pair?
                </p>
                <p className="font-['Avenir_Next:Regular',sans-serif] text-[14px] text-[#71717a] mb-[20px]">
                  Remove {deleteTarget.from} → {deleteTarget.to} from your saved pairs?
                </p>
                <div className="flex gap-[12px]">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 h-[44px] rounded-[10px] border border-[#e4e4e7] font-['Avenir_Next:Bold',sans-serif] text-[14px] text-[#18181b]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 h-[44px] rounded-[10px] bg-[#ef4444] font-['Avenir_Next:Bold',sans-serif] text-[14px] text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Undo Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-[24px] left-[16px] right-[16px] z-[60] flex items-center justify-between bg-[#18181b] rounded-[12px] px-[16px] py-[14px]"
          >
            <span className="text-white text-[14px] font-['Avenir_Next:Regular',sans-serif]">Pair removed</span>
            <button
              onClick={handleUndo}
              className="text-[#60a5fa] text-[14px] font-['Avenir_Next:Bold',sans-serif] ml-[16px]"
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
