export const appReducer = (state, action) => {
  switch (action.type) {
    case "setIngredietns":
      return { ...state, ingredients: action.payload };
    case "setIngredietnSelect":
      return {
        ...state,
        ingredientSelect: action.payload,
      };
    case "setBun":
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          bun: [...state.burderConstructor.bun, action.payload],
        },
      };
    case "setIngredient":
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          ingredients: [...state.burderConstructor.ingredients, action.payload],
        },
      };
    case "removeIngredient":
      return {
        ...state,
        burderConstructor: {
          ...state.burderConstructor,
          ingredients: state.burderConstructor.ingredients.filter(
            (x, idx) => idx !== action.payload
          ),
        },
      };
    case "clearIngredientsSelecteds":
      const ingredients = state.ingredients.map(x => ({
        ...x,
        ...(x.__v = 0),
      }));
      return {
        ...state,
        ingredients,
        burderConstructor: {
          bun: [],
          ingredients: [],
        },
      };
    case "setOrder":
      return {
        ...state,
        orderNumber: action.payload,
      };
    case "setPrice":
      return { ...state, totalPrice: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    case "openModal":
      return {
        ...state,
        modalIsOpen: action.payload.modalIsOpen,
        modalMode: action.payload.mode,
      };
    case "closeModal":
      return { ...state, modalIsOpen: false };
    default:
      return state;
  }
};
