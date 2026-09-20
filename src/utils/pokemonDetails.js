export const formatName = (name) => {
  if (!name) return "";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatHeight = (heightInMeters) => {
  if (heightInMeters == null) return { metric: "-", imperial: "-" };

  const meters = parseFloat(heightInMeters) || 0;
  const totalInches = meters * 39.3700787;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  const formattedInches = String(inches).padStart(2, "0");

  return {
    metric: `${meters.toFixed(1)} m`,
    imperial: `${feet}'${formattedInches}"`,
  };
};

export const formatWeight = (weightInKg) => {
  if (weightInKg == null) return { metric: "-", imperial: "-" };

  const kilograms = parseFloat(weightInKg) || 0;
  const pounds = (kilograms * 2.20462).toFixed(1);

  return {
    metric: `${kilograms.toFixed(1)} kg`,
    imperial: `${pounds} lbs`,
  };
};

export const calculateGenderRatio = (genderRate) => {
  if (genderRate === undefined || genderRate === null) return null;
  if (genderRate === -1) {
    return { isGenderless: true, male: 0, female: 0 };
  }

  const femalePercent = (genderRate / 8) * 100;
  const malePercent = 100 - femalePercent;

  return {
    isGenderless: false,
    male: Number(malePercent.toFixed(1)),
    female: Number(femalePercent.toFixed(1)),
  };
};
