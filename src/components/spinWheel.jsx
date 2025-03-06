
// import React, { useState, useRef, useEffect } from 'react';
// import { FaGift } from 'react-icons/fa';
// import Confetti from 'react-confetti';

// const SpinWheel = () => {
//   // State for modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // State for spinning mechanics
//   const [spinning, setSpinning] = useState(false);
//   const [result, setResult] = useState(null);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const wheelRef = useRef(null);

//   // Define offers and colors for wheel segments
//   const offers = ['5%', '10%', '15%', '20%', 'Try Again'];
//   const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

//   // Function to handle wheel spinning with increased speed
//   const spinWheel = () => {
//     if (spinning) return; // Prevent multiple spins
//     setSpinning(true);
//     setResult(null);
//     setShowConfetti(false);

//     const wheel = wheelRef.current;
//     const randomDegree = Math.floor(Math.random() * 360) + 1440; // Minimum 4 full spins
//     wheel.style.transition = 'transform 2s ease-out'; // Increased speed (from 4s to 2s)
//     wheel.style.transform = `rotate(${randomDegree}deg)`;

//     // Calculate result after animation completes
//     setTimeout(() => {
//       const actualDegree = randomDegree % 360;
//       const segmentAngle = 360 / offers.length;
//       const winningIndex = Math.floor((360 - actualDegree) / segmentAngle) % offers.length;
//       const wonOffer = offers[winningIndex];
//       setResult(wonOffer);
//       if (wonOffer !== 'Try Again') {
//         setShowConfetti(true); // Trigger confetti for wins
//       }
//       setSpinning(false);
//     }, 2000); // Match the new transition duration (2 seconds)
//   };

//   // Stop confetti after 5 seconds
//   useEffect(() => {
//     if (showConfetti) {
//       const timer = setTimeout(() => setShowConfetti(false), 5000);
//       return () => clearTimeout(timer); // Cleanup timer on unmount
//     }
//   }, [showConfetti]);

//   return (
//     <>
//       {/* Floating Icon */}
//       <button
//         className="fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-focus"
//         onClick={() => setIsModalOpen(true)}
//         title="Open Spin Wheel"
//       >
//         <FaGift size={24} />
//       </button>

//       {/* Modal with Blurred Background */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 backdrop-blur-sm bg-gray-500 bg-opacity-30 flex items-center justify-center z-50"
//           onClick={() => setIsModalOpen(false)} // Close on outside click
//         >
//           <div
//             className="bg-base-200 p-8 rounded-lg shadow-xl relative max-w-md w-full"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//           >
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//               onClick={() => setIsModalOpen(false)}
//             >
//               ✕
//             </button>

//             {/* Confetti Animation */}
//             {showConfetti && <Confetti />}

//             {/* Wheel Container */}
//             <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
//               <div
//                 ref={wheelRef}
//                 className="absolute inset-0 rounded-full border-4 border-primary"
//                 style={{
//                   background: `conic-gradient(${colors
//                     .map(
//                       (color, index) =>
//                         `${color} ${index * (360 / offers.length)}deg ${(index + 1) * (360 / offers.length)}deg`
//                     )
//                     .join(', ')})`,
//                 }}
//               >
//                 {offers.map((offer, index) => {
//                   const angle = (index + 0.5) * (360 / offers.length);
//                   return (
//                     <span
//                       key={index}
//                       className="absolute text-white font-bold text-sm"
//                       style={{
//                         left: '50%',
//                         top: '50%',
//                         transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -100px) rotate(-${angle}deg)`,
//                         textShadow: '2px 2px 4px black',
//                       }}
//                     >
//                       {offer}
//                     </span>
//                   );
//                 })}
//               </div>
//               <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
//             </div>

//             {/* Spin Button */}
//             <button
//               className="btn btn-primary mt-8 flex items-center gap-2 mx-auto"
//               onClick={spinWheel}
//               disabled={spinning}
//             >
//               <FaGift />
//               Spin to Win!
//             </button>

//             {/* Result Display */}
//             {result && (
//               <div className="mt-4 text-xl font-bold text-primary text-center">
//                 {result === 'Try Again' ? (
//                   <p>Better luck next time!</p>
//                 ) : (
//                   <p>Congratulations! You won: {result}</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SpinWheel;
import React, { useState, useRef, useEffect } from 'react';
import { FaGift } from 'react-icons/fa';
import Confetti from 'react-confetti';

const SpinWheel = () => {
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for spinning mechanics
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef(null);

  // Define offers and colors for wheel segments
  const offers = ['5%', '10%', '15%', '20%', 'Try Again'];
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  // Audio for happy winning sound
  const winSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2819/2819-preview.mp3'); // Happy celebratory sound

  // Function to handle wheel spinning
  const spinWheel = () => {
    if (spinning) return; // Prevent multiple spins
    setSpinning(true);
    setResult(null);
    setShowConfetti(false);

    const wheel = wheelRef.current;
    const randomDegree = Math.floor(Math.random() * 360) + 1440; // Minimum 4 full spins
    wheel.style.transition = 'transform 0.5s ease-out'; // Spin speed at 0.5s
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Calculate result after animation completes
    setTimeout(() => {
      const actualDegree = randomDegree % 360;
      const segmentAngle = 360 / offers.length;
      const winningIndex = Math.floor((360 - actualDegree) / segmentAngle) % offers.length;
      const wonOffer = offers[winningIndex];
      setResult(wonOffer);
      if (wonOffer !== 'Try Again') {
        setShowConfetti(true); // Trigger confetti for wins
        winSound.play(); // Play happy sound
      }
      setSpinning(false);
    }, 500); // Match the transition duration (0.5 seconds)
  };

  // Stop confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [showConfetti]);

  return (
    <>
      {/* Floating Icon */}
      <button
        className="fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-focus"
        onClick={() => setIsModalOpen(true)}
        title="Open Spin Wheel"
      >
        <FaGift size={24} />
      </button>

      {/* Modal with Transparent Blurred Background */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-transparent flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // Close on outside click
        >
          <div
            className="bg-base-100 p-8 rounded-lg shadow-xl relative max-w-md w-full bg-opacity-95"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {/* Confetti Animation - Scoped to Modal */}
            {showConfetti && (
              <Confetti
                width={400} // Match modal width (max-w-md ≈ 448px, adjusted for padding)
                height={500} // Slightly taller than modal content
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            )}

            {/* Wheel Container */}
            <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full border-4 border-primary"
                style={{
                  background: `conic-gradient(${colors
                    .map(
                      (color, index) =>
                        `${color} ${index * (360 / offers.length)}deg ${(index + 1) * (360 / offers.length)}deg`
                    )
                    .join(', ')})`,
                }}
              >
                {offers.map((offer, index) => {
                  const angle = (index + 0.5) * (360 / offers.length);
                  return (
                    <span
                      key={index}
                      className="absolute text-white font-bold text-sm"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -100px) rotate(-${angle}deg)`,
                        textShadow: '2px 2px 4px black',
                      }}
                    >
                      {offer}
                    </span>
                  );
                })}
              </div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Spin Button */}
            <button
              className="btn btn-primary mt-8 flex items-center gap-2 mx-auto"
              onClick={spinWheel}
              disabled={spinning}
            >
              <FaGift />
              Spin to Win!
            </button>

            {/* Result Display */}
            {result && (
              <div className="mt-4 text-xl font-bold text-primary text-center">
                {result === 'Try Again' ? (
                  <p>Better luck next time!</p>
                ) : (
                  <p>Congratulations! You won: {result}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SpinWheel;