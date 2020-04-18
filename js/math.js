function BellCurve(Mean, Deviation, x) {
  return (
    (1 /
      Math.pow(
        Deviation * Math.sqrt(2 * Math.PI),
        Math.pow(
          Math.E,
          -(Math.pow(x - Mean, 2) / (2 * Math.pow(Deviation, 2)))
        )
      )) *
    100
  );
}

function BuildBellCurve(Mean, Deviation) {
  for (let index = 1; index < Mean; index++) {
    console.log(BellCurve(Mean, Deviation, index));
  }
}

BuildBellCurve(18, 3.75);

Mean = 950;
Deviation = 200;
x = 850;

c1 = Math.pow(Deviation, 2);
c2 = 2 * c1;
c3 = x - Mean;
c4 = Math.pow(c3, 2);
c5 = c4 / c2;
c6 = Math.pow(Math.E, c5 * -1);
c7 = 2 * Math.PI;
c8 = Math.sqrt(c7);
c9 = Deviation * c8;
c10 = Math.pow(c9, c6);
c11 = 1 / c10;

console.log(c1);
console.log(c2);
console.log(c3);
console.log(c4);
console.log(c5);
console.log(c6);
console.log(c7);
console.log(c8);
console.log(c9);
console.log(c10);

console.log("");

console.log(c11);
