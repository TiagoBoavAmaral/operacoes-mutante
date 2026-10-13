const {
  soma, subtracao, multiplicacao, divisao, potencia, raizQuadrada, restoDivisao,
  fatorial, mediaArray, somaArray, maximoArray, minimoArray, valorAbsoluto,
  arredondar, isPar, isImpar, calcularPorcentagem, aumentarPorcentagem,
  diminuirPorcentagem, inverterSinal, seno, cosseno, tangente, logaritmoNatural,
  logaritmoBase10, arredondarParaBaixo, arredondarParaCima, hipotenusa,
  grausParaRadianos, radianosParaGraus, mdc, mmc, isPrimo, fibonacci,
  produtoArray, clamp, isDivisivel, celsiusParaFahrenheit, fahrenheitParaCelsius,
  inverso, areaCirculo, areaRetangulo, perimetroRetangulo, isMaiorQue,
  isMenorQue, isEqual, medianaArray, dobro, triplo, metade
} = require('../src/operacoes');

describe('Suíte de Testes Fraca para 50 Operações Aritméticas', () => {
  test('1. deve somar dois números positivos', () => { expect(soma(2, 3)).toBe(5); });
  test('2. deve subtrair dois números positivos', () => { expect(subtracao(5, 2)).toBe(3); });
  test('3. deve multiplicar dois números positivos', () => { expect(multiplicacao(3, 4)).toBe(12); });
  test('4. deve dividir e lançar erro para divisão por zero', () => {
    expect(divisao(10, 2)).toBe(5);
    expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.');
  });
  test('5. deve calcular a potência com expoente positivo', () => { expect(potencia(2, 3)).toBe(8); });
  test('6. deve calcular a raiz quadrada de um quadrado perfeito', () => { expect(raizQuadrada(16)).toBe(4); });
  test('7. deve retornar o resto da divisão', () => { expect(restoDivisao(10, 3)).toBe(1); });
  test('8. deve calcular o fatorial de um número maior que 1', () => { expect(fatorial(4)).toBe(24); });
  test('9. deve calcular a média de um array com múltiplos elementos', () => { expect(mediaArray([10, 20, 30])).toBe(20); });
  test('10. deve somar um array com múltiplos elementos', () => { expect(somaArray([1, 2, 3])).toBe(6); });

  test('11. deve encontrar o valor máximo em um array', () => { expect(maximoArray([1, 50, 10])).toBe(50); });
  test('12. deve encontrar o valor mínimo em um array', () => { expect(minimoArray([10, 2, 100])).toBe(2); });
  test('13. deve retornar o valor absoluto de um número negativo', () => { expect(valorAbsoluto(-5)).toBe(5); });
  test('14. deve arredondar um número para cima', () => { expect(arredondar(9.8)).toBe(10); });
  test('15. deve retornar true para um número par', () => { expect(isPar(100)).toBe(true); });
  test('16. deve retornar true para um número ímpar', () => { expect(isImpar(7)).toBe(true); });
  test('17. deve calcular uma porcentagem simples', () => { expect(calcularPorcentagem(50, 200)).toBe(100); });
  test('18. deve aumentar um valor em uma porcentagem', () => { expect(aumentarPorcentagem(100, 10)).toBeCloseTo(110); });
  test('19. deve diminuir um valor em uma porcentagem', () => { expect(diminuirPorcentagem(100, 10)).toBeCloseTo(90); });
  test('20. deve inverter o sinal de um número positivo', () => { expect(inverterSinal(42)).toBe(-42); });

  test('21. deve calcular o seno de 0', () => { expect(seno(0)).toBe(0); });
  test('22. deve calcular o cosseno de 0', () => { expect(cosseno(0)).toBe(1); });
  test('23. deve calcular a tangente de 0', () => { expect(tangente(0)).toBe(0); });
  test('24. deve calcular o logaritmo natural de Euler', () => { expect(logaritmoNatural(Math.E)).toBe(1); });
  test('25. deve calcular o logaritmo na base 10', () => { expect(logaritmoBase10(100)).toBe(2); });
  test('26. deve arredondar para baixo', () => { expect(arredondarParaBaixo(5.9)).toBe(5); });
  test('27. deve arredondar para cima', () => { expect(arredondarParaCima(5.1)).toBe(6); });
  test('28. deve calcular a hipotenusa de um triângulo retângulo', () => { expect(hipotenusa(3, 4)).toBe(5); });
  test('29. deve converter graus para radianos', () => { expect(grausParaRadianos(180)).toBeCloseTo(Math.PI); });
  test('30. deve converter radianos para graus', () => { expect(radianosParaGraus(Math.PI)).toBeCloseTo(180); });

  test('31. deve calcular o MDC de dois números', () => { expect(mdc(10, 5)).toBe(5); });
  test('32. deve calcular o MMC de dois números', () => { expect(mmc(10, 5)).toBe(10); });
  test('33. deve verificar que um número é primo', () => { expect(isPrimo(7)).toBe(true); });
  test('34. deve calcular o 10º termo de Fibonacci', () => { expect(fibonacci(10)).toBe(55); });
  test('35. deve calcular o produto de um array', () => { expect(produtoArray([2, 3, 4])).toBe(24); });
  test('36. deve manter um valor dentro de um intervalo (clamp)', () => { expect(clamp(5, 0, 10)).toBe(5); });
  test('37. deve verificar se um número é divisível por outro', () => { expect(isDivisivel(10, 2)).toBe(true); });
  test('38. deve converter Celsius para Fahrenheit', () => { expect(celsiusParaFahrenheit(0)).toBe(32); });
  test('39. deve converter Fahrenheit para Celsius', () => { expect(fahrenheitParaCelsius(32)).toBe(0); });
  test('40. deve calcular o inverso de um número', () => { expect(inverso(4)).toBe(0.25); });

  test('41. deve calcular a área de um círculo', () => { expect(areaCirculo(10)).toBeCloseTo(314.159); });
  test('42. deve calcular a área de um retângulo', () => { expect(areaRetangulo(5, 4)).toBe(20); });
  test('43. deve calcular o perímetro de um retângulo', () => { expect(perimetroRetangulo(5, 4)).toBe(18); });
  test('44. deve verificar se um número é maior que outro', () => { expect(isMaiorQue(10, 5)).toBe(true); });
  test('45. deve verificar se um número é menor que outro', () => { expect(isMenorQue(5, 10)).toBe(true); });
  test('46. deve verificar se dois números são iguais', () => { expect(isEqual(7, 7)).toBe(true); });
  test('47. deve calcular a mediana de um array ímpar e ordenado', () => { expect(medianaArray([1, 2, 3, 4, 5])).toBe(3); });
  test('48. deve calcular o dobro de um número', () => { expect(dobro(10)).toBe(20); });
  test('49. deve calcular o triplo de um número', () => { expect(triplo(10)).toBe(30); });
  test('50. deve calcular a metade de um número', () => { expect(metade(20)).toBe(10); });
});

describe('Suíte fortalecida para matar mutantes sobreviventes', () => {
  test('divisão não lança erro com valores só equivalentes a zero', () => {
    expect(divisao(10, false)).toBe(Infinity);
  });

  test('raiz quadrada de zero e erro para negativo', () => {
    expect(raizQuadrada(0)).toBe(0);
    expect(() => raizQuadrada(-1)).toThrow('Não é possível calcular a raiz quadrada de um número negativo.');
  });

  test('fatorial cobre 0, 1 e negativos', () => {
    expect(fatorial(0)).toBe(1);
    expect(fatorial(1)).toBe(1);
    expect(fatorial(5)).toBe(120);
    expect(() => fatorial(-3)).toThrow('Fatorial não é definido para números negativos.');
  });

  test('média e produto de array vazio usam o elemento neutro', () => {
    expect(mediaArray([])).toBe(0);
    expect(produtoArray([])).toBe(1);
    expect(produtoArray({ length: 0 })).toBe(1);
  });

  test('máximo, mínimo e mediana rejeitam array vazio', () => {
    expect(() => maximoArray([])).toThrow('Array vazio не possui valor máximo.');
    expect(() => minimoArray([])).toThrow('Array vazio не possui valor mínimo.');
    expect(() => medianaArray([])).toThrow('Array vazio не possui mediana.');
  });

  test('paridade cobre o ramo falso', () => {
    expect(isPar(7)).toBe(false);
    expect(isPar(0)).toBe(true);
    expect(isImpar(8)).toBe(false);
    expect(isImpar(0)).toBe(false);
  });

  test('isPrimo cobre não primos e borda n <= 1', () => {
    expect(isPrimo(1)).toBe(false);
    expect(isPrimo(0)).toBe(false);
    expect(isPrimo(-4)).toBe(false);
    expect(isPrimo(4)).toBe(false);
    expect(isPrimo(9)).toBe(false);
    expect(isPrimo(15)).toBe(false);
    expect(isPrimo(2)).toBe(true);
  });

  test('clamp abaixo do mínimo e acima do máximo', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
    expect(clamp(10, 10, 5)).toBe(5);
    expect(clamp('0', 0, 10)).toBe('0');
    expect(clamp('10', 0, 10)).toBe('10');
  });

  test('isDivisivel retorna false quando não divide', () => {
    expect(isDivisivel(10, 3)).toBe(false);
    expect(isDivisivel(9, 3)).toBe(true);
  });

  test('conversões de temperatura com valores não triviais', () => {
    expect(celsiusParaFahrenheit(100)).toBe(212);
    expect(celsiusParaFahrenheit(-40)).toBe(-40);
    expect(fahrenheitParaCelsius(212)).toBe(100);
    expect(fahrenheitParaCelsius(-40)).toBe(-40);
  });

  test('inverso de zero lança erro com a mensagem original', () => {
    expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
    expect(inverso(-4)).toBe(-0.25);
  });

  test('comparações cobrem igualdade e o ramo falso', () => {
    expect(isMaiorQue(5, 5)).toBe(false);
    expect(isMaiorQue(3, 8)).toBe(false);
    expect(isMenorQue(5, 5)).toBe(false);
    expect(isMenorQue(8, 3)).toBe(false);
    expect(isEqual(7, 8)).toBe(false);
    expect(isEqual(1, '1')).toBe(false);
  });

  test('mediana com tamanho par e array desordenado', () => {
    expect(medianaArray([4, 1, 3, 2])).toBe(2.5);
    expect(medianaArray([9, 1, 5])).toBe(5);
    expect(medianaArray([10, 20])).toBe(15);
    expect(medianaArray([-2, -8, -4])).toBe(-4);
  });

  test('fibonacci nos casos base', () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(2)).toBe(1);
    expect(fibonacci(3)).toBe(2);
  });

  test('operações extras para operadores aritméticos', () => {
    expect(soma(-2, 5)).toBe(3);
    expect(subtracao(2, 5)).toBe(-3);
    expect(multiplicacao(-3, 4)).toBe(-12);
    expect(divisao(9, 2)).toBe(4.5);
    expect(potencia(5, 0)).toBe(1);
    expect(potencia(9, 0.5)).toBe(3);
    expect(restoDivisao(10, 2)).toBe(0);
    expect(restoDivisao(7, 4)).toBe(3);
    expect(valorAbsoluto(8)).toBe(8);
    expect(valorAbsoluto(0)).toBe(0);
    expect(arredondar(9.2)).toBe(9);
    expect(arredondar(2.5)).toBe(3);
    expect(inverterSinal(-7)).toBe(7);
    expect(inverterSinal(0)).toBe(-0);
    expect(calcularPorcentagem(25, 80)).toBe(20);
    expect(aumentarPorcentagem(50, 50)).toBe(75);
    expect(diminuirPorcentagem(80, 25)).toBe(60);
    expect(dobro(0)).toBe(0);
    expect(dobro(-4)).toBe(-8);
    expect(triplo(0)).toBe(0);
    expect(metade(7)).toBe(3.5);
  });

  test('trigonometria, logs e conversões angulares não triviais', () => {
    expect(seno(Math.PI / 2)).toBeCloseTo(1);
    expect(cosseno(Math.PI)).toBeCloseTo(-1);
    expect(tangente(Math.PI / 4)).toBeCloseTo(1);
    expect(logaritmoNatural(1)).toBe(0);
    expect(logaritmoBase10(1000)).toBe(3);
    expect(arredondarParaBaixo(-1.1)).toBe(-2);
    expect(arredondarParaCima(-1.1)).toBe(-1);
    expect(hipotenusa(5, 12)).toBe(13);
    expect(grausParaRadianos(90)).toBeCloseTo(Math.PI / 2);
    expect(radianosParaGraus(Math.PI / 2)).toBeCloseTo(90);
  });

  test('mdc, mmc e geometria com casos adicionais', () => {
    expect(mdc(12, 8)).toBe(4);
    expect(mdc(7, 1)).toBe(1);
    expect(mdc(0, 5)).toBe(5);
    expect(mmc(4, 6)).toBe(12);
    expect(areaCirculo(0)).toBe(0);
    expect(areaCirculo(1)).toBeCloseTo(Math.PI);
    expect(areaRetangulo(3, 0)).toBe(0);
    expect(perimetroRetangulo(2, 3)).toBe(10);
  });
});
