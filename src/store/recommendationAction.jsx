export const setRecommendations = (recommendedDisciplines) => {
    return {
      type: 'SET_RECOMMENDATIONS',
      payload: recommendedDisciplines,
    };
};