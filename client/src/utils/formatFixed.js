const formatFixed = (pet) => {
  const { sex, isFixed } = pet;

  if ((isFixed === 1 || isFixed === true) && sex === "female") {
    return "Spayed";
  } else if ((isFixed === 1 || isFixed === true) && sex === "male") {
    return "Neutered";
  }

  return [];
};

export default formatFixed;
