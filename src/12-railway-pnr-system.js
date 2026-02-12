export function processRailwayPNR(pnrData) {
  if (!pnrData || typeof pnrData !== 'object') return null;
  if (typeof pnrData.pnr !== 'string') return null;
  if (pnrData.pnr.length !== 10 || !/^\d{10}$/.test(pnrData.pnr)) return null;
  if (!pnrData.train || typeof pnrData.train !== 'object') return null;
  if (!Array.isArray(pnrData.passengers) || pnrData.passengers.length === 0) return null;

  const pnrFormatted = pnrData.pnr.slice(0, 3) + "-"
    + pnrData.pnr.slice(3, 6) + "-"
    + pnrData.pnr.slice(6);

  const { number, name, from, to } = pnrData.train;
  const trainInfo = `Train: ${number} - ${name} | ${from} → ${to} | Class: ${pnrData.classBooked}`;

  const passengers = pnrData.passengers.map(p => {
    let statusLabel;
    if (p.current === "CAN") statusLabel = "CANCELLED";
    else if (p.current.startsWith("WL")) statusLabel = "WAITING";
    else if (p.current.startsWith("RAC")) statusLabel = "RAC";
    else statusLabel = "CONFIRMED";

    return {
      formattedName: p.name.padEnd(20) + `(${p.age}/${p.gender})`,
      bookingStatus: p.booking,
      currentStatus: p.current,
      statusLabel,
      isConfirmed: statusLabel === "CONFIRMED"
    };
  });

  const confirmed = passengers.filter(p => p.statusLabel === "CONFIRMED").length;
  const waiting = passengers.filter(p => p.statusLabel === "WAITING").length;
  const cancelled = passengers.filter(p => p.statusLabel === "CANCELLED").length;
  const rac = passengers.filter(p => p.statusLabel === "RAC").length;

  const summary = {
    totalPassengers: passengers.length,
    confirmed, waiting, cancelled, rac,
    allConfirmed: passengers.every(p => p.isConfirmed),
    anyWaiting: passengers.some(p => p.statusLabel === "WAITING")
  };

  const nonCancelled = passengers.filter(p => p.statusLabel !== "CANCELLED");
  const chartPrepared = nonCancelled.every(p => p.isConfirmed);

  return { pnrFormatted, trainInfo, passengers, summary, chartPrepared };
}
