const formatFixed = (pet) => {
  const { sex, is_fixed } = pet;

  if (is_fixed === 1 && sex === "female") {
    return "Spayed";
  } else if (is_fixed === 1 && sex === "male") {
    return "Neutered";
  }

  return [];
};

export default formatFixed;
