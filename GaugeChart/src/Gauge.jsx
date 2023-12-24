import React, { useState, useEffect } from "react";

const Gauge = ({ value }) => {
  const minValue = -100;
  const maxValue = 100;
  const angleRange = 280;
  const totalTicks = 51;

  const calculateRotation = (value, minValue, maxValue) => {
    const percentage = (value - minValue) / (maxValue - minValue);
    return angleRange * percentage - 140;
  };

  const [rotation, setRotation] = useState(-140);

  useEffect(() => {
    const targetRotation = calculateRotation(value, minValue, maxValue);
    const animationDuration = 300; // Animasyon süresi, burada 1 saniye olarak belirledim
    const interval = 20; // İterasyon süresi
    const iterations = animationDuration / interval; // İterasyon sayısı
    const rotationChange = (targetRotation - rotation) / iterations; // Her iterasyonda değişim miktarı

    let currentRotation = rotation;
    const intervalId = setInterval(() => {
      if (currentRotation < targetRotation) {
        currentRotation += rotationChange;
        setRotation(currentRotation);
      } else {
        setRotation(targetRotation); // Hedef rotasyona ulaşınca durdur
        clearInterval(intervalId);
      }
    }, interval);

    return () => clearInterval(intervalId); // Temizlik için interval'i temizle
  }, [value, minValue, maxValue, rotation]);

  const specialIndexes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const specialValues = specialIndexes.map((index) => {
    const value = -100 + index * 4;
    return value;
  });

  return (
    <svg width="300" height="300" viewBox="0 0 200 200">
      {/* Gauge dış halkası */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#FEDC00"
        strokeWidth="10"
        strokeDasharray="220.74"
        transform="rotate(30 100 100)"
        strokeDashoffset="285.03"
      />

      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#F6F6F5"
        strokeWidth="10"
        strokeDasharray="220.74"
        transform="rotate(170 100 100)"
        strokeDashoffset="285.03"
      />

      {/* Gösterge */}

      <path
        d="M 100,100 L 100,50"
        stroke="#FEDC00"
        strokeWidth="6"
        transform={`rotate(${rotation}, 100, 100)`}
        strokeLinecap="round"
      />
      <circle
        cx="100"
        cy="100"
        r="4.33846"
        fill="white"
        stroke="#FEDC00"
        strokeWidth="4"
      />
      {/* Değer metni ve çizgiler */}
      {Array.from({ length: totalTicks }).map((_, index) => {
        const tickRotation = (angleRange / (totalTicks - 1)) * index - 140;
        const lineHeight = specialIndexes.includes(index) ? "28" : "23";
        const lineStroke = [0, 5, 10, 15, 20, 25].includes(index)
          ? "#FEDC00"
          : "#F6F6F5";
        const specialValue = specialValues[specialIndexes.indexOf(index)];

        return (
          <g key={index}>
            {/* Değer çizgileri */}
            <line
              x1="100"
              y1="20"
              x2="100"
              y2={lineHeight}
              stroke={lineStroke}
              strokeWidth="2"
              transform={`rotate(${tickRotation}, 100, 100)`}
            />
            {/* Değer metinleri */}
            <text
              x="100"
              y="40"
              textAnchor="middle"
              fontSize="10"
              // transform={`rotate(${tickRotation} 100, 100)`}
            >
              <tspan x="60" y="150">
                -100
              </tspan>
              <tspan x="45" y="125">
                -80
              </tspan>
              <tspan x="40" y="95">
                -60
              </tspan>
              <tspan x="50" y="65">
                -40
              </tspan>
              <tspan x="70" y="45">
                -20
              </tspan>
              <tspan x="100" y="40">
                0
              </tspan>
              <tspan x="130" y="45">
                20
              </tspan>
              <tspan x="150" y="65">
                40
              </tspan>
              <tspan x="160" y="95">
                60
              </tspan>
              <tspan x="155" y="125">
                80
              </tspan>
              <tspan x="140" y="150">
                100
              </tspan>
            </text>
          </g>
        );
      })}
      <text x="100" y="190" textAnchor="middle" fontSize="24">
        {value}
      </text>
      <text x="100" y="160" textAnchor="middle" fontSize="16">
        eNPS
      </text>
    </svg>
  );
};

export default Gauge;
