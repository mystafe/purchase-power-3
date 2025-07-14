import React, { useEffect, useState } from "react";

const OrientationHint = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="orientation-hint-overlay" onClick={() => setVisible(false)}>
      <div className="orientation-hint">
        Uygulamayı verimli kullanmak için cihazı yan çeviriniz 🔄
      </div>
    </div>
  );
};

export default OrientationHint;
