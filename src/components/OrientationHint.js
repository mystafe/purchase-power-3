import React, { useEffect, useState } from "react";

const OrientationHint = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="orientation-hint" onClick={() => setVisible(false)}>
      Uygulamayı verimli kullanmak için cihazı yan çeviriniz 🔄
    </div>
  );
};

export default OrientationHint;
