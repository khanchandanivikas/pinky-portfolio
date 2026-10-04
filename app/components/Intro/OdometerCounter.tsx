import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const PLACES = [100, 10, 1];
const SPRING = { stiffness: 700, damping: 38, mass: 0.5 };

export const OdometerCounter = ({ value }: { value: MotionValue<number> }) => {
  return (
    <span className="flex items-start font-extralight tabular-nums leading-[0.8] tracking-tighter">
      {PLACES.map((place) => (
        <DigitColumn key={place} value={value} place={place} />
      ))}
      <span className="mt-[0.08em] ml-[0.06em] text-[0.18em] font-light tracking-normal">
        %
      </span>
    </span>
  );
};

const DigitColumn = ({
  value,
  place,
}: {
  value: MotionValue<number>;
  place: number;
}) => {
  const reduce = useReducedMotion();
  const steps = useTransform(value, (v) => Math.floor(v / place));
  const sprung = useSpring(steps, SPRING);
  const y = useTransform([steps, sprung], ([raw, smooth]: number[]) => {
    const position = (reduce ? raw : smooth) % 10;
    return `${-position * (100 / DIGITS.length)}%`;
  });
  const opacity = useTransform(value, (v) =>
    place === 1 || v >= place ? 1 : 0,
  );

  return (
    <motion.span className="block h-[1em] overflow-hidden" style={{ opacity }}>
      <motion.span className="block" style={{ y }}>
        {DIGITS.map((digit, index) => (
          <span key={index} className="block h-[1em] leading-none">
            {digit}
          </span>
        ))}
      </motion.span>
    </motion.span>
  );
};
