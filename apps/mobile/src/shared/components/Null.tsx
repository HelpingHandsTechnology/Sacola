/**
 * O componente SpaceY não consegue saber se um elemento filho tem seu retorno igual a Null, por isso
 * o componente Null se faz necessário, com o componente Null é possível verificar o nome do componente
 * e se ele é Null a gente consegue saber que o elemento filho não tem retorno, assim evitando de dar um
 * padding num componente que não precisa.
 * @see https://github.com/facebook/react/issues/5517
 */
export const Null = () => null;
Null.iSNullComponent = true;
